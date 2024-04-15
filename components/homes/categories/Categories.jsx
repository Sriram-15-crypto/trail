"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, selectCourses } from "@/redux/slices/course/course";
import { useRouter } from "next/navigation";

export default function CategoriesTwo() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    console.log("Clicked category:", categoryName);
    setSelectedCategory(categoryName);

    router.push(`/courses`); // Adjust the route as per your requirement
  };
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">Top Categories</h2>
              <p className="sectionTitle__text">
                Expand your knowledge with informative resources and educational
                content
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {courses.map((course, i) => (
            <div className="col-lg-4 col-md-6" key={i}>
              <div
                onClick={() =>
                  handleCategoryClick(course.category.category_name)
                }
                className="linkCustomTwo"
              >
                <div className="categoryCard -type-1">
                  <div
                    className="categoryCard__image"
                    style={{ position: "relative" }}
                  >
                    {course.images && course.images.length > 0 ? (
                      <div
                        className="bg-image ratio ratio-30:16 js-lazy"
                        style={{
                          backgroundImage: `url(${course.images[0]})`,
                          filter: "blur(2px)",
                        }}
                      ></div>
                    ) : (
                      <div
                        className="bg-image ratio ratio-30:16"
                        style={{
                          backgroundImage: `url('/fallback-image.jpg')`,
                        }}
                      ></div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        zIndex: "1",
                      }}
                    ></div>
                  </div>

                  <div className="categoryCard__content text-center">
                    <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                      {course?.category?.category_name}
                    </h4>
                    <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                      {course?.category?.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
