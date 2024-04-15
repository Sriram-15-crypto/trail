import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHighlights } from "@/redux/slices/mca/highlights/Highlights";
import { useParams } from "next/navigation";

export default function Highlights() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const highlights = useSelector((state) => state.highlight.highlights);
  const [isYearly, setIsYearly] = useState(false);
  const filteredhighlights = highlights.filter(
    (highlights) =>
      highlights.degree_program && highlights.degree_program._id === id
  );
  useEffect(() => {
    dispatch(fetchAllHighlights());
  }, [dispatch]);

  const handleCheckboxChange = (event) => {
    setIsYearly(event.target.checked);
  };

  return (
    <section className="layout-pt-md layout-pb-md bg-light-3">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                Smartcliff MCA vs Traditional MCA
              </h2>
              <p className="sectionTitle__text">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-60 lg:pt-50 justify-content-center">
          {filteredhighlights.map((highlight, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className={`priceCard -type-1 rounded-16 overflow-hidden ${
                  index === 0 ? "bg-dark-9" : "bg-dark-2"
                }`}
                data-aos="fade-right"
                data-aos-duration={500 * (index + 1)}
              >
                <div className="priceCard__header py-40 pl-50">
                  <div className="priceCard__price text-45 lh-11 fw-700 text-white mt-8">
                    {highlight.title}
                  </div>
                </div>

                <div className="priceCard__content pt-30 pr-90 pb-50 pl-50 bg-white">
                  <div className="priceCard__text">{highlight.description}</div>

                  <div className="priceCard__list mt-30">
                    {highlight.versus.map((subheading, i) => (
                      <div key={i}>
                        <span
                          className="pr-8 text-purple-1"
                          style={{ fontSize: "12px", fontWeight: "300" }}
                        >
                          {index === 0 ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: "green" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{ color: "red" }}
                            />
                          )}
                        </span>
                        {subheading.subheading}
                      </div>
                    ))}
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
