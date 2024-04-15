"use client";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalVideoComponent from "../common/ModalVideo";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function CourseContent({ filteredModules }) {
  const [activeItemId, setActiveItemId] = useState(null);
  const [showAllModules, setShowAllModules] = useState(false);
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  console.log("Received filteredModules:", filteredModules);

  const toggleAccordion = (moduleId) => {
    setActiveItemId((prev) => (prev === moduleId ? null : moduleId));
  };

  // Extracting all modules from the filteredModules array
  const allModules =
    filteredModules && filteredModules.length > 0 ? filteredModules[0].modules : [];

  const handleApply = () => {
    if (cookies.token) {
      setShowAllModules(true);
    } else {
      // Store the current URL before redirecting to the login page
      const currentURL = window.location.href;
      router.push(`/login?redirect=${encodeURIComponent(currentURL)}`);
    }
  };

  return (
    <>
      <div id="course-content" className="pt-60 lg:pt-40">
        <h2 className="text-20 fw-500">Course Content</h2>

        <div className="mt-10">
          {allModules.length > 0 ? (
            <div className="accordion -block-2 text-left js-accordion">
              {showAllModules
                ? allModules.map((module, index) => (
                    <div key={module._id}>
                      <div
                        onClick={() => toggleAccordion(module._id)}
                        className={`accordion__button py-20 mt-10 px-30 bg-light-4 ${
                          activeItemId === module._id ? "is-active" : ""
                        }`}
                      >
                        <div className="d-flex items-center">
                          <div className="accordion__icon">
                            <div className="icon">
                              <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <div className="icon">
                              <FontAwesomeIcon icon={faChevronUp} />
                            </div>
                          </div>
                          <span className="text-17 fw-500 text-dark-1">{module.title}</span>
                        </div>
                      </div>

                      <div
                        className={`accordion__content ${
                          activeItemId === module._id ? "is-active" : ""
                        }`}
                        style={activeItemId === module._id ? { maxHeight: "700px" } : {}}
                      >
                        <div className="accordion__content__inner px-30 py-30">
                          <div className="y-gap-20">
                            {module.sub_title &&
                              module.sub_title.map((sub, k) => (
                                <div key={k} className="d-flex justify-between">
                                  <div className="d-flex items-center">
                                    <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                      <div className="icon-play text-9"></div>
                                    </div>
                                    <div>{sub.heading}</div>
                                  </div>

                                  <div className="d-flex x-gap-20 items-center">
                                    <a
                                      href="#"
                                      className="text-14 lh-1 text-purple-1 underline"
                                    >
                                      {sub.duration} hours
                                    </a>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : allModules.slice(0, 2).map((module, index) => (
                    <div key={module._id}>
                      <div
                        onClick={() => toggleAccordion(module._id)}
                        className={`accordion__button py-20 mt-10 px-30 bg-light-4 ${
                          activeItemId === module._id ? "is-active" : ""
                        }`}
                      >
                        <div className="d-flex items-center">
                          <div className="accordion__icon">
                            <div className="icon">
                              <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <div className="icon">
                              <FontAwesomeIcon icon={faChevronUp} />
                            </div>
                          </div>
                          <span className="text-17 fw-500 text-dark-1">{module.title}</span>
                        </div>
                      </div>

                      <div
                        className={`accordion__content ${
                          activeItemId === module._id ? "is-active" : ""
                        }`}
                        style={activeItemId === module._id ? { maxHeight: "700px" } : {}}
                      >
                        <div className="accordion__content__inner px-30 py-30">
                          <div className="y-gap-20">
                            {module.sub_title &&
                              module.sub_title.map((sub, k) => (
                                <div key={k} className="d-flex justify-between">
                                  <div className="d-flex items-center">
                                    <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                      <div className="icon-play text-9"></div>
                                    </div>
                                    <div>{sub.heading}</div>
                                  </div>

                                  <div className="d-flex x-gap-20 items-center">
                                    <a
                                      href="#"
                                      className="text-14 lh-1 text-purple-1 underline"
                                    >
                                      {sub.duration} hours
                                    </a>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          ) : (
            <p className="text-center mt-10">No Course Content Available</p>
          )}
        </div>

        {!showAllModules && allModules.length > 2 && (
          <div className="text-center mt-20">
            <button className="btn btn-primary" onClick={handleApply}>
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
