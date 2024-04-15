import Image from "next/image";
import React from "react";

export default function Instractor({ instructor=[] }) {
  if (!instructor || instructor.length === 0) {
    return null;
  }

  return (
    <div id="instructors" className="pt-60 lg:pt-40">
      <h2 className="text-20 fw-500">Instructor</h2>

      <div className="mt-30">
        <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
        {instructor.map((instructors) => (
        <div key={instructors._id}>
          <div className="size-120">
            <img
              className="object-cover"
              src={instructors.profile_pic}
              alt="Instructor Profile"
            />
          </div>

          <div className="">
            <h5 className="text-17 lh-14 fw-500">{instructors.name}</h5>
            <p className="mt-5">{instructors.designation}</p>
            <p className="text-14 mt-3">Specialization:</p>
            <ul
              className="mt-1 list-unstyled"
              style={{ paddingLeft: "1.25rem" }}
            >
              {instructors.specialization.map((spec, index) => (
                <li key={index} style={{ listStyleType: "disc" }}>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-30">
          <p>{instructors.description}</p>
        </div>
          </div>
      ))}
        </div>

        
      </div>
    </div>
  );
}
