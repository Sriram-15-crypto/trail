import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllOutcomes } from "@/redux/slices/mca/outcomes/Outcomes";
import { useParams } from "next/navigation";

export default function Outcomes() {
  const dispatch = useDispatch();
  const outcomes = useSelector((state) => state.outcomes.outcomes);
  const { id } = useParams();

  const filteredoutcomes = outcomes.filter(
    (outcomes) => outcomes.degree_program && outcomes.degree_program._id === id
  );
  useEffect(() => {
    dispatch(getAllOutcomes());
  }, [dispatch]);

  return (
    <section className="layout-pt-md layout-pb-md">
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Outcomes</h2>
              <p className="sectionTitle__text">
                ----- 10,000+ unique online course list designs -----
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-center pt-60 lg:pt-40">
          {filteredoutcomes.map((elm, i) => (
            <React.Fragment key={i}>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-6">
                <div className="d-flex flex-column items-center text-center">
                  <div className="relative size-120 d-flex justify-center items-center rounded-full bg-light-4">
                    <Image width={50} height={50} src={elm.icon} alt="image" />
                    <div className="side-badge">
                      <div className="size-35 d-flex justify-center items-center rounded-full bg-dark-1 -dark-bg-purple-1">
                        <span className="text-14 fw-500 text-white">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-17 fw-500 text-dark-1 mt-30">
                    {elm.title}
                  </div>
                </div>
              </div>
              {/* Display arrow after each value, except for the last one */}
              {i !== filteredoutcomes.length - 1 && (
                <div className="col-auto">
                  <div className="pt-30">
                    {/* Dynamic path for arrow image */}
                    <Image
                      width={142}
                      height={21}
                      src={`/assets/img/misc/lines/${
                        (i + 1) % 2 === 0 ? "2" : "1"
                      }.svg`}
                      alt="arrow"
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
