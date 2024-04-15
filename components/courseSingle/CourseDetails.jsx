"use client";
 
import Instractor from "./Instractor";
import Reviews from "./Reviews";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Star from "../common/Star";
import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";
 
import ModalVideoComponent from "../common/ModalVideo";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "@/redux/slices/course/course";
import { getAllCourseModules } from "@/redux/slices/courseModules/courseModules";
import SoftwareTools from "./SoftwareTools";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import FAQComponent from "./Faq";
import {
  fetchCareerOpportunities,
  selectCareerOpportunities,
  selectCareerOpportunitiesError,
} from "@/redux/slices/careerOppertunities/careerOppertunities";
import Link from "next/link";
 
const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
  { id: 3, href: "#instructors", text: "Instructors", isActive: false },
  { id: 4, href: "#Software-Tools", text: "Software Tools", isActive: false },
  { id: 5, href: "#FAQ", text: "FAQ", isActive: false },
  { id: 6, href: "#reviews", text: "Reviews", isActive: false },
];
const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
};
export default function CourseDetailsSix() {
  const router = useRouter();
 
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const { id } = useParams();
  const selectedCourse = useSelector((state) => state.courses.selectedCourse);
  const courseModules = useSelector(
    (state) => state.courseModule.courseModules
  );
  const [pageItem, setPageItem] = useState(null);
  const [cartCourses, setCartCourses] = useState([]);
 
  const faq = useSelector((state) => state.faq.faq);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [filteredModules, setFilteredModules] = useState([]);
  const [filteredFAQ, setFilteredFAQ] = useState([]);
  const { isAddedToCartCourses, addCourseToCart } = useContextElement();
  const opportunities = useSelector(selectCareerOpportunities);
  const error = useSelector(selectCareerOpportunitiesError);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
 
  const handleWishlistButtonClick = () => {
    if (isAddedToCartCourses(pageItem._id)) {
      console.log("Course is already added to cart");
      // Handle accordingly (e.g., show a message)
    } else {
      const cookiesToken = getCookie("token");
      if (cookiesToken) {
        // Add the course to the wishlist
        addCourseToCart(pageItem._id);
 
        // Update the cartCourses state with the course details
        const updatedCartCourses = [
          ...cartCourses,
          {
            id: pageItem._id,
            title: pageItem.course_name,
            price: pageItem.cost,
            imageSrc: pageItem.imageSrc, // Add imageSrc if available
            discountedPrice: discountedPrice, // Include the discounted price
          },
        ];
        setCartCourses(updatedCartCourses);
 
        // Handle success (e.g., show a success message)
      } else {
        // Store the current URL before redirecting to the signup page
        const currentURL = window.location.href;
        router.push(`/login?redirect=${encodeURIComponent(currentURL)}`);
      }
    }
  };
 
  useEffect(() => {
    console.log("Fetching course...");
    if (id) {
      dispatch(fetchCourseById(id))
        .then((action) => {
          const fetchedCourse = action.payload;
          setPageItem(fetchedCourse);
          console.log("Fetched course:", fetchedCourse);
          calculateDiscountedPrice(fetchedCourse?.cost);
        })
        .catch((error) => {
          console.error("Error fetching course:", error);
        });
    }
  }, [id, dispatch]);
 
  useEffect(() => {
    console.log("Course modules:", courseModules);
    if (selectedCourse && courseModules) {
      const filteredModules = courseModules.filter(
        (module) => module.course._id === selectedCourse._id
      );
      setFilteredModules(filteredModules);
    }
  }, [selectedCourse, courseModules]);
 
  useEffect(() => {
    console.log("Fetching all course modules...");
    dispatch(getAllCourseModules());
  }, [dispatch]);
 
  useEffect(() => {
    console.log("Fetching all faq...");
    dispatch(fetchAllFAQs());
  }, [dispatch]);
 
  useEffect(() => {
    dispatch(fetchCareerOpportunities());
  }, [dispatch]);
 
  useEffect(() => {
    console.log("Opportunities:", opportunities);
    console.log("Error:", error);
    if (
      selectedCourse &&
      opportunities &&
      Array.isArray(opportunities.careerOpportunities)
    ) {
      const filteredOpportunities = opportunities.careerOpportunities.filter(
        (opportunity) => opportunity.course._id === selectedCourse._id
      );
      console.log("Filtered Opportunities:", filteredOpportunities);
      setFilteredOpportunities(filteredOpportunities);
    } else {
      console.error(
        "Opportunities is not an array or doesn't have careerOpportunities."
      );
    }
  }, [opportunities, error, selectedCourse]);
 
  useEffect(() => {
    console.log("FAQ:", faq);
    if (selectedCourse && faq) {
      const filteredFAQ = faq.filter(
        (item) => item.course && item.course._id === selectedCourse._id
      );
      console.log("Filtered FAQ:", filteredFAQ);
      setFilteredFAQ(filteredFAQ);
    }
  }, [faq, selectedCourse]);
 
  const calculateDiscountedPrice = (price) => {
    if (price) {
      const discount = price * 0.1; // 10% discount
      const discountedPrice = price - discount;
      setDiscountedPrice(discountedPrice);
    }
  };
 
  return (
    <>
      <section className="page-header -type-5 bg-dark-1">
        <div className="page-header__bg">
          <div
            className="bg-image js-lazy"
            data-bg="img/event-single/bg.png"
          ></div>
        </div>
 
        <div className="container">
          <div className="page-header__content pt-80 pb-90">
            <div className="row y-gap-30 justify-between">
              <div className="col-xl-6 col-lg-6">
                <div className="d-flex x-gap-15 y-gap-10 pb-20">
                  <div>
                    <div className="badge px-15 py-8 text-15 bg-orange-1 text-white fw-400">
                      Course Summary{" "}
                    </div>
                  </div>
                  {/* <div>
                    <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                      NEW
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">
                      POPULAR
                    </div>
                  </div> */}
                </div>
 
                {pageItem && (
                  <div>
                    <h1 className="text-30 lh-14 text-white pr-60 lg:pr-0">
                      {pageItem.course_name}
                    </h1>
                  </div>
                )}
 
                {pageItem && (
                  <p className="text-white mt-20">
                    {pageItem.short_description}
                  </p>
                )}
 
                <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                  <div className="d-flex x-gap-5 items-center">
                    <div className="text-14 lh-1 text-yellow-1 mr-10">5 </div>
                    <div className="text-14 lh-1 text-yellow-1 mr-10">
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>{" "}
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
 
                  {/* <div className="d-flex items-center text-dark-3">
                    <div className="icon icon-person-3 text-13"></div>
                    <div className="text-14 ml-8">
                      853 enrolled on this course
                    </div>
                  </div>
 
                  <div className="d-flex items-center text-dark-3">
                    <div className="icon icon-wall-clock text-13"></div>
                    <div className="text-14 ml-8">Last updated 11/2021</div>
                  </div> */}
                </div>
 
                <div className="d-flex items-center pt-20">
                  {selectedCourse &&
                    selectedCourse.instructor &&
                    selectedCourse.instructor.length > 0 &&
                    selectedCourse.instructor
                      .slice(0, 3)
                      .map((instructor, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center mr-3"
                        >
                          <div className="bg-image size-30 rounded-full js-lazy overflow-hidden">
                            <img
                              src={instructor.profile_pic}
                              alt={`Instructor ${index + 1}`}
                              className="w-100 h-100 object-cover"
                            />
                          </div>
                          {/* <div className="text-14 lh-1 ml-2 text-white">{instructor.name}</div> */}
                        </div>
                      ))}
                  {selectedCourse &&
                    selectedCourse.instructor &&
                    selectedCourse.instructor.length > 3 && (
                      <button className="ml-2">+</button>
                    )}
                </div>
 
                <div className="mt-30">
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-puzzle"></div>
                      <div className="ml-10">Course id</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">{pageItem.course_id}</div>
                    )}
                  </div>
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-video-file"></div>
                      <div className="ml-10">Course Level</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">{pageItem.course_level}</div>
                    )}
                  </div>
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-clock-2"></div>
                      <div className="ml-10">Duration</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">
                        {pageItem.duration} hours
                      </div>
                    )}
                  </div>
 
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-bar-chart-2"></div>
                      <div className="ml-10">Mode of training</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">
                        {pageItem.mode_of_trainee}
                      </div>
                    )}
                  </div>
 
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-translate"></div>
                      <div className="ml-10">No.of Assesments</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">
                        {pageItem.number_of_assesment}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-infinity"></div>
                      <div className="ml-10">No.of Projects</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">{pageItem.projects}</div>
                    )}
                  </div>
                  <div className="d-flex justify-between py-8 border-bottom-light-2">
                    <div className="d-flex items-center text-white">
                      <div className="icon-badge"></div>
                      <div className="ml-10">Certificate</div>
                    </div>
                    {pageItem && (
                      <div className="text-white">{pageItem.certificate}</div>
                    )}
                  </div>
                </div>
              </div>
 
              <div className="col-xl-5 col-lg-6">
                <div className="relative">
                  {selectedCourse &&
                    selectedCourse.images &&
                    selectedCourse.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="w-1/1"
                      />
                    ))}
 
                  <div className="absolute-full-center d-flex justify-center items-center">
                    <div className="d-flex justify-center items-center size-60 js-gallery"></div>
                  </div>
                </div>
 
                <div className="mt-30">
                  {pageItem && (
                    <div className="d-flex justify-between items-center">
                      <div className="text-24 lh-1 text-white fw-500">
                        ${pageItem.cost}
                      </div>
                      <div className="lh-1 line-through text-white">
                        ${Math.round(pageItem.cost * 0.9)} {/* 10% discount */}
                      </div>
                    </div>
                  )}
                  <div className="row x-gap-30 y-gap-20 pt-30">
                    {/* <div className="col-sm-6">
                      {pageItem && (
                        <button
                          className="button -md text-white w-1/1"
                          onClick={handleWishlistButtonClick}
                          style={{ backgroundColor: "#F2775E" }}
                        >
                          {isAddedToCartCourses(pageItem.id)
                            ? "Already Added"
                            : "Wishlist"}
                        </button>
                      )}
                    </div> */}
                    <div className="col-sm-6">
                      {/* Buy Now button */}
                      <Link href="/applyCourse" className="button -md -outline-green-1 text-green-1 w-1/1">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section className="pt-30 layout-pb-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
                <div className="tabs -active-purple-2 js-tabs pt-0">
                  <div className="tabs__controls d-flex js-tabs-controls">
                    {menuItems.map((elm, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(elm.id)}
                        className={`tabs__button js-tabs-button js-update-pin-scene ${
                          i != 0 ? "ml-30" : ""
                        } ${activeTab == elm.id ? "is-active" : ""} `}
                        type="button"
                      >
                        {elm.text}
                      </button>
                    ))}
                  </div>
 
                  <div className="tabs__content   js-tabs-content">
                    <div
                      className={`tabs__pane -tab-item-1 ${
                        activeTab == 1 ? "is-active" : ""
                      } `}
                    >
                      <Overview
                        objective={pageItem && pageItem.objective}
                        opportunities={filteredOpportunities}
                      />
                    </div>
 
                    <div
                      className={`tabs__pane -tab-item-2 ${
                        activeTab == 2 ? "is-active" : ""
                      } `}
                    >
                      <CourseContent filteredModules={filteredModules} />
                    </div>
 
                    <div
                      className={`tabs__pane -tab-item-3 ${
                        activeTab == 3 ? "is-active" : ""
                      } `}
                    >
                      {/* Pass instructor props to the Instructor component */}
                      {pageItem && (
                        <Instractor instructor={pageItem.instructor} />
                      )}
                    </div>
                    <div
                      className={`tabs__pane -tab-item-4 ${
                        activeTab == 4 ? "is-active" : ""
                      } `}
                    >
                      {pageItem && (
                        <SoftwareTools softwareTools={pageItem.tool_software} />
                      )}
                    </div>
 
                    <div
                      className={`tabs__pane -tab-item-5 ${
                        activeTab === 5 ? "is-active" : ""
                      } `}
                    >
                      <FAQComponent faq={filteredFAQ} />
                    </div>
 
                    <div
                      className={`tabs__pane -tab-item-5 ${
                        activeTab == 6 ? "is-active" : ""
                      } `}
                    >
                      <Reviews />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <ModalVideoComponent
        videoId={"LlCwHnp3kL4"}
        // isOpen={isOpen}
        // setIsOpen={setIsOpen}
      />
    </>
  );
}