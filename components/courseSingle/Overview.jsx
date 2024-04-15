"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { learnList, requirements } from "@/data/aboutcourses";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Overview({ objective, disabled, opportunities }) {
  if (disabled) {
    return null;
  }

  return (
    <div id="overview" className="pt-60 lg:pt-40 to-over">
      <h4 className="text-18 fw-500">Description</h4>
      <div className="show-more mt-30 js-show-more">
        <div className="">
          <p>{objective}</p>
        </div>
      </div>

      {/* Display career opportunities */}
      <h4 className="text-18 fw-500 mt-30">Career Opportunities</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="mt-4">
        {opportunities.map((opportunity, index) => (
          <div key={index} style={{ textAlign: 'center', width: 'calc(25% - 20px)' }}>
            <img style={{ width: '100%', maxWidth: '150px' }} src={opportunity.image} alt={opportunity.company_name} />
            <p style={{ marginTop: '10px' }}>{opportunity.company_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
