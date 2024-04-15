import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lessonItems } from "@/data/aboutcourses";

export default function FAQComponent({ faq }) {
  const [activeItemId, setActiveItemId] = useState(null);

  const toggleAccordion = (faqItemId) => {
    setActiveItemId((prev) => (prev === faqItemId ? null : faqItemId));
  };

  return (
    <>
      <div id="course-content" className="pt-60 lg:pt-40 layout-pb-sm ">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">
                Frequently Asked Questions
              </h2>
              <br></br>

              <p className="sectionTitle__text "></p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="accordion -block-2 text-left js-accordion">
            {faq.map((item, i) => (
              <div key={i}>
                {item.faqItems.map((faqItem, j) => (
                  <div key={faqItem._id}>
                    <div
                      onClick={() => toggleAccordion(faqItem._id)}
                      className={`accordion__button py-20 mt-10 px-30 bg-light-4 ${
                        activeItemId === faqItem._id ? "is-active" : ""
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
                        <span className="text-17 fw-500 text-dark-1">
                          {faqItem.question}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`accordion__content ${
                        activeItemId === faqItem._id ? "is-active" : ""
                      }`}
                      style={
                        activeItemId === faqItem._id
                          ? { maxHeight: "700px" }
                          : {}
                      }
                    >
                      <div className="accordion__content__inner px-30 py-30">
                        <div className="y-gap-20">
                          <div className="d-flex justify-between">
                            <div className="d-flex items-center">
                              <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                <div className="icon-play text-9"></div>
                              </div>
                              <div>{faqItem.answer}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
