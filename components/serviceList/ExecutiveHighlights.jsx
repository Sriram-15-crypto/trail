import React, { useEffect, useState } from "react";
import Image from "next/image";
import { schoolAchievement } from "@/data/achievements";
import { fetchExecutionHighlights } from "@/redux/slices/services/executionHighlights/Execution_Highlights";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "next/navigation";
export default function ExecutiveHighlights1() {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const executionHighlights = useSelector(
    (state) => state.executionHighlights.executionHighlights
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchExecutionHighlights());
  }, [dispatch]);

  useEffect(() => {
  }, [executionHighlights]);


  const filteredHighlights = executionHighlights.filter(
    (executionHighlights) => executionHighlights.service._id === id
  );

  return (
    <section className="layout-pt-md layout-pb-sm section-bg">
      <div className="section-bg__item"></div>

      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Executive Highlights</h2>

              <p className="sectionTitle__text "></p>
            </div>
          </div>
        </div>

        <div className="row pt-30">
          {filteredHighlights.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div className="infoCard -type-2 text-center py-40 -infoCard-hover">
                <div className="infoCard__image">
                  <Image width={50} height={50} src={elm.image} alt="image" />
                </div>
                <h5 className="infoCard__title text-24 lh-1 mt-25">
                  {elm.service.title}
                </h5>
                <p className="infoCard__text mt-5">{elm.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
