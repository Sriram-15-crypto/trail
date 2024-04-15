"use client";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import About from "@/components/mca/About";
import OurProgram from "@/components/mca/OurProgram";
import Outcomes from "@/components/mca/Outcomes";
import React, { useEffect, useState } from "react";
import ProgramFees from "@/components/mca/ProgramFees";
import Testimonial from "@/components/mca/Testimonial";
import FAQComponent from "@/components/courseSingle/Faq";
import Semester from "@/components/mca/Semester";
import Highlights from "@/components/mca/Highlights";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { useParams } from "next/navigation";
import AdmissionProcess from "@/components/mca/AdmissionProcess";
import EligibilityCriteria from "@/components/mca/EligibilityCriteria";

export default function page({ params }) {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq.faq);
  const { id } = useParams();
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );

  useEffect(() => {
    // Fetch degree program data when the component mounts
    dispatch(fetchDegreeProgramData());
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  const filteredFAQ = faq.filter(
    (item) => item.degree_program && String(item.degree_program) === id
  );

  console.log("Filtered FAQ:", filteredFAQ);
  console.log("faq", faq);
  const menuItems = [
    // {
    //   id: 1,
    //   href: "#LearningJourney",
    //   text: "Learning Journey",
    //   isActive: false,
    // },
    {
      id: 1,
      href: "#LearningJourney",
      text: "Learning Journey",
      isActive: false,
    },
    { id: 3, href: "#Program-fees", text: "Program Fees", isActive: false },
    // {
    //   id: 4,
    //   href: "#Program-Mentors",
    //   text: "Program Mentors",
    //   isActive: false,
    // },
    {
      id: 5,
      href: "#EligibilityCriteria",
      text: "Smartcliff Eligibility Criteria",
      isActive: false,
    },
    {
      id: 6,
      href: "#AdmissionProcess",
      text: "Admission Process",
      isActive: false,
    },
    {
      id: 7,
      href: "#Faq",
      text: "Faq",
      isActive: false,
    },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <br></br>
        {/* <PageLinks /> */}
        <About />
        <Highlights />
        <Outcomes />

        <OurProgram />

        <section className="pt-30 layout-pb-md">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
                  <div className="tabs -active-purple-2 js-tabs pt-0">
                    <div className="tabs__controls d-flex js-tabs-controls">
                      {menuItems.map((elm, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab(elm.id)}
                          className={`tabs__button js-tabs-button js-update-pin-scene ${
                            i != 0 ? "ml-30" : ""
                          } ${activeTab == elm.id ? "is-active" : ""} `}
                          type="button"
                        >
                          {elm.text}
                        </button>
                      ))}
                    </div>

                    <div className="tabs__content   js-tabs-content">
                      {/* <div
                        className={`tabs__pane -tab-item-1 ${
                          activeTab == 1 ? "is-active" : ""
                        } `}
                      >
                      </div> */}
                      {/* 
                      <div
                        className={`tabs__pane -tab-item-2 ${
                          activeTab == 1 ? "is-active" : ""
                        } `}
                      >
                        <QualificationLearningComponent />
                      </div> */}

                      <div
                        className={`tabs__pane -tab-item-3 ${
                          activeTab == 1 ? "is-active" : ""
                        } `}
                      >
                        {/* Pass instructor props to the Instructor component */}
                        <Semester />
                      </div>
                      <div
                        className={`tabs__pane -tab-item-4 ${
                          activeTab == 3 ? "is-active" : ""
                        } `}
                      >
                        <ProgramFees />
                      </div>

                      {/* <div
                        className={`tabs__pane -tab-item-5 ${
                          activeTab === 4 ? "is-active" : ""
                        } `}
                      >
                        <Instructors />
                      </div> */}

                      <div
                        className={`tabs__pane -tab-item-5 ${
                          activeTab == 5 ? "is-active" : ""
                        } `}
                      >
                        <EligibilityCriteria />
                      </div>
                      <div
                        className={`tabs__pane -tab-item-5 ${
                          activeTab == 6 ? "is-active" : ""
                        } `}
                      >
                        <AdmissionProcess />
                      </div>
                      <div
                        className={`tabs__pane -tab-item-5 ${
                          activeTab == 7 ? "is-active" : ""
                        } `}
                      >
                        <FAQComponent faq={filteredFAQ} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <QualificationLearningComponent /> */}
        {/* <Outcomes /> */}
        {/* <Timeline /> */}
        {/* <ProgramFees /> */}

        <Testimonial /><br></br>
        {/* <Instructors /> */}

        <FooterTwo />
      </div>
    </div>
  );
}
