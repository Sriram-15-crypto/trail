"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { fetchAboutCollegeData } from "@/redux/slices/mca/aboutCollege/aboutCollege";
import { useParams, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function About() {
  const dispatch = useDispatch();
  const aboutCollegeData = useSelector(
    (state) => state.aboutCollege.aboutCollegeData
  );
  const loading = useSelector((state) => state.aboutCollege.loading);
  const error = useSelector((state) => state.aboutCollege.error);
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAboutCollegeData());
  }, [dispatch]);

  // Filter the aboutCollegeData based on the URL ID
  const selectedAboutCollege = aboutCollegeData.find(
    (program) => program._id === id
  );

  const handleDownload = async () => {
    try {
      if (cookies.token) {
        const pdfUrl = "/assets/pdf/output (1).pdf";

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank";
        link.setAttribute("download", "Prospectus.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const currentURL = window.location.href;
        router.push(`/login?redirect=${encodeURIComponent(currentURL)}`);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle error
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {selectedAboutCollege && (
        <section className="page-header -type-1">
          <div className="container">
            <div className="page-header__content">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div>
                    <h1 className="page-header__title">
                      {selectedAboutCollege.title}
                    </h1>
                  </div>

                  <div>
                    <p className="page-header__text">
                      {selectedAboutCollege.slogan}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
      )}

      {selectedAboutCollege && (
        <section className="layout-pb-md">
          <div className="container">
            <div className="row y-gap-50 justify-between items-center">
              <div className="col-lg-6 pr-50 sm:pr-15">
                <div className="composition -type-8">
                  {selectedAboutCollege.images.map((image, index) => (
                    <div className={`-el-${index + 1}`} key={index}>
                      <Image width={300} height={400} src={image} alt="image" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-5">
                <h2 className="text-30 lh-16"> About Program</h2>
                <p className="text-dark-1 mt-30">
                  {selectedAboutCollege.description}
                </p>
                <p className="pr-50 lg:pr-0 mt-25"></p>
                <div className="row">
                  <div className="col-lg-6 mb-3 mb-lg-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        href="/applyProgram"
                        className="button -md -purple-1 text-white"
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="button -md -outline-green-1 text-black"
                        onClick={handleDownload}
                      >
                        Get Prospectus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
