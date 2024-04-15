"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/layout/component/Messages";
import Preloader from "@/components/common/Preloader";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import Sidebar from "@/components/services/Sidebar";
import FooterTwo from "@/components/layout/footers/Footer";
import ServiceOverview from "@/components/services/ServiceOverview";
import Clients from "@/components/services/Clients";
import ExecutionOverview from "@/components/services/ExecutionOverview";
import Gallery from "@/components/services/Gallery";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useDispatch, useSelector } from "react-redux";
import ExecutiveHighlights from "@/components/services/ExecutiveHighlights";
import Testimonial from "@/components/services/Testmonial";
import FAQComponent from "@/components/courseSingle/Faq";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ServiceOverview1 from "@/components/serviceList/ServiceOverview";
import ExecutiveHighlights1 from "@/components/serviceList/ExecutiveHighlights";
import Clients1 from "@/components/serviceList/Clients";
import Gallery1 from "@/components/serviceList/Gallery";
import TestimonialsFour1 from "@/components/serviceList/Testimonial";
import ExecutionOverview1 from "@/components/serviceList/ExecutionOverview";

export default function HomeNine() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const serviceData = useSelector((state) => state.service.serviceData);
  const faq = useSelector((state) => state.faq.faq);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  const firstService = services[0];

  const filteredFAQ = faq.filter((item) => item.service === services[0]?._id);

  useEffect(() => {
    if (window.innerWidth < 990) {
      setIsSidebarClosed(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 990) {
        setIsSidebarClosed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <>
      <div className="main-content homeModeChange ">
        <Preloader />
        <HeaderSeven
          setMessageOpen={setMessageOpen}
          setIsSidebarClosed={setIsSidebarClosed}
        />
        <div className="content-wrapper js-content-wrapper">
          <div
            className={`dashboard -home-9 px-0 js-dashboard-home-9 ${
              isSidebarClosed ? "-is-sidebar-hidden" : ""
            } `}
          >
            <div
              className="dashboard__sidebar -base scroll-bar-1 border-right-light lg:px-30"
              style={{ zIndex: 1000 }}
            >
              <div style={{ zIndex: 1000 }}>
                <Sidebar />
              </div>
            </div>
            <div className="dashboard__main mt-0 content-wrapper  js-content-wrapper overflow-hidden ">
              <div className="dashboard__content pt-0 px-15 pb-0">
                <ServiceOverview1 />
                <div
                  className="circle-icon"
                  style={{
                    backgroundColor: "#333",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "fixed",
                    left: "35px",
                    bottom: "20px",
                    zIndex: "1000",
                  }}
                  onClick={toggleSidebar}
                >
                  <FontAwesomeIcon
                    icon={isSidebarClosed ? faArrowRight : faArrowLeft}
                    style={{ color: "#fff" }}
                  />
                </div>
                <ExecutiveHighlights1 />
                <Clients1 />
                <ExecutionOverview1 />
                <Gallery1 />
                <FAQComponent faq={filteredFAQ} />
                <TestimonialsFour1 />
                <br />
              </div>

              <FooterTwo />
            </div>
          </div>
        </div>
      </div>
      <Messages messageOpen={messageOpen} setMessageOpen={setMessageOpen} />
    </>
  );
}
