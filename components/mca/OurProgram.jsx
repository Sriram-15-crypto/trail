"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
import { useParams } from "next/navigation";

export default function OurProgram() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ourProgram = useSelector((state) => state.ourProgram.ourProgram);
  const loading = useSelector((state) => state.ourProgram.loading);
  const error = useSelector((state) => state.ourProgram.error);

  useEffect(() => {
    dispatch(fetchOurPrograms());
  }, [dispatch]);

  const filteredOurProgram = ourProgram.filter(
    (program) => program.degree_program && program.degree_program._id === id
  );

  return (
    <section className="layout-pt-md layout-pb-md bg-dark-2">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2
                className="sectionTitle__title text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                Our Program
              </h2>

              <p
                className="sectionTitle__text text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                ----- Highlights -----
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            filteredOurProgram.map((program, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-duration={(index + 1) * 400}
              >
                <div className="stepCard -type-1 -stepCard-hover">
                  <div className="stepCard__content">
                    <div className="stepCard__icon">
                      <img
                        src={program.icon}
                        alt={program.title}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <h4 className="stepCard__title">{program.title}</h4>
                    <p className="stepCard__text">{program.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
