import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useParams } from "next/navigation";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination]);

export default function ServiceOverview1() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const serviceData = useSelector((state) => state.service.serviceData);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const selectedService = serviceData.find((service) => service._id === id);
  const swiperRef = useRef(null);

  return (
    <section className="layout-pt-md layout-pb-sm bg-beige-1">
      {selectedService && (
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
              <div className="about-content">
                <h2
                  className="about-content__title customSized"
                  data-aos="fade-up"
                >
                  <span>{selectedService.title}</span>
                </h2>
                <p className="about-content__text" data-aos="fade-up">
                  {selectedService.description}
                </p>
              </div>
            </div>

            <div
              className="col-xl-5 col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
            >
              <div className="about-image">
                <Swiper
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  ref={swiperRef}
                >
                  {selectedService.videos?.map((video, index) => (
                    <SwiperSlide key={index}>
                      <video controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
