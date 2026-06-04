import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const programsData = [
  {
    id: 1,
    title: "Skill Development",
    description:
      "Providing industry-relevant technical skills and vocational training to empower rural youth for sustainable employment.",
    image: "hero/banner1.png",
    link: "/programs?filter=skill-development",
  },
  {
    id: 2,
    title: "Women Empowerment",
    description:
      "Fostering financial independence and leadership among women through entrepreneurship and self-help group mentorship.",
    image: "hero/banner2.png",
    link: "/programs?filter=women-empowerment",
  },
  {
    id: 3,
    title: "Rural Education",
    description:
      "Setting up modern digital learning classrooms and comprehensive educational resources for underprivileged children.",
    image: "hero/banner3.png",
    link: "/programs?filter=rural-education",
  },
  {
    id: 4,
    title: "Agriculture & Climate",
    description:
      "Educating small farmers on multi-cropping, organic fertilizers, and climate-resilient farming methodologies.",
    image: "hero/banner1.png",
    link: "/programs?filter=agriculture-climate",
  },
];

const OurPrograms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % programsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + programsData.length) % programsData.length,
    );
  };

  const getVisibleCards = () => {
    const total = programsData.length;
    return [
      programsData[currentIndex % total],
      programsData[(currentIndex + 1) % total],
      programsData[(currentIndex + 2) % total],
    ];
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="w-full bg-gradient-to-b from-[#E56D37] to-[#fff] py-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
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
                /* 1. scale-125 hata diya taaki container width equal rahe.
                  2. hover:translate-y-4 lagaya jisse hover karne par card smooth bottom transition karega.
                */
                className="w-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:translate-y-10 group flex flex-col justify-between min-h-[420px] border border-gray-100"
              >
                {/* 🖼️ CARD IMAGE WITH HOVER ZOOM & OVERLAY */}
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

        {/* 📍 BOTTOM DOT INDICATORS */}
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
      </div>
    </section>
  );
};

export default OurPrograms;
