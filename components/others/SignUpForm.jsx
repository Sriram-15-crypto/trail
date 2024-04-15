"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { postSignUp, resetSignUp } from "@/redux/slices/user/Signup";
export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSuccess = useAppSelector((state) => state.userSignUp.isSuccess);
  const errorMessage = useAppSelector((state) => state.userSignUp.message); 

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email*")
      .required("Email is required*"),
    userName: yup.string().required("First Name is required*"),
    phone: yup.string().required("Phone Number is required*"),
    gender: yup.string(),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters*")
      .required("Password is required*"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match*")
      .required("Confirm Password is required*"),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetSignUp());
      router.push("/login");
    }
  }, [isSuccess, dispatch, router]);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(postSignUp(values));
    },
  });
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?
                <Link href="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={formik.handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    required
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input
                    required
                    type="text"
                    name="userName"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                    {formik.touched.userName && formik.errors.userName && (
            <div className="error" style={{ color: "red" }}>
              {formik.errors.userName}
            </div>
          )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                   {formik.touched.phone && formik.errors.phone && (
            <div className="error" style={{ color: "red" }}>
              {formik.errors.phone}
            </div>
          )}
                </div>{" "}
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Gender
                  </label>
                  <select
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.gender}
                    </div>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
            <div className="error" style={{ color: "red" }}>
              {formik.errors.password}
            </div>
          )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                   {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error" style={{ color: "red" }}>
              {formik.errors.confirmPassword}
            </div>
          )}
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="col-12">
          {errorMessage && (
            <div class="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
