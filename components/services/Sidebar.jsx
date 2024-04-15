"use client";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const services = useSelector(selectServices);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
  }, [services]);

  return (
    <div className="sidebar -base-sidebar">
      <div className="sidebar__inner">
        <div>
          <div className="text-16 lh-1 fw-500 text-dark-1 mb-30">Services</div>
          <div>
            {services.map((service, index) => (
              <div
                key={index}
                className="sidebar__item -is-active"
                style={{ marginBottom: "10px" }}
              >
                <Link
                  href={`/services/${service._id}`}
                  className="-dark-sidebar-white d-flex items-center text-17 lh-1 fw-500"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="mr-15"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  {service.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
