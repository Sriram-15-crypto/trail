import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchExecutionOverview } from "@/redux/slices/services/executionOverview/ExecutionOverview";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function ExecutionOverview({ serviceId }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const executionOverviews = useSelector(
    (state) => state.executionOverviews.executionOverviews
  );
  const [selectedYear, setSelectedYear] = useState("");
  const uniqueYears = new Set();
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    dispatch(fetchExecutionOverview());
  }, [dispatch]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };

  const filteredOverview = executionOverviews.filter(
    (executionOverview) =>
      executionOverview.service._id === serviceId &&
      (!selectedYear || executionOverview.year === selectedYear)
  );

  // Collect unique years
  executionOverviews.forEach((overview) => {
    uniqueYears.add(overview.year);
  });

  // Define jump animation
  const jumpAnimation = {
    animationName: {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-5px)" },
      "100%": { transform: "translateY(0)" },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  };

  return (
    <section className="layout-pt-sm layout-pb-sm border-top-light">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">Execution Overview</h2>
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
                    selectedYear === "" ? "selected" : ""
                  }`}
                  onClick={() => handleYearFilter("")}
                  style={{
                    marginRight: "10px",
                    backgroundColor:
                      selectedYear === "" ? "#e78e34" : "#f7f8fb",
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
                      selectedYear === year ? "selected" : ""
                    }`}
                    onClick={() => handleYearFilter(year)}
                    style={{
                      marginRight: "10px",
                      backgroundColor:
                        selectedYear === year ? "#e78e34" : "#f7f8fb",
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
                  nextEl: ".icon-arrow-right-event-four",
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
                {filteredOverview.slice(0, 6).map((elm, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div
                      className="swiper-slide"
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
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
                        {elm.type[0] && elm.typeName[0] && (
                          <div>
                            <span
                              className="lh-1 fw-700"
                              style={{
                                fontSize: "35px",
                                color: hoveredCard === i ? "#e78e34" : "#000",
                              }}
                            >
                              {elm.type[0]} : {elm.typeName[0]}
                            </span>
                          </div>
                        )}
                        <br />

                        {elm.type[1] && elm.typeName[1] && (
                          <div>
                            <span
                              className="lh-1 fw-700"
                              style={{
                                fontSize: "35px",
                                color: hoveredCard === i ? "#e78e34" : "#000",
                              }}
                            >
                              {elm.type[1]} : {elm.typeName[1]}
                            </span>
                          </div>
                        )}
                        <br />
                        {elm.type[2] && elm.typeName[2] && (
                          <div>
                            <span
                              className="lh-1 fw-700"
                              style={{
                                fontSize: "35px",
                                color: hoveredCard === i ? "#e78e34" : "#000",
                              }}
                            >
                              {elm.type[2]} : {elm.typeName[2]}
                            </span>
                          </div>
                        )}
                        {elm.type[3] && elm.typeName[3] && (
                          <div>
                            <span
                              className="lh-1 fw-700"
                              style={{
                                fontSize: "35px",
                                color: hoveredCard === i ? "#e78e34" : "#000",
                              }}
                            >
                              {elm.type[3]} : {elm.typeName[3]}
                            </span>
                          </div>
                        )}
                        {elm.type[4] && elm.typeName[4] && (
                          <div>
                            <span
                              className="lh-1 fw-700"
                              style={{
                                fontSize: "35px",
                                color: hoveredCard === i ? "#e78e34" : "#000",
                              }}
                            >
                              {elm.type[4]} : {elm.typeName[4]}
                            </span>
                          </div>
                        )}
                        <h4
                          className="eventCard__title text-24 lh-15 fw-500"
                          style={{ color: "#e78e34" }}
                        >
                          Year: {elm.year}
                        </h4>
                        <h4
                          className="eventCard__title text-24 lh-15 fw-500"
                          style={{ color: "#e78e34" }}
                        >
                          Duration: {elm.duration}
                        </h4>
                        <h4
                          className="eventCard__title text-24 lh-15 fw-500"
                          style={{ color: "#e78e34" }}
                        >
                          Status: {elm.status}
                        </h4>
                        <h4
                          className="eventCard__title text-24 lh-15 fw-500"
                          style={{ color: "#e78e34" }}
                        >
                          Stack: {elm.stack.stack}
                        </h4>

                        <h4
                          className="eventCard__title text-24 lh-15 fw-500"
                          style={{ color: "#e78e34" }}
                        >
                          Batchname: {elm.batchName}
                        </h4>
                        {hoveredCard === i ? (
                          <div
                            className="hover-content"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              left: "50%",
                              transform: "translateX(-50%)",
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
                              transform: "translateX(-50%)",
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
                            <FontAwesomeIcon icon={faArrowDown} />
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
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
  );
}
