import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const defaultPrograms = [
  {
    id: 1,
    title: "Skill Development",
    description:
      "Providing industry-relevant technical skills and vocational training to empower rural youth for sustainable employment.",
    image: "hero/banner1.png",
    link: "/programs#education",
  },
  {
    id: 2,
    title: "Women Empowerment",
    description:
      "Fostering financial independence and leadership among women through entrepreneurship and self-help group mentorship.",
    image: "hero/banner2.png",
    link: "/programs#livelihood",
  },
  {
    id: 3,
    title: "Rural Education",
    description:
      "Setting up modern digital learning classrooms and comprehensive educational resources for underprivileged children.",
    image: "hero/banner3.png",
    link: "/programs#education",
  },
  {
    id: 4,
    title: "Agriculture & Climate",
    description:
      "Educating small farmers on multi-cropping, organic fertilizers, and climate-resilient farming methodologies.",
    image: "hero/banner1.png",
    link: "/programs#agriculture-climate",
  },
];

const OurPrograms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/programs.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data && resData.data.length > 0) {
          const formatted = resData.data.map((program) => ({
            id: program.id,
            title: program.title,
            description: program.description,
            image: getImageUrl(program.image_url),
            link: `/programdetails/${program.slug}`,
          }));
          setProgramsList(formatted);
        }
      })
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  const programsData = programsList.length > 0 ? programsList : defaultPrograms;

  useEffect(() => {
    if (isPaused || programsData.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, programsData.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % programsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + programsData.length) % programsData.length
    );
  };

  const getVisibleCards = () => {
    const total = programsData.length;
    if (total === 0) return [];
    if (total === 1) return [programsData[0]];
    if (total === 2) return [programsData[0], programsData[1]];
    return [
      programsData[currentIndex % total],
      programsData[(currentIndex + 1) % total],
      programsData[(currentIndex + 2) % total],
    ];
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="w-full bg-gradient-to-b from-[#E56D37] to-[#fff] py-16 px-6 sm:px-10 lg:px-16 overflow-hidden relative z-10">
      
      {/* 🌪️ 100% PERFECT CONTINUOUS WIDE CONTOUR LINES LAYER */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[260px] pointer-events-none z-0 overflow-hidden">
        <div 
          className="w-full h-full opacity-30 bg-cover bg-right-top bg-no-repeat"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='100%25' height='100%25'%3E%3Cpath d='M100 50C250-20 400 120 600 30C700-10 750 80 850 40M50 120C220 30 380 200 580 90C680 40 760 160 880 110M0 200C180 90 320 280 550 160C650 110 720 250 850 190M-50 290C120 160 280 370 500 240C620 170 700 320 820 260M-100 380C50 240 220 450 450 310C580 230 650 400 800 320' fill='none' stroke='%23ffffff' stroke-width='2' stroke-opacity='0.6' stroke-linecap='round'/%3E%3C/svg%3E\")",
            animation: "pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }}
        />
      </div>

      {/* 📦 FOREGROUND CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🎯 Centered Section Heading */}
        <div className="text-center mb-24">
          <span className="text-sm font-bold text-[#fff] uppercase tracking-widest block mb-2">
            Our Organization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Our Programs
          </h2>
          <div className="w-20 h-1 bg-[#fff] mt-3 rounded-full mx-auto" />
        </div>

        {/* 📦 CARDS DISPLAY CONTAINER */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-center pt-6 min-h-[480px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleCards.map((program, index) => {
            return (
              <div
                key={`${program.id}-${index}`}
                className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:translate-y-10 group flex flex-col justify-between min-h-[420px] border border-gray-100"
              >
                {/* 🖼️ CARD IMAGE */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* 📝 CARD TEXT CONTENT AREA */}
                <div className="p-6 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#E56D37] group-hover:text-[#2b434d] transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-4">
                    <Link
                      to={program.link}
                      className="inline-flex items-center text-sm font-bold text-[#E56D37] hover:text-[#2b434d] transition-colors group/btn"
                    >
                      Read More
                      <span className="ml-1.5 transform group-hover/btn:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🧭 NAVIGATION CONTROLS */}
        {programsData.length > 3 && (
          <div className="absolute top-[50%] -left-4 -right-4 md:-left-10 md:-right-10 lg:-left-16 lg:-right-16 transform -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#E56D37] text-gray-800 hover:text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 pointer-events-auto focus:outline-none"
            >
              <span className="text-lg font-bold">❮</span>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#E56D37] hover:bg-[#2d3748] text-gray-800 hover:text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 pointer-events-auto focus:outline-none"
            >
              <span className="text-lg font-bold">❯</span>
            </button>
          </div>
        )}

        {/* 📍 BOTTOM DOT INDICATORS */}
        {programsData.length > 1 && (
          <div className="flex justify-center space-x-2 mt-16 md:mt-24">
            {programsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentIndex
                    ? "w-8 bg-[#E56D37]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurPrograms;