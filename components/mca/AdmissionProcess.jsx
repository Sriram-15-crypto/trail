import { getAllAdmissionProcess } from "@/redux/slices/mca/admissionProcess/AdmissionProcess";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdmissionProcess() {
  const dispatch = useDispatch();
  const admissions = useSelector((state) => state.admissionProcess.admissions);
  const { id } = useParams();
  function toRoman(num) {
    const romanNumerals = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
    ];
    return romanNumerals[num - 1] || num;
  }
  const filteredAdmission = admissions.filter(
    (eligibility) =>
      eligibility.degree_program && eligibility.degree_program._id === id
  );
  useEffect(() => {
    dispatch(getAllAdmissionProcess());
  }, [dispatch]);

  return (
    <section className="layout-pt-mb layout-pb-lg mt-50">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-6 col-lg-7">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Admission Process</h2>
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
              width={490}
              height={565}
              //   className="w-1/1"
              src="/assets/img/home-8/what/admission.jpg"
              alt="image"
            />
          </div>

          <div className="col-xl-5 col-lg-6 col-md-9">
            <div className="d-flex flex-column y-gap-30">
              {filteredAdmission.map((admissionGroup, i) => (
                <div
                  key={i}
                  className="d-flex flex-column"
                  data-aos="fade-up"
                  data-aos-duration={(i + 1) * 250}
                >
                  {" "}
                  <p>
                    <div
                      style={{
                        fontSize: "24px",
                        color: "#666",
                        fontWeight: "bold",
                      }}
                    >
                      Steps for the Admission Process :
                    </div>
                  </p>
                  <br></br>
                  {admissionGroup.admission.map((admission, index) => (
                    <div key={index} className="d-flex mb-20">
                      <div
                        className="d-flex justify-center items-center bg-orange-5 rounded-full mr-3"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <p className="text-black text-xl font-semibold">
                          {toRoman(index + 1)}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-18 lh-11 text-dark-1 fw-500 mt-20 ml-15">
                          {admission.heading}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
