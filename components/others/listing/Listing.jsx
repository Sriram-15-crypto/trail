"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, selectCourses } from "@/redux/slices/course/course";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createApplyNow,
  resendOTP,
  verifyOTP,
} from "@/redux/slices/courseApply/courseApplyNow";

export default function Listing() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [values, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    college: "",
    degree: "",
    course: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true); // State to manage resend button disable/enable
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleCourseChange = (_, newValue) => {
    setSelectedCourse(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const regex = /^[A-Za-z ]*$/;
    if (
      name === "name" &&
      (!regex.test(value) || value.split(" ").length > 2)
    ) {
      return;
    }
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    if (
      name === "college" &&
      (!regex.test(value) || value.split(" ").length > 2)
    ) {
      return;
    }
    if (
      name === "degree" &&
      (!regex.test(value) || value.split(" ").length > 2)
    ) {
      return;
    }
    setFormData({ ...values, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createApplyNow(values));

      setOtpSent(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    // Countdown timer for enabling the resend button
    const timer = setTimeout(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        setResendDisabled(false); // Enable resend button after 30 seconds
        setSecondsLeft(30); // Reset the timer
      }
    }, 1000);

    // Clear timer when component unmounts
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifyOTP({ otp, email: values.email }));

      setSubmitted(true);
      setOtpSent(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      await dispatch(resendOTP(values.email));

      setOtpSent(true);
      setResendDisabled(true); // Disable resend button
      setSecondsLeft(30); // Reset timer
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div>
      <div
        className="dashboard__content mt-50"
        style={{ background: "#f4f1fe" }}
      >
        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <div className="row pb-3 mt-15">
                  <div className="col-auto">
                    <h1 className="text-30 lh-12 fw-700">
                      New Course{" "}
                      <span style={{ color: "#f2775e" }}>Enrollment </span>
                    </h1>
                    <br></br>
                    <h3 className="text-20 lh-12 fw-500">
                      Unlock Your Potential, Enroll Today!
                    </h3>
                  </div>
                </div>
              </div>

              <div className="py-30 px-30">
                {!otpSent ? (
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      phone: "",
                      address: "",
                      dob: "",
                      gender: "",
                      college: "",
                      degree: "",
                      course: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                    // No need to handle onBlur here
                  >
                    {({ errors, touched }) => (
                      <form
                        onSubmit={handleFormSubmit}
                        className="contact-form row y-gap-30"
                      >
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            Name*
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            value={values.name}
                            onChange={handleChange}
                          />
                          {touched.name && !values.name && (
                            <div className="error" style={{ color: "red" }}>
                              ** Name is required **
                            </div>
                          )}
                        </div>
                        {/* Email */}
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label
                            htmlFor="email"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Email* (eg: Aegon15@gmail.com)
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={values.email}
                            onChange={handleChange}
                          />
                          {touched.email && !values.email && (
                            <div className="error" style={{ color: "red" }}>
                              ** Email is required **
                            </div>
                          )}
                          {touched.email &&
                            values.email &&
                            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                              values.email
                            ) && (
                              <div className="error" style={{ color: "red" }}>
                                ** Invalid email format **
                              </div>
                            )}
                        </div>
                        {/* Phone */}
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label
                            htmlFor="phone"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Phone*
                          </label>
                          <Field
                            type="text"
                            id="phone"
                            name="phone"
                            value={values.phone}
                            placeholder="Enter your phone number"
                            required
                            onChange={handleChange}
                          />

                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="error"
                            style={{ color: "red" }}
                          />
                        </div>{" "}
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            Date of Birth*
                          </label>
                          <Field
                            style={{
                              outline: "none",
                              width: "100%",
                              backgroundColor: "transparent",
                              borderRadius: "8px",
                              border: "1px solid #dddddd",
                              fontSize: "15px",
                              lineHeight: "1.5",
                              padding: "15px 22px",
                              transition:
                                "all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1)",
                            }}
                            type="date"
                            name="dob"
                            value={values.dob}
                            onChange={handleChange}
                          />
                          {touched.dob && !values.dob && (
                            <div className="error" style={{ color: "red" }}>
                              ** Date of birth is required **
                            </div>
                          )}
                        </div>
                        {/* Address */}
                        <div className="col-12">
                          <label
                            htmlFor="address"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Address* (eg: 15 church street, Madurai, India)
                          </label>
                          <Field
                            as="textarea"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                            rows="5"
                          />
                          {touched.address && !values.address && (
                            <div className="error" style={{ color: "red" }}>
                              ** Address is required **
                            </div>
                          )}
                          {touched.address &&
                            values.address &&
                            !/^\d{1,3}\s[a-zA-Z\s,]+$/i.test(
                              values.address
                            ) && (
                              <div className="error" style={{ color: "red" }}>
                                ** Invalid address format **
                              </div>
                            )}
                        </div>
                        {/* Gender */}
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            Gender*
                          </label>
                          <Field
                            name="gender"
                            as="select"
                            value={values.gender}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Field>
                          {touched.gender && !values.gender && (
                            <div className="error" style={{ color: "red" }}>
                              ** Gender is required **
                            </div>
                          )}
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            Course of interest*
                          </label>
                          <Field
                            name="course"
                            as="select"
                            value={values.course}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                              <option key={course.id} value={course._id}>
                                {course.course_name}
                              </option>
                            ))}
                          </Field>
                          {touched.course && !values.course && (
                            <div className="error" style={{ color: "red" }}>
                              ** course name is required **
                            </div>
                          )}
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label
                            htmlFor="college"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            College*
                          </label>

                          <Field
                            required
                            type="text"
                            name="college"
                            value={values.college}
                            onChange={handleChange}
                            placeholder="Enter your college name"
                          />
                          {touched.college && !values.college && (
                            <div className="error" style={{ color: "red" }}>
                              ** College Name is required **
                            </div>
                          )}
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <label
                            htmlFor="degree"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Degree*
                          </label>

                          <Field
                            required
                            type="text"
                            name="degree"
                            value={values.degree}
                            onChange={handleChange}
                            placeholder="Enter your degree, eg: Bachelor Of Engineering"
                          />
                          {touched.degree && !values.degree && (
                            <div className="error" style={{ color: "red" }}>
                              ** Degree Name is required **
                            </div>
                          )}
                        </div>
                        <div className="col-12">
                          <button
                            className="button -sm -outline-dark-2 text-dark-2"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                ) : (
                  <div className="py-30 px-30 d-flex justify-content-center align-items-center">
                    <form
                      onSubmit={handleOtpSubmit}
                      className="contact-form row y-gap-30"
                    >
                      <div className="col-12">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Enter OTP*
                        </label>
                        <input
                          style={{
                            outline: "none",
                            width: "100%",
                            backgroundColor: "transparent",
                            borderRadius: "8px",
                            border: "1px solid #dddddd",
                            fontSize: "15px",
                            lineHeight: "1.5",
                            padding: "15px 22px",
                            transition:
                              "all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1)",
                          }}
                          required
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP received"
                        />
                      </div>
                      <div className="col-12 d-flex justify-content-between align-items-center">
                        <button
                          type="submit"
                          className="button -sm -outline-dark-2 text-dark-2"
                          style={{ flex: 1, marginRight: "10px" }} // Adjust margin to create space between buttons
                        >
                          Submit OTP
                        </button>
                        {otpSent && (
                          <button
                            className="button -sm -outline-dark-2 text-dark-2"
                            onClick={handleResendOTP}
                            disabled={resendDisabled} // Disable button when resendDisabled is true
                            style={{ flex: 1 }}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                      <div className="col-12 d-flex justify-content-between align-items-center">
                        {submitted && <div>OTP submitted successfully!</div>}
                      </div>
                    </form>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("** Name is required **"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "** Invalid phone number format **")
    .test("not-all-same", "** All digits cannot be the same **", (value) => {
      return !/(.)\1{9}/.test(value);
    })
    .required("** Phone number is required **"),
  address: Yup.string().required("** Address is required **"),
  dob: Yup.date().required("**  Date of Birth is required **"),
  gender: Yup.string().required("** Gender is required **"),
  college: Yup.string().required("** College Name is required **"),
  degree: Yup.string().required("** Degree is required **"),
  course: Yup.string().required("** Course of interest is required **"),
});
