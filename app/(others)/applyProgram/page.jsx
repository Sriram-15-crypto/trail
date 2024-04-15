import Preloader from "@/components/common/Preloader";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import ApplyProgram from "@/components/others/listing/ApplyProgram";
import React from "react";

export default function Page() {
  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderSeven />

        <div
          className="content-wrapper js-content-wrapper overflow-hidden"
          style={{ background: "#f4f1fe" }}
        >
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div>
              <ApplyProgram />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
