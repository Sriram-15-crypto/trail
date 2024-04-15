import React, { useState, useEffect } from "react";
import axios from "axios";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
SwiperCore.use([Autoplay]);

export default function TabComponent({ backgroundColor, serviceId }) {
  // State variables initialization
  const [activeTab, setActiveTab] = useState(0);
  const [managedCampus, setManagedCampus] = useState([]);
  const [showSlider, setShowSlider] = useState(false);

  const [selectedYear, setSelectedYear] = useState("");
  const uniqueYears = new Set();
  const [hoveredCard, setHoveredCard] = useState(null);
  const executionOverviews = useSelector(
    (state) => state.executionOverviews.executionOverviews
  );

  useEffect(() => {
    setShowSlider(true);
  }, []);
  // Effect hook to fetch managed campus data
  useEffect(() => {
    const fetchManagedCampus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5353/getAll/managed_campus"
        );
        setManagedCampus(response.data.getAllManagedCampus);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching managed campus:", error);
      }
    };

    fetchManagedCampus();
  }, []);
  // Function to handle tab click
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };
  const jumpAnimation = {
    animationName: {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-5px)" },
      "100%": { transform: "translateY(0)" },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  };
  executionOverviews.forEach((overview) => {
    uniqueYears.add(overview.year);
  });

  return (
    <section className="pt-30 layout-pb-md">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex js-tabs-controls">
                  {/* Check if managedCampus is defined before mapping */}
                  {managedCampus &&
                    managedCampus.map((campus, index) => (
                      <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`tabs__button js-tabs-button js-update-pin-scene ${
                          index !== 0 ? "ml-30" : ""
                        } ${index === activeTab ? "is-active" : ""}`}
                        type="button"
                      >
                        {campus.sub_title}
                      </button>
                    ))}
                </div>
                <div className="tabs__content js-tabs-content">
                  {/* Check if managedCampus is defined before rendering */}
                  {managedCampus &&
                    managedCampus.map((campus, index) => (
                      <div
                        key={index}
                        className={`tabs__pane -tab-item-${index + 1} ${
                          index === activeTab ? "is-active" : ""
                        }`}
                      >
                        {index === activeTab && (
                          <section className="layout-pt-sm layout-pb-sm section-bg">
                            <div className="section-bg__item"></div>
                            <div className="container">
                              <div className="row y-gap-20 justify-center text-center">
                                <div className="col-auto">
                                  <div className="sectionTitle ">
                                    <h2 className="sectionTitle__title ">
                                      Executive Highlights
                                    </h2>
                                    <p className="sectionTitle__text ">
                                      Executive highlights succinctly summarize
                                      key accomplishments, providing
                                      stakeholders with a snapshot of
                                      significant developments and achievements.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Swiper component to display executive highlights */}
                              <Swiper
                                className="pt-30"
                                modules={[Navigation, Pagination]}
                                pagination={{
                                  el: ".swiper-pagination",
                                  clickable: true,
                                }}
                              >
                                {campus.execution_highlights.map(
                                  (highlight, index) => (
                                    <SwiperSlide key={index}>
                                      <div className="row">
                                        <div className="col-lg-3 col-md-6">
                                          <div className="infoCard -type-2 text-center py-40 -infoCard-hover">
                                            <div className="infoCard__image">
                                              {/* Displaying image */}
                                              <img
                                                src={highlight.image}
                                                alt="image"
                                                width="50"
                                                height="50"
                                              />
                                            </div>
                                            <h5 className="infoCard__title text-24 lh-1 mt-25">
                                              {/* Displaying title */}
                                              {highlight.service.title}
                                            </h5>
                                            <p className="infoCard__text mt-5">
                                              {/* Displaying count */}
                                              {highlight.count}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  )
                                )}
                              </Swiper>
                            </div>
                          </section>
                        )}
                        <section
                          className={`layout-pt-sm layout-pb-sm ${
                            backgroundColor ? backgroundColor : ""
                          }`}
                        >
                          <div className="container">
                            <div className="row y-gap-20 justify-center text-center">
                              <div className="col-auto">
                                <div className="sectionTitle ">
                                  <h2 className="sectionTitle__title ">
                                    Our Clients
                                  </h2>
                                  <p className="sectionTitle__text "></p>
                                </div>
                              </div>
                            </div>
                            <div className="row y-gap-30 pt-50">
                              {showSlider && (
                                <Swiper
                                  breakpoints={{
                                    450: {
                                      slidesPerView: 1,
                                    },
                                    768: {
                                      slidesPerView: 2,
                                    },
                                    1200: {
                                      slidesPerView: 3,
                                    },
                                  }}
                                  slidesPerView={4}
                                  spaceBetween={50}
                                  autoplay={{ delay: 8000 }}
                                >
                                  {campus.our_client.map((client, i) => (
                                    <SwiperSlide key={i}>
                                      <div className="teamCard -type-1 -teamCard-hover">
                                        <div className="teamCard__image">
                                          <div
                                            style={{
                                              width: "100%",
                                              height: "200px",
                                              overflow: "hidden",
                                            }}
                                          >
                                            <Image
                                              src={`http://localhost:5353/uploads/services/company_logo/${client.image}`}
                                              alt="image"
                                              layout="responsive"
                                              width={300}
                                              height={200}
                                              style={{ objectFit: "cover" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="teamCard__content">
                                          <h4 className="teamCard__title">
                                            <a
                                              href={`/instructors/${client._id}`}
                                              className="linkCustom"
                                            >
                                              {client.name}
                                            </a>
                                          </h4>
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              )}
                            </div>
                          </div>
                        </section>
                        <div className="dashboard__main mt-0 content-wrapper  js-content-wrapper overflow-hidden ">
                          <div className="dashboard__content pt-0 px-15 pb-0">
                            <section className="layout-pt-sm layout-pb-sm border-top-light">
                              <div className="container">
                                <div className="row justify-center text-center">
                                  <div className="col-auto">
                                    <div className="sectionTitle">
                                      <h2 className="sectionTitle__title">
                                        Execution Overview
                                      </h2>
                                      <p className="sectionTitle__text">
                                        Lorem ipsum dolor sit amet, consectetur.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-60 lg:pt-50 js-section-slider">
                                  {showSlider && (
                                    <>
                                      <div style={{ marginTop: "10px" }}>
                                        Filter based on Year: <br />
                                        <button
                                          className={`year-button ${
                                            selectedYear === ""
                                              ? "selected"
                                              : ""
                                          }`}
                                          onClick={() => handleYearFilter("")}
                                          style={{
                                            marginRight: "10px",
                                            backgroundColor:
                                              selectedYear === ""
                                                ? "#e78e34"
                                                : "#f7f8fb",
                                            padding: "10px",
                                            borderRadius: "8px",
                                            marginTop: "10px",
                                          }}
                                        >
                                          All Years
                                        </button>
                                        {[...uniqueYears].map((year) => (
                                          <button
                                            key={year}
                                            className={`year-button ${
                                              selectedYear === year
                                                ? "selected"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              handleYearFilter(year)
                                            }
                                            style={{
                                              marginRight: "10px",
                                              backgroundColor:
                                                selectedYear === year
                                                  ? "#e78e34"
                                                  : "#f7f8fb",
                                              padding: "10px",
                                              borderRadius: "8px",
                                              marginTop: "10px",
                                            }}
                                          >
                                            {year}
                                          </button>
                                        ))}
                                      </div>
                                      <br />

                                      <Swiper
                                        className="overflow-visible"
                                        modules={[Navigation, Pagination]}
                                        pagination={{
                                          el: ".event-four-pagination",
                                          clickable: true,
                                        }}
                                        navigation={{
                                          nextEl:
                                            ".icon-arrow-right-event-four",
                                          prevEl: ".icon-arrow-left-event-four",
                                        }}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        breakpoints={{
                                          450: {
                                            slidesPerView: 1,
                                          },
                                          768: {
                                            slidesPerView: 2,
                                          },
                                          1200: {
                                            slidesPerView: 3,
                                          },
                                        }}
                                      >
                                        {campus.execution_overview.map(
                                          (overview, i) => (
                                            <SwiperSlide
                                              key={i}
                                              className="swiper-slide"
                                            >
                                              <div
                                                className="swiper-slide"
                                                onMouseEnter={() =>
                                                  setHoveredCard(i)
                                                }
                                                onMouseLeave={() =>
                                                  setHoveredCard(null)
                                                }
                                              >
                                                <div
                                                  className="eventCard -type-3 rounded-8"
                                                  style={{
                                                    background:
                                                      hoveredCard === i
                                                        ? "#e78e34"
                                                        : "linear-gradient(#f4f1fe 49%, #e78e34 50%)",
                                                  }}
                                                >
                                                  {overview.type &&
                                                    overview.typeName && (
                                                      <div>
                                                        <span
                                                          className="lh-1 fw-700"
                                                          style={{
                                                            fontSize: "35px",
                                                            color:
                                                              hoveredCard === i
                                                                ? "#e78e34"
                                                                : "#000",
                                                          }}
                                                        >
                                                          {overview.type} :{" "}
                                                          {overview.typeName}
                                                        </span>
                                                      </div>
                                                    )}

                                                  <br />

                                                  <h4
                                                    className="eventCard__title text-24 lh-15 fw-500"
                                                    style={{ color: "#e78e34" }}
                                                  >
                                                    Year: {overview.year}
                                                  </h4>
                                                  <h4
                                                    className="eventCard__title text-24 lh-15 fw-500"
                                                    style={{ color: "#e78e34" }}
                                                  >
                                                    Duration:{" "}
                                                    {overview.duration}
                                                  </h4>
                                                  <h4
                                                    className="eventCard__title text-24 lh-15 fw-500"
                                                    style={{ color: "#e78e34" }}
                                                  >
                                                    Status: {overview.status}
                                                  </h4>

                                                  <h4
                                                    className="eventCard__title text-24 lh-15 fw-500"
                                                    style={{ color: "#e78e34" }}
                                                  >
                                                    Stack: {overview.stack}
                                                  </h4>

                                                  <h4
                                                    className="eventCard__title text-24 lh-15 fw-500"
                                                    style={{ color: "#e78e34" }}
                                                  >
                                                    Batchname:{" "}
                                                    {overview.batchName}
                                                  </h4>
                                                  {hoveredCard === i ? (
                                                    <div
                                                      className="hover-content"
                                                      style={{
                                                        position: "absolute",
                                                        bottom: "0",
                                                        left: "50%",
                                                        transform:
                                                          "translateX(-50%)",
                                                        zIndex: "1",
                                                      }}
                                                    ></div>
                                                  ) : (
                                                    <div
                                                      className="hover-content"
                                                      style={{
                                                        position: "absolute",
                                                        bottom: "0",
                                                        left: "50%",
                                                        transform:
                                                          "translateX(-50%)",
                                                        zIndex: "1",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      <p
                                                        className="hover-text"
                                                        style={{
                                                          color: "#000",
                                                          animation: `${jumpAnimation.animationName} ${jumpAnimation.animationDuration} infinite`,
                                                        }}
                                                      >
                                                        Hover here
                                                      </p>
                                                      <FontAwesomeIcon
                                                        icon={faArrowDown}
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </SwiperSlide>
                                          )
                                        )}
                                      </Swiper>
                                    </>
                                  )}

                                  <div className="d-flex justify-center x-gap-15 items-center pt-60 lg:pt-40">
                                    <div className="col-auto">
                                      <button className="d-flex items-center text-24 arrow-left-hover js-prev icon-arrow-left-event-four">
                                        <i className="icon icon-arrow-left"></i>
                                      </button>
                                    </div>
                                    <div className="col-auto">
                                      <div className="pagination -arrows js-pagination event-four-pagination"></div>
                                    </div>
                                    <div className="col-auto">
                                      <button className="d-flex items-center text-24 arrow-right-hover js-next icon-arrow-right-event-four">
                                        <i className="icon icon-arrow-right"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
