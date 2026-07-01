import React, { useState, useEffect } from "react";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const Whowe = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const mainOfficeImage = "hero/banner1.png";

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/about_who_we_are.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data) {
          setAboutData({
            who_we_are_text: resData.data.who_we_are_text || "",
            mission_text: resData.data.mission_text || "",
            vision_text: resData.data.vision_text || "",
            mission_image: getImageUrl(resData.data.mission_image),
            vision_image: getImageUrl(resData.data.vision_image),
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white text-gray-600 font-bold text-lg">
        Loading About Us...
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white text-gray-500 text-lg">
        No records found.
      </div>
    );
  }

  const lighthouseImage = aboutData.mission_image;
  const futureCityImage = aboutData.vision_image;

  return (
    <section
      id="who-we-are"
      className="w-full min-h-screen py-16 px-4 md:px-12 lg:px-24 bg-white flex flex-col items-center"
    >
      <div className="text-center mb-10">
        <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest heading-font block mb-2">
          Why Choose
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 heading-font tracking-tight">
          Sustainable Resources For Nature Foundation ?
        </h2>
        <div className="w-20 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
      </div>

      {aboutData.who_we_are_text && (
  <div className="max-w-7xl mb-12 flex flex-col">
    <p 
      className={`text-justify text-md md:text-xl text-[#2d2d2d] body-font leading-relaxed transition-all duration-300 ${
        isExpanded ? "" : "line-clamp-4"
      }`}
      dangerouslySetInnerHTML={{ __html: aboutData.who_we_are_text }}
    />
    
    {/* Right alignment ke liye justify-end wrapper */}
    <div className="w-full flex justify-center mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 bg-[#E56D37] hover:bg-[#237586] text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer focus:outline-none transform hover:-translate-y-0.5 active:scale-95"
      >
        {isExpanded ? (
          <>
            View Less <span className="text-[10px] transition-transform">▲</span>
          </>
        ) : (
          <>
            View More <span className="text-[10px] transition-transform">▼</span>
          </>
        )}
      </button>
    </div>
  </div>
)}

      <div className="relative w-full max-w-7xl h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-3xl overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] border-4 border-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mainOfficeImage})` }}
        />
        <div className="absolute inset-0 bg-black/5 shadow-[inset_0_0_120px_rgba(0,0,0,0.15)] rounded-2xl" />
      </div>

      <div
        id="approach"
        className="w-full max-w-7xl mt-[-8vh] md:mt-[-10vh] lg:mt-[-12vh] z-10 flex flex-col md:flex-row gap-8 px-4 md:px-0"
      >
        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100 relative group transition-transform duration-300 hover:scale-[1.02] min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: lighthouseImage
                ? `url(${lighthouseImage})`
                : "none",
            }}
          />
          <div className="absolute inset-0 bg-black/50 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          <div className="relative z-10 p-10 md:p-12 text-white h-full flex flex-col justify-end">
            <h2 className="text-3xl text-[#E56D37] font-bold mb-4 tracking-tight">
              Our Mission
            </h2>
            <p
              className="text-lg font-medium leading-relaxed text-[#fff]"
              dangerouslySetInnerHTML={{ __html: aboutData.mission_text }}
            />
          </div>
        </div>

        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100 relative group transition-transform duration-300 hover:scale-[1.02] min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: futureCityImage
                ? `url(${futureCityImage})`
                : "none",
            }}
          />
          <div className="absolute inset-0 bg-black/50 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-end">
            <h2 className="text-3xl font-bold text-[#E56D37] mb-4 tracking-tight">
              Our Vision
            </h2>
            <p
              className="text-lg text-[#fff] font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.vision_text }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whowe;
