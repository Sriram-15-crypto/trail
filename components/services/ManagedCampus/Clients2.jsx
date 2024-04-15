import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getAllClient } from "@/redux/slices/services/client/Client";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay]);

export default function Clients2({ backgroundColor, clientId, subtitle }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const clients = useSelector((state) => state.clients.clients);
  const { id } = useParams();
  const [managedCampus, setManagedCampus] = useState([]); // Initialize managedCampus state

  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  console.log("clientId", clientId);
  console.log("subtitle", subtitle);
  console.log("managedCampus:", managedCampus);

  const fetchManagedCampus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/managed_campus"
      );
      console.log("managedCampus in clieny:", response.data.getAllManagedCampus);
      setManagedCampus(response.data.getAllManagedCampus); // Set managedCampus state after fetching
    } catch (error) {
      console.error("Error fetching managed campus:", error);
    }
  };

  useEffect(() => {
    fetchManagedCampus();
  }, []);

  const filteredClients =
    managedCampus?.flatMap((campus) => campus.our_client) || [];

  return (
    <section
      className={`layout-pt-sm layout-pb-sm ${
        backgroundColor ? backgroundColor : ""
      }`}
    >
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Our Clients</h2>
              <p className="sectionTitle__text "></p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {showSlider && (
            <Swiper
              breakpoints={{
                450: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
              slidesPerView={4}
              spaceBetween={50}
              autoplay={{ delay: 8000 }}
            >
              {filteredClients.map((elm, i) => (
                <SwiperSlide key={i}>
                  <div className="teamCard -type-1 -teamCard-hover">
                    <div className="teamCard__image">
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={elm.image}
                          alt="image"
                          layout="responsive"
                          width={300} // Set width of the image
                          height={200} // Set height of the image
                          style={{ objectFit: "cover" }} // Maintain aspect ratio and cover the container
                        />
                      </div>
                    </div>
                    <div className="teamCard__content">
                      <h4 className="teamCard__title">
                        <div href={`/instructors/${elm.id}`}>
                          <a className="linkCustom">{elm.name}</a>
                        </div>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
