"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";

export default function Menu({ allClasses, headerPosition }) {
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const pathname = usePathname();
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );
  useEffect(() => {
    dispatch(fetchDegreeProgramData());
  }, [dispatch]);

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  const handleProgramClick = (programId) => {
    window.location.href = `/${programId}`;
  };

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link href="/login" className="text-dark-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/"
                className={menuItem == "Home" ? "activeMenu" : ""}
              >
                Home
              </Link>
            </li>
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/about"
                className={menuItem == "Events" ? "activeMenu" : ""}
              >
                About
              </Link>
            </li>
            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="/services"
                className={menuItem == "Services" ? "activeMenu" : ""}
              >
                Services
              </Link>
            </li>
            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="/courses"
                className={menuItem == "Courses" ? "activeMenu" : ""}
              >
                Courses
              </Link>
            </li>
            <li className="menu-item-has-children">
              <a
                className={menuItem === "Degree Program" ? "activeMenu" : ""}
                href="#"
              >
                Degree Program{" "}
                <i className="icon-chevron-right text-13 ml-10"></i>
              </a>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <a href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Degree
                    Program
                  </a>
                </li>
                {degreeProgramData.map((program) => (
                  <li key={program._id}>
                    <a
                      onClick={() => handleProgramClick(program._id)}
                      className={
                        pathname.split("/")[1] === program.program_name
                          ? "activeMenu"
                          : "inActiveMenu"
                      }
                    >
                      {program.program_name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                data-barba
                href="/contact"
                className={
                  pathname == "/contact" ? "activeMenu" : "inActiveMenuTwo"
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
