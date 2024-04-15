import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSemesters } from "@/redux/slices/mca/semester/Semester";
import "./semester.css";
import { useParams } from "next/navigation";

const Semester = () => {
  const dispatch = useDispatch();
  const { semesters, loading, error } = useSelector((state) => state.semester);
  const { id } = useParams();
  const filteredsemester = semesters.filter(
    (semester) => semester.degree_program && semester.degree_program._id === id
  );
  useEffect(() => {
    dispatch(getAllSemesters());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <h1
        className="text-45 lg:text-40 md:text-30 text-dark-1"
        data-aos="fade-up"
        data-aos-duration={300}
      >
        Semester Details
      </h1>
      <br />
      <br />
      <div className="container">
        {filteredsemester.map((semester, i, index) => (
          <div key={index}>
            <h2
              className="text-25 lg:text-20 md:text-20 text-dark-1"
              data-aos="fade-up"
              data-aos-duration={300}
            >
              Qualification{" "}
            </h2>{" "}
            <br></br>
            <p key={i}>{semester.description}</p>
          </div>
        ))}
      </div>
      <div className="container py-5">
        {filteredsemester.map((semesterData, index) => (
          <div key={semesterData._id}>
            {semesterData.semester.map((semester, idx) => (
              <div className="row" key={idx}>
                <div className="col-lg-7 mx-auto">
                  <ul className="timeline">
                    <li className="timeline-item rounded ml-3 p-2 shadow">
                      <h2 className="h5 mb-1">
                        <span style={{ color: "orange" }}>semester</span>{" "}
                        {getRomanNumeral(idx + 1)}: {semester.heading}
                      </h2>
                      <span className="small text-gray">
                        <img
                          src={semester.icon}
                          alt="icon"
                          style={{ width: "20px", height: "20px" }}
                        />
                        <span className="ml-10"></span> {semester.subheading}
                      </span>
                      <p className="text-small mt-2 font-weight-light">
                        {semester.description}
                      </p>
                      {semester.submain && semester.submain.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                          <h5>Submain:</h5>
                          <ul>
                            {semester.submain.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                {subItem.inner_heading}:{" "}
                                {subItem.inner_subheading}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to get Roman numeral for a given number
const getRomanNumeral = (num) => {
  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];
  return romanNumerals[num - 1] || num;
};

export default Semester;
