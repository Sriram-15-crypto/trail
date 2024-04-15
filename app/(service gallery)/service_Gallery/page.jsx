"use client";
import PageLinksTwo from "@/components/common/PageLinksTwo";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import GalleryList from "@/components/serviceList/GalleryList";
import React from "react";

export default function page() {
  return (
    <div className="main-content  ">
      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <GalleryList />

        <FooterTwo />
      </div>
    </div>
  );
}
