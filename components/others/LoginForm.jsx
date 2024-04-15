"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import { postSignIn } from "@/redux/slices/user/Signin";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup.string("Enter your email*").required("Email is required*"),
    password: yup
      .string("Enter your password*")
      .required("Password is required*"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(postSignIn(values));
      } catch (error) {
        console.error("Login failed:", error);

        let errorMessage = "An error occurred during login. Please try again.";

        if (error.response && error.response.data) {
          const { token } = error.response.data;
          if (token) {
            errorMessage = error.response.data.message;
          }
        }

        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    },
  });

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet?{" "}
                <Link href="/signup" className="text-purple-1">
                  Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={formik.handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username Or Email
                  </label>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error" style={{ color: "red" }}>
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password
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
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
                <br></br>
                {errorMessage && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ color: "red" }}
                  >
                    {errorMessage}
                  </div>
                )}
              </form>

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
