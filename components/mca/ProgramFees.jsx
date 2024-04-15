import { featuresEight } from "@/data/features";
import { getAllProgramFees } from "@/redux/slices/mca/programFees/ProgramFees";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProgramFees() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { programFees } = useSelector((state) => state.programFees);

  useEffect(() => {
    dispatch(getAllProgramFees());
  }, [dispatch]);

  const filteredprogramfee = programFees.filter(
    (programFees) =>
      programFees.degree_program && programFees.degree_program._id === id
  );
  
  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-6 col-lg-7">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Program Fees</h2>

              <p className="sectionTitle__text ">
                Learn the data skills you need online at your own pace—from
                non-coding essentials to data science and machine learning.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between items-center pt-60 lg:pt-40">
          <div className="col-lg-6" data-aos="fade-up" data-aos-duration={350}>
            <Image
              width={690}
              height={765}
              className="w-1/1"
              src="/assets/img/home-8/what/fee.jpg"
              alt="image"
            />
          </div>

          <div className="col-xl-5 col-lg-6 col-md-9">
            <div className="d-flex flex-column y-gap-30">
              {filteredprogramfee.map((fee, index) => (
                <div
                  key={index}
                  className="d-flex"
                  data-aos="fade-up"
                  data-aos-duration={(index + 1) * 250}
                >
                  <div className="d-flex justify-center items-center size-70 bg-orange-5 rounded-full">
                    <Image width={34} height={34} src={fee.icon} alt="icon" />
                  </div>
                  <div className="ml-20">
                    <h5 className="text-18 lh-11 text-dark-1 fw-500">
                      {fee.title}
                    </h5>
                    <p className="text-dark-1 mt-5">{fee.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="d-inline-block mt-30"
              data-aos="fade-up"
              data-aos-duration={500}
            >
              <a href="#" className="button -md -orange-1 text-white">
                Education Loan Assistance
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
