import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { featureOne } from "@/data/features";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useDispatch, useSelector } from "react-redux";

export default function ServiceOverview({ serviceId }) {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const serviceData = useSelector((state) => state.service.serviceData);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const filteredService = services.find(
      (service) => service._id === serviceId
    );
    setSelectedService(filteredService);
  }, [services, serviceId]);

  return (
    <section className="layout-pt-lg layout-pb-lg bg-beige-1">
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
                  <br />
                </p>
              </div>
            </div>

            <div
              className="col-xl-5 col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
            >
              <div className="about-image">
                {selectedService.image && (
                  <Image
                    style={{ width: "500px", height: "400px" }}
                    src={selectedService.image}
                    alt="image"
                    width={300}
                    height={400}
                    layout="fixed"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
