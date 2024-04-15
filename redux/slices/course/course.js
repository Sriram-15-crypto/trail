import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5353/create/course",
        form
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get("http://localhost:5353/getAll/course");
    return response.data.courses;
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id) => {
    // Use id instead of _id
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/course/${id}`
      );
      // Check if the response data is structured as expected
      if (response.data && response.data.courses) {
        return response.data.courses; // Extract the course data from the response
      } else {
        throw Error("Invalid response data structure");
      }
    } catch (error) {
      throw Error(error.response ? error.response.data.message : error.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (_id) => {
    await axios.delete(`http://localhost:5353/delete/course/${_id}`);
    return _id;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    filters: {
      category: [],
    },
    filteredData:[],
    courses: [],
    selectedCourse: [],
    status: "idle",
    error: null,
  },
  reducers: {

    tagsFilterChange: (state, action) => {
      state.filters.category = [...action.payload];
      courseSlice.caseReducers.updateFilteredData(state, action);
    },
    updateFilteredData: (state, action) => {
      if (
        JSON.stringify(state.filters) === JSON.stringify(initialState.filters)
      ) {
        state.filteredData = state.data;
      } else {

        let tagsFilteredData = medicalServicesFilteredData.filter((pack) => {
          if (state.filters.category.length === 0) {
            return true;
          }
          let include = false;
          pack.category.map((category) => {
            if (state.filters.category.includes(category)) {
              include = true;
            }
          });

          return include;
        });

       
        

        state.filteredData = priceFilteredData;
        console.log("filtered data 1", [...tagsFilteredData]);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCourse.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.status = "succeeded";
      const responseData = action.payload;
      console.log("Course added successfully");
    });

    builder.addCase(createCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchCourses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCourse = action.payload;
        console.log("Fetched course:", action.payload); // Log the fetched course
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error fetching course:", action.error); // Log the error
      });
    builder.addCase(deleteCourse.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const selectCourses = (state) => state.courses.courses;
export const {
  
  tagsFilterChange,

} = courseSlice.actions;
export default courseSlice.reducer;
