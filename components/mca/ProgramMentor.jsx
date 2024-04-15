"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import {
  fetchProgramMentors,
  selectProgramMentors,
} from "@/redux/slices/mca/programMentor/ProgramMentor";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Instructors({ backgroundColor }) {
  const dispatch = useDispatch();
  const programMentors = useSelector(selectProgramMentors);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProgramMentors());
  }, [dispatch]);

  const filteredinstructor = programMentors.filter(
    (mentor) => mentor.degree_program && mentor.degree_program._id === id
  );
  return (
    <section
      className={`layout-pt-md layout-pb-lg ${
        backgroundColor ? backgroundColor : ""
      }`}
    >
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title " data-aos="fade-left">
                Our Program Mentors
              </h2>

              <p className="sectionTitle__text " data-aos="fade-left">
                Gain insights from industry experts who are passionate about
                sharing their knowledge and experience.
              </p>
            </div>
          </div>

        </div>

        <div className="row y-gap-30 pt-50">
          {filteredinstructor.map((mentor, i) => (
            <div
              key={i}
              className="col-lg-3 col-sm-6"
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 500}
            >
              <div className="teamCard -type-1 -teamCard-hover">
                <div
                  className="teamCard__image"
                  style={{
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={mentor.image}
                    alt="image"
                  />
                </div>

                <div className="teamCard__content">
                  <h4 className="teamCard__title">
                    <Link
                      className="linkCustom"
                      href={`/instructors/${mentor._id}`}
                    >
                      {mentor.name}
                    </Link>
                  </h4>
                  <p className="teamCard__text">{mentor.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-center text-center pt-60 lg:pt-40">
          <div className="col-auto">
            <p className="lh-1">
              Want to help people learn, grow and achieve more in life?
              <Link
                className="text-purple-1 underline"
                href="/instructor-become"
              >
                Become an instructor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
