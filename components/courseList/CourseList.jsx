"use client";

import {
  coursesData,
  duration,
  instructorNames,
  languages,
  levels,
  prices,
  rating,
  sortingOptions,
} from "@/data/courses";
import React, { useState, useEffect } from "react";
import Star from "../common/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";
import { fetchInstructors } from "@/redux/slices/instructor/instructor";
import { fetchCourses } from "@/redux/slices/course/course";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { resetSignIn, userVerify } from "@/redux/slices/user/Signin";

export default function CourseList({ selectedCategory }) {
  const levels = ["Beginer", "Intermediate", "Expert"];
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },

    { label: "10000-30000", min: 10000, max: 30000 },
    { label: "30000-60000", min: 30000, max: 60000 },
    { label: "60000-90000", min: 60000, max: 90000 },
  ];
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [instructorOpen, setInstractorOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [openLanguage, setOpenLanguage] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterRatingRange, setFilterRatingRange] = useState([]);
  const [filterInstructors, setFilterInstructors] = useState([]);
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterLevels, setFilterLevels] = useState([]);
  const [filterDuration, setFilterDuration] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Default");

  const [filteredData, setFilteredData] = useState([]);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [cookies] = useCookies(["token"]);
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const instructors = useSelector((state) => state.instructors.instructors);
  const [showAllInstructors, setShowAllInstructors] = useState(false);
  const courses = useSelector((state) => state.courses.courses);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);
  const [coursess, setCourses] = useState([]);

  useEffect(() => {
    const filteredCourses = coursess.filter(
      (course) => course.category.category_name === selectedCategory
    );
    console.log("filteredCourses", filteredCourses);
    setCourses(filteredCourses);
  }, [selectedCategory, coursess]);
  const categoryFilters = useSelector(
    (state) => state.category.filters.category
  );
  // const handleApply = () => {
  //   if (cookies.token) {
  //     router.push("/courses1");
  //   } else {
  //     router.push("/signup");
  //   }
  // };

  categories &&
    categories.map((pack) => {
      pack.categorys &&
        pack.categorys.map((category) => {
          packagesPerCategoryCount.set(
            category,
            packagesPerCategoryCount.get(category)
              ? packagesPerCategoryCount.get(category) + 1
              : 1
          );
        });
    });

  console.log("courses", courses);
  console.log("categories", categories);
  console.log("instructors", instructors);
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchInstructors());
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    setFilteredData(courses);
  }, [courses]);
  useEffect(() => {
    setFilteredInstructors(instructors);
  }, [instructors]);

  const handleCategorySelection = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };
  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };
  const toggleShowAllinstructors = () => {
    setShowAllInstructors(!showAllInstructors);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const refItems = courses.filter((course) => {
      if (filterPrice === "All") {
        return true;
      } else if (filterPrice === "Free") {
        return !course.paid;
      } else if (filterPrice === "Paid") {
        return course.paid;
      }
    });

    const filteredItems = refItems.filter((course) => {
      // Check if any instructor's name matches the selected instructor's name
      return course.instructor.some((inst) =>
        filterInstructors.includes(inst.name)
      );
    });

    let filteredArrays = [];

    if (filterInstructors.length > 0) {
      const filtered = refItems.filter((course) =>
        filterInstructors.includes(course.instructor.name)
      );
      filteredArrays.push(filtered);
    }

    if (filterCategories.length > 0) {
      const filtered = refItems.filter((course) =>
        filterCategories.includes(course.category.category_name)
      );
      filteredArrays.push(filtered);
    }
    if (filterLevels.length > 0) {
      const filtered = refItems.filter((course) =>
        filterLevels.includes(course.course_level)
      );
      filteredArrays.push(filtered);
    }

    if (filterRatingRange.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.rating >= filterRatingRange[0] &&
          elm.rating <= filterRatingRange[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterDuration.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.duration >= filterDuration[0] && elm.duration <= filterDuration[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    setFilteredData(commonItems);
    setPageNumber(1);
  }, [
    filterCategories,
    filterRatingRange,
    filterInstructors,
    filterPrice,
    filterLevels,
    filterDuration,
    courses,
  ]);

  useEffect(() => {
    if (currentSortingOption == "Default") {
      setSortedFilteredData(filteredData);
    } else if (currentSortingOption == "Rating (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.rating - b.rating)
      );
    } else if (currentSortingOption == "Rating (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.rating - a.rating)
      );
    } else if (currentSortingOption == "Price (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.discountedPrice - b.discountedPrice)
      );
    } else if (currentSortingOption == "Price (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.discountedPrice - a.discountedPrice)
      );
    } else if (currentSortingOption == "Duration (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.duration - b.duration)
      );
    } else if (currentSortingOption == "Duration (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.duration - a.duration)
      );
    }
  }, [currentSortingOption, filteredData]);

  const handleFilterCategories = (categoryName) => {
    if (filterCategories.includes(categoryName)) {
      const filtered = filterCategories.filter((cat) => cat !== categoryName);
      setFilterCategories(filtered);
    } else {
      setFilterCategories((prev) => [...prev, categoryName]);
    }
  };

  const handleFilterInstructor = (instructorName) => {
    if (filterInstructors.includes(instructorName)) {
      setFilterInstructors(
        filterInstructors.filter((ins) => ins !== instructorName)
      );
    } else {
      setFilterInstructors((prev) => [...prev, instructorName]);
    }
  };

  useEffect(() => {
    if (filterInstructors.length > 0) {
      const filteredCourses = courses.filter((course) =>
        course.instructor.some((inst) => filterInstructors.includes(inst.name))
      );
      setFilteredData(filteredCourses);
    } else {
      // If no instructors are selected, show all courses
      setFilteredData(courses);
    }
  }, [filterInstructors, courses]);

  const handleFilterRatingRange = (item) => {
    setFilterRatingRange(item);
  };
  const handleFilterPrice = (item) => {
    setFilterPrice(item);
  };
  const handleFilterLevels = (levelName) => {
    if (filterLevels.includes(levelName)) {
      setFilterLevels(filterLevels.filter((ins) => ins !== levelName));
    } else {
      setFilterLevels((prev) => [...prev, levelName]);
    }
  };

  useEffect(() => {
    if (filterLevels.length > 0) {
      const filteredCourses = courses.filter((course) =>
        filterLevels.includes(course.course_level)
      );
      setFilteredData(filteredCourses);
    } else {
      // If no levels are selected, show all courses
      setFilteredData(courses);
    }
  }, [filterLevels, courses]);

  const handleFilterDuration = (item) => {
    setFilterDuration(item);
  };

  useEffect(() => {
    const filteredCourses = courses.filter((course) => {
      if (!selectedPriceRange) {
        return true; // Return true if no price range is selected
      } else {
        return (
          course.cost >= selectedPriceRange.min &&
          course.cost <= selectedPriceRange.max
        );
      }
    });
    setFilteredData(filteredCourses);
  }, [selectedPriceRange, courses]);
  const getCountByPriceRange = (minPrice, maxPrice) => {
    if (minPrice === "All") {
      return `(${courses.length})`;
    } else {
      const count = courses.filter(
        (course) => course.cost >= minPrice && course.cost <= maxPrice
      ).length;
      return `(${count})`;
    }
  };

  return (
    <>
      <section className="page-header layout-pt-md">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Courses</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    Join us on a journey to explore the art and science of user
                    interface design, and take your skills to the next level.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50">
            <div className="col-xl-9 col-lg-8">
              <div className="row y-gap-30">
                {status === "loading" && <div>Loading...</div>}
                {status === "failed" && <div>Error: {error}</div>}
                {filteredData.map((course) => (
                  <div
                    key={course.course_id}
                    className="col-xl-4 col-lg-6 col-md-4 col-sm-6"
                  >
                    <div className="coursesCard -type-1 ">
                      <div className="relative">
                        <div className="coursesCard__image overflow-hidden rounded-8">
                          <img
                            width={530}
                            height={370}
                            className="w-1/1"
                            src={course.images[0]}
                            alt="image"
                          />
                          <div className="coursesCard__image_overlay rounded-8"></div>
                        </div>
                        <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                          {course.popular && (
                            <>
                              <div>
                                <div className="px-15 rounded-200 bg-purple-1">
                                  <span className="text-11 lh-1 uppercase fw-500 text-white">
                                    Popular
                                  </span>
                                </div>
                              </div>

                              <div>
                                <div className="px-15 rounded-200 bg-green-1">
                                  <span className="text-11 lh-1 uppercase fw-500 text-dark-1">
                                    Best sellers
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="h-100 pt-15">
                        <div className="d-flex items-center">
                          <div className="text-14 lh-1 text-yellow-1 mr-10">
                            4
                          </div>
                          <div className="d-flex x-gap-5 items-center">
                            {[...Array(1)].map((_, index) => (
                              <Star key={index} star={2} />
                            ))}
                          </div>
                        </div>

                        <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                          <a
                            className="linkCustom"
                            href={`/courses/${course._id}`}
                          >
                            {course.course_name}
                          </a>
                        </div>
                        <div className="d-flex x-gap-10 items-center pt-10">
                          <div className="d-flex items-center">
                            <div className="mr-8">
                              <img
                                width={16}
                                height={17}
                                src="/assets/img/coursesCards/icons/1.svg"
                                alt="icon"
                              />
                            </div>
                            <div className="text-14 lh-1">
                              {course?.lessonCount} lesson
                            </div>
                          </div>

                          <div className="d-flex items-center">
                            <div className="mr-8">
                              <img
                                width={16}
                                height={17}
                                src="/assets/img/coursesCards/icons/2.svg"
                                alt="icon"
                              />
                            </div>
                            <div className="text-14 lh-1">{`${Math.floor(
                              course.duration / 60
                            )}h ${Math.floor(course.duration % 60)}m`}</div>
                          </div>

                          <div className="d-flex items-center">
                            <div className="mr-8">
                              <img
                                width={16}
                                height={17}
                                src="/assets/img/coursesCards/icons/3.svg"
                                alt="icon"
                              />
                            </div>
                            <div className="text-14 lh-1">
                              {course.course_level}
                            </div>
                          </div>
                        </div>

                        <div className="coursesCard-footer">
                          <div className="coursesCard-footer__author">
                            {course.instructor &&
                              course.instructor.length > 0 && (
                                <>
                                  {course.instructor
                                    .slice(0, 3)
                                    .map((instructor, index) => (
                                      <div
                                        key={index}
                                        className="d-flex align-items-center"
                                      >
                                        <img
                                          width={30}
                                          height={30}
                                          src={instructor.profile_pic}
                                          alt={`Instructor ${index + 1}`}
                                        />
                                        {/* <div className="ml-2">{instructor.name}</div> */}
                                      </div>
                                    ))}
                                  {course.instructor.length > 3 && (
                                    <button className="ml-2">+</button>
                                  )}
                                </>
                              )}
                          </div>

                          <div className="coursesCard-footer__price">
                            {course.paid ? (
                              <>
                                <div>₹{course.originalPrice}</div>
                                <div>₹{course.discountedPrice}</div>
                              </>
                            ) : (
                              <>
                                <div></div>
                                <div>₹{course.cost}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="row justify-center pt-90 lg:pt-50">
                <div className="col-auto">
                  <PaginationTwo
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    data={sortedFilteredData}
                    pageCapacity={12}
                  />
                </div>
              </div> */}
            </div>

            <div className="col-xl-3 col-lg-4 lg:d-none">
              <div className="pl-30 lg:pl-0">
                <div className="sidebar -courses">
                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          categoryOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setShowAllCategories((prev) => !prev)}
                        >
                          <h5 className="sidebar__title">Category</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={categoryOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                onClick={() => setFilterCategories([])}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterCategories.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {categories
                                .slice(
                                  0,
                                  showAllCategories ? categories.length : 3
                                )
                                .map((category, index) => (
                                  <div
                                    key={index}
                                    onClick={() =>
                                      handleFilterCategories(
                                        category.category_name
                                      )
                                    }
                                    className="sidebar-checkbox__item cursor"
                                  >
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                          category.category_name
                                        )}
                                        onChange={() =>
                                          handleCategorySelection(
                                            category.category_name
                                          )
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon icon-check"></div>
                                      </div>
                                    </div>

                                    <div className="sidebar-checkbox__title">
                                      {category.category_name}
                                    </div>

                                    <div className="sidebar-checkbox__count">
                                      (
                                      {
                                        courses.filter(
                                          (course) =>
                                            course.category.category_name ===
                                            category.category_name
                                        ).length
                                      }
                                      )
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <div className="sidebar__more mt-15">
                              <button
                                className="text-14 fw-500 underline text-purple-1"
                                onClick={toggleShowAllCategories}
                              >
                                {showAllCategories ? "Show less" : "Show more"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          instructorOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setInstractorOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Instractor</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={instructorOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                onClick={() => setFilterInstructors([])}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterInstructors.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {instructors &&
                                instructors
                                  .slice(
                                    0,
                                    showAllInstructors ? instructors.length : 3
                                  )
                                  .map((instructor, index) => (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        handleFilterInstructor(instructor.name)
                                      }
                                      className="sidebar-checkbox__item cursor"
                                    >
                                      <div className="form-checkbox">
                                        <input
                                          type="checkbox"
                                          checked={filterInstructors.includes(
                                            instructor.name
                                          )}
                                        />
                                        <div className="form-checkbox__mark">
                                          <div className="form-checkbox__icon icon-check"></div>
                                        </div>
                                      </div>

                                      <div className="sidebar-checkbox__title">
                                        {instructor.name}
                                      </div>

                                      <div className="sidebar-checkbox__count">
                                        (
                                        {
                                          courses.filter((course) =>
                                            course.instructor.some(
                                              (inst) =>
                                                inst.name === instructor.name
                                            )
                                          ).length
                                        }
                                        )
                                      </div>
                                    </div>
                                  ))}
                            </div>

                            <div className="sidebar__more mt-15">
                              <button
                                className="text-14 fw-500 underline text-purple-1"
                                onClick={toggleShowAllinstructors}
                              >
                                {showAllInstructors ? "Show less" : "Show more"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          ratingOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setRatingOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Ratings</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={ratingOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                onClick={() => setFilterRatingRange([])}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-radio mr-10">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      checked={
                                        filterRatingRange.length < 1
                                          ? "checked"
                                          : ""
                                      }
                                    />
                                    <div className="radio__mark">
                                      <div className="radio__icon"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title d-flex items-center">
                                  <div className="d-flex x-gap-5 pr-10">
                                    <Star star={5} textSize={"text-11"} />
                                  </div>
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {rating.map((elm, i) => (
                                <div
                                  key={i}
                                  onClick={() =>
                                    handleFilterRatingRange(elm.range)
                                  }
                                  className="sidebar-checkbox__item cursor"
                                >
                                  <div className="form-radio mr-10">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        checked={
                                          filterRatingRange.join(" ").trim() ==
                                          elm.range.join(" ").trim()
                                            ? "checked"
                                            : ""
                                        }
                                      />
                                      <div className="radio__mark">
                                        <div className="radio__icon"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title d-flex items-center">
                                    <div className="d-flex x-gap-5 pr-10">
                                      <Star star={5} textSize={"text-11"} />
                                    </div>
                                    {elm.text}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) =>
                                          itm.rating >= elm.range[0] &&
                                          itm.rating <= elm.range[1]
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item ${
                          priceOpen ? "is-active" : ""
                        }`}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setPriceOpen((prev) => !prev)}
                        >
                          <h5 className="sidebar__title">Price</h5>
                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>
                        <div
                          className="accordion__content"
                          style={priceOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              {priceRanges.map((range, index) => (
                                <div
                                  key={index}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() => setSelectedPriceRange(range)}
                                >
                                  <div className="form-radio mr-10">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        checked={
                                          selectedPriceRange.label ===
                                          range.label
                                        }
                                      />
                                      <div className="radio__mark">
                                        <div className="radio__icon"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {range.label}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    {getCountByPriceRange(range.min, range.max)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          levelOpen ? "is-active" : ""
                        }  `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setLevelOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Level</h5>
                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>
                        <div
                          className="accordion__content"
                          style={levelOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              {/* Checkbox for all levels */}
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterLevels([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={filterLevels.length === 0}
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {/* Checkboxes for individual levels */}
                              {levels.map((level, index) => (
                                <div
                                  key={index}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() => handleFilterLevels(level)}
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={filterLevels.includes(level)}
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {level}
                                  </div>
                                  {/* You can show the count of courses for each level if needed */}
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      courses.filter(
                                        (course) =>
                                          course.course_level === level
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          durationOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setDurationOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Duration</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={durationOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterDuration([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterDuration.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {duration.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() =>
                                    handleFilterDuration(elm.range)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterDuration.toString() ==
                                        elm.range.toString()
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) =>
                                          itm.duration >= elm.range[0] &&
                                          itm.duration <= elm.range[1]
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
