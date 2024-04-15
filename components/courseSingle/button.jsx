import { useRouter } from "next/navigation";
import React from "react";

const EnquiryButton = () => {
  const router = useRouter();

  const handleEnquiryClick = () => {
    // Navigate to the next page
    router.push("/next-page"); // Replace "/next-page" with your desired URL
  };

  return (
    <button
      style={{
        position: "fixed",
        bottom: "20px",
        left: "88%",
        width: "150px",
        height: "40px",
        backgroundColor: "rgb(242, 119, 94)",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        zIndex: "1000",
        display: "inline-block",
        outline: "0",
        border: "0",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
        padding: "8px 24px",
        borderRadius: "50px",
        backgroundImage: "rgb(242, 119, 94)",
        boxShadow:
          "0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)",
      }}
      onClick={handleEnquiryClick}
    >
      Apply Now
    </button>
  );
};

export default EnquiryButton;
