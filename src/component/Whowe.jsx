import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getImageUrl } from '../apiConfig';

const defaultAbout = {
  who_we_are_text: "Our team has diverse skills, encompassing digital design, engineering, and innovative thinking. Engaged in collaboration, we ensure timely and effective solutions.",
  mission_text: "To provide innovative and sustainable digital solutions that empower businesses worldwide to reach their full potential.",
  vision_text: "To become a global leader in creative technology, pioneering new standards of user experience and visual storytelling.",
  mission_image: "hero/banner2.png",
  vision_image: "hero/banner3.png"
};

const Whowe = () => {
  const [aboutData, setAboutData] = useState(defaultAbout);
  const mainOfficeImage = 'hero/banner1.png'; // Keep static main office cover

  useEffect(() => {
    fetch(`${API_BASE_URL}/about_who_we_are.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data) {
          setAboutData({
            who_we_are_text: resData.data.who_we_are_text,
            mission_text: resData.data.mission_text,
            vision_text: resData.data.vision_text,
            mission_image: getImageUrl(resData.data.mission_image),
            vision_image: getImageUrl(resData.data.vision_image),
          });
        }
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  const lighthouseImage = aboutData.mission_image;
  const futureCityImage = aboutData.vision_image;

  // A subtle paper-cut style pattern for the main outer background
  const paperPattern = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0a10 10 0 10 0 20 10 10 0 00 0-20zM30 30a10 10 0 10 0 20 10 10 0 00 0-20zM50 0a10 10 0 10 0 20 1０ 1０ ０ ００ ０-2０%M7０ 3０a1０ 1０ ０ １０ ０ ２０ １０ １０ ０ ００ ０-2０%M1０ 6０a1０ 1０ ０	１０	₀	₂₀	₁₀	₁₀	₀	₀₀	₀-2₀%M3０	9０a1０	1０	₀	１０	₀	₂₀	₁₀	₁₀	₀	₀₀	₀-2₀%M5０	6０a1５	１５	₀	１５	₀	₂５	₁５	₁５	₀	₀₀	₀-2５%M7０	9０a1５	１５	₀	１５	₀	₂５	₁５	₁５	₀	₀₀	₀-2５z' fill='%23e<PASSWORD>' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`;

  return (
    <section 
      className="w-full min-h-screen py-16 px-4 md:px-12 lg:px-24 bg-white flex flex-col items-center" 
      style={{ backgroundImage: paperPattern, backgroundAttachment: 'fixed' }}
    >
      {/* 1. Overall Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#E56D37] mb-8 tracking-tight">
        Who We Are
      </h1>

      {/* 2. Top Corrected Paragraph */}
      <p 
        className="max-w-4xl text-center text-lg md:text-xl text-[#2d2d2d] font-medium leading-relaxed mb-12"
        dangerouslySetInnerHTML={{ __html: aboutData.who_we_are_text }}
      />

      {/* 3. Main Display Area with Team Image & Layered Concave Effect */}
      <div className="relative w-full max-w-7xl h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-3xl overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] border-4 border-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mainOfficeImage})` }}
        />
        {/* Layered concave shadow overlay */}
        <div className="absolute inset-0 bg-black/5 shadow-[inset_0_0_120px_rgba(0,0,0,0.15)] rounded-2xl" />
      </div>

      {/* 4. Bottom Boxes - Mission & Vision */}
      <div className="w-full max-w-7xl mt-[-8vh] md:mt-[-10vh] lg:mt-[-12vh] z-10 flex flex-col md:flex-row gap-8 px-4 md:px-0">
        
        {/* Our Mission Box with Image Background */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100 relative group transition-transform duration-300 hover:scale-[1.02]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${lighthouseImage})` }}
          />
          {/* Internal shadow and overlay for text legibility */}
          <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          <div className="relative z-10 p-10 md:p-12 text-white h-full flex flex-col justify-end">
            <h2 className="text-3xl text-[#E56D37] font-bold mb-4 tracking-tight">Our Mission</h2>
            <p 
              className="text-lg font-medium leading-relaxed text-[#fff]"
              dangerouslySetInnerHTML={{ __html: aboutData.mission_text }}
            />
          </div>
        </div>

        {/* Our Vision Box with Image Background */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100 relative group transition-transform duration-300 hover:scale-[1.02]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${futureCityImage})` }}
          />
          {/* Internal shadow and overlay for text legibility */}
          <div className="absolute inset-0 bg-black/45 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          <div className="relative z-10 p-10 md:p-12 text-[#E56D37] h-full flex flex-col justify-end">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Our Vision</h2>
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