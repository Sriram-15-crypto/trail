"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Star from "@/components/common/Star";
import { useDispatch, useSelector } from "react-redux";
import { getAllEligibilityCriteria } from "@/redux/slices/mca/eligibility/Eligibility";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useParams } from "next/navigation";

SwiperCore.use([Navigation]);

export default function EligibilityCriteria() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const eligibilityCriteria = useSelector(
    (state) => state.eligibilityCriteria.eligibilityCriteria
  );
  const [swiper, setSwiper] = useState(null);
  const [showSecondValue, setShowSecondValue] = useState(false);

  useEffect(() => {
    // Fetch eligibility criteria when the component mounts
    dispatch(getAllEligibilityCriteria());
  }, [dispatch]);

  const handleNextClick = () => {
    if (swiper) {
      setShowSecondValue(true);
      swiper.slideNext();
    }
  };

  const handlePrevClick = () => {
    if (swiper) {
      setShowSecondValue(false);
      swiper.slidePrev();
    }
  };
  const filteredcriteria = eligibilityCriteria.filter(
    (eligibility) =>
      eligibility.degree_program && eligibility.degree_program._id === id
  );
 
  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        {filteredcriteria.map((criteria, index, i) => (
          <div key={index}>
            <h2
              className="text-45 lg:text-40 md:text-30 text-dark-1"
              data-aos="fade-up"
              data-aos-duration={300}
            >
              Qualification{" "}
            </h2>      <br></br>

            <p key={i}>{criteria.description}</p>
          </div>
        ))}
      </div>
      <br></br>      <br></br>


      <div className="container">
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
          className="eligibility-swiper"
        >
          {filteredcriteria.map((criteria, index, i) => (
            <SwiperSlide key={index}>
              <div className="row y-gap-30 justify-between items-center">
                {criteria.eligibility.map((c, i) => (
                  <div className="col-xl-5 col-lg-6 order-2 order-lg-1">
                    <h2
                      className="text-45 lg:text-40 md:text-30 text-dark-1"
                      data-aos="fade-up"
                      data-aos-duration={300}
                    >
                      Round {index + 1} :
                      <span className="text-purple-1"> {c.title}</span>
                    </h2>

                    <div className="row y-gap-30 pt-60 lg:pt-40">
                      {criteria.eligibility[0].assesment.map(
                        (assessment, i) => (
                          <div key={i} className="col-12">
                            <div
                              className="featureIcon -type-1"
                              data-aos="fade-up"
                              data-aos-duration={(i + 1) * 250}
                            >
                              <div className="featureIcon__icon bg-light-7">
                                <img
                                  src={assessment.icon}
                                  alt="Icon"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "5px",
                                  }}
                                />
                              </div>
                              <div className="featureIcon__content ml-30 md:ml-20">
                                <h4 className="text-17 fw-500">
                                  {assessment.subtitle}
                                </h4>
                                <p className="mt-5">{assessment.objective}</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
                <div className="col-lg-6 order-1 order-lg-2">
                  <div className="composition -type-5">
                    <div className="-el-1">
                      <Image
                        width={550}
                        height={550}
                        src="/assets/img/home-7/about/up.jpg"
                        alt="image"
                      />
                    </div>

                    <div className="-el-2">
                      <Image
                        width={330}
                        height={330}
                        src="/assets/img/home-7/about/down.jpg"
                        alt="image"
                      />
                    </div>

                    <div className="-el-3">
                      <div className="sm:d-none img-el -w-260 px-20 py-20 d-flex items-center bg-white rounded-8 shadow-6">
                        <div className="size-50 d-flex justify-center items-center bg-red-2 rounded-full">
                          <Image
                            width={24}
                            height={24}
                            src="/assets/img/masthead/1.svg"
                            alt="icon"
                          />
                        </div>
                        <div className="ml-20">
                          <div className="text-orange-1 text-16 fw-500 lh-1">
                            3.000 +
                          </div>
                          <div className="mt-3">Free Courses</div>
                        </div>
                      </div>
                    </div>

                    <div className="-el-4">
                      <div className="img-el -w-260 px-30 py-20 d-flex items-center bg-white rounded-8 shadow-6">
                        <div className="img-el__side">
                          <div className="size-50 d-flex justify-center items-center bg-purple-1 rounded-full">
                            <Image
                              width={20}
                              height={27}
                              src="/assets/img/masthead/2.svg"
                              alt="icon"
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="text-purple-1 text-16 fw-500 lh-1">
                            Congrats!
                          </div>
                          <div className="mt-3">Your Admission Completed</div>
                        </div>
                      </div>
                    </div>

                    <div className="-el-5">
                      <div className="sm:d-none img-el -w-260 px-20 py-20 d-flex items-center bg-white rounded-8 shadow-6">
                        <Image
                          width={70}
                          height={70}
                          src="/assets/img/masthead/4.png"
                          alt="icon"
                        />
                        <div className="ml-20">
                          <div className="text-dark-1 text-16 fw-500 lh-1">
                            Become a
                          </div>
                          <div className="mt-3">MCA Student</div>
                          <div className="d-flex x-gap-5 mt-3">
                            <Star star={5} textSize={"text-11"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-buttons">
        <button
          className="prev-button"
          onClick={handlePrevClick}
          disabled={!swiper || swiper.isBeginning}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={handleNextClick}
          disabled={!swiper || swiper.isEnd}
        >
          Next
        </button>
      </div>
    </section>
  );
}
