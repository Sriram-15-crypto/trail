"use client";

import { getAllQualificationLearning } from "@/redux/slices/mca/qualificationLearning/qualificationLearning";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function QualificationLearningComponent() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.qualificationLearning.data);
  const loading = useSelector((state) => state.qualificationLearning.loading);
  const error = useSelector((state) => state.qualificationLearning.error);

  useEffect(() => {
    dispatch(getAllQualificationLearning());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "50px",
      }}
    >
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data.map((item) => (
        <div key={item._id.$oid} style={{ marginBottom: "30px" }}>
          <img
            src={item.image}
            alt="Learning Image"
            style={{
              width: "100%",
              height: "400px",
              marginBottom: "20px",
            }}
          />
          <h2>{item.qualification_name}</h2>
          <br></br>
          <div
            style={{
              padding: "20px",
              width: "90%",
              //   maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <p style={{ textAlign: "justify" }}>
              {item.qualification_description}
            </p>
          </div>
          <br></br>
          <br></br>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              width: "70%",
              //   maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <h3>Learning</h3><br></br>
            <p>{item.learning_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
