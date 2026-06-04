import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    tag: "AGRICULTURE",
    title: "3-Day Farmer Training Program on Climate-Resilient & Multi-Cropping",
    description: "The 3-Day Farmer Training Programme on Climate-Resilient & Multi-Cropping Agriculture is a large-scale capacity-building initiative launched by Sustainable Development Foundation (SDF) to strengthen the knowledge, skills, and organizational capacity of small and marginal farmers.",
    locations: "Haryana, Rajasthan, Uttar Pradesh, Madhya Pradesh, Chhattisgarh, Bihar, Jharkhand, Gujarat, Odisha, Telangana",
    image: "hero/banner1.png", // Farmer / Agriculture field image
    link: "/projects/farmer-training"
  },
  {
    id: 2,
    tag: "EDUCATION",
    title: "Smart Digital Classrooms for Rural & Underprivileged Children",
    description: "Bridging the digital divide by setting up interactive digital classrooms in rural government schools. This project provides modern learning infrastructure, e-learning content, and specialized teacher training to enhance primary and secondary education.",
    locations: "Delhi, Uttar Pradesh, Bihar, Madhya Pradesh, Rajasthan",
    image: "hero/banner2.png", // Classroom image
    link: "/projects/digital-education"
  },
  {
    id: 3,
    tag: "WOMEN EMPOWERMENT",
    title: "Skill Development & Livelihood Centers for Rural Women",
    description: "Empowering women through structured vocational training, handicraft skill building, and financial literacy workshops. The initiative helps women form self-help groups (SHGs) and establishes micro-enterprises for sustainable income generation.",
    locations: "Jharkhand, Odisha, Chhattisgarh, West Bengal",
    image: "hero/banner3.png", // Women working/empowerment image
    link: "/projects/women-livelihood"
  }
];

const OngoingProjects = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 5 seconds automatic interval slider loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    /* 🌍 MAIN WRAPPER CONTAINER */
    <section className="relative w-full min-h-[500px] py-15 px-6 sm:px-10 lg:px-16 flex items-center justify-center overflow-hidden bg-gray-950">
      
      {/* 🖼️ DYNAMIC BACKGROUND SLIDER LAYER (Piche wali animated background images) */}
      {projectsData.map((project, index) => (
        <div
          key={`bg-${project.id}`}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
            index === current ? "opacity-30 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)", // Piche ka backdrop smoothly blur rakhne ke liye
          }}
        />
      ))}

      {/* Dark Subtle Gradient Layer overlay (Text visibility maintain karne ke liye) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E56D37]/60 via-[#2d3748]/40 to-black/70 z-0" />

      {/* 📦 FOREGROUND CONTAINER */}
      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
            Our Impact Projects
          </h2>
          <div className="w-20 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        {/* 🎴 LAYOUT CONTENT CARD (Screenshot Model Match) */}
        <div 
          className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[450px] transform transition-transform duration-300"
          onMouseEnter={() => setIsPaused(true)}  // Mouse enter par slide stop
          onMouseLeave={() => setIsPaused(false)} // Mouse leave par slide restart
        >
          
          {/* 📝 LEFT COLUMN: INFORMATION AREA (50% block layout) */}
          <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-between text-left bg-white">
            
            {/* Animated content transition wrapper */}
            <div className="space-y-4">
              {/* Tag Block */}
              <span className="inline-block bg-[#E56D37] text-[#fff] text-xs font-bold tracking-widest px-3 py-1 rounded-md uppercase">
                {projectsData[current].tag}
              </span>
              
              {/* Main Headline Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight transition-all duration-500">
                {projectsData[current].title}
              </h3>
              
              {/* Core Description Text */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
                {projectsData[current].description}
              </p>
              
              {/* Location Marker Section */}
              <div className="flex items-start gap-2 pt-2 text-xs font-semibold text-gray-500">
                <span className="text-sm select-none mt-0.5 text-red-500">📍</span>
                <p className="leading-relaxed">{projectsData[current].locations}</p>
              </div>
            </div>

            {/* Action Explore Button */}
            <div className="pt-6">
              <Link
                to={projectsData[current].link}
                className="inline-flex items-center justify-center bg-[#E56D37] hover:bg-[#2d2d2d] text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md group"
              >
                Explore Project
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
            </div>

          </div>

          {/* 🖼️ RIGHT COLUMN: MEDIA PREVIEW GRID LAYER (50% block layout) */}
          <div className="md:col-span-6 relative min-h-[300px] md:min-h-full overflow-hidden bg-gray-100">
            {projectsData.map((project, index) => (
              <img
                key={`img-${project.id}`}
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                  index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}
            
            {/* Floating Multi-image icon indicator top right corner */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-lg text-white/90 select-none pointer-events-none">
              🖼️
            </div>
          </div>

        </div>

        {/* 📍 BOTTOM DOT INDICATORS */}
        <div className="flex space-x-3 mt-8">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                index === current ? "w-8 bg-white" : "w-2.5 bg-[#E56D37] hover:bg-white/70"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OngoingProjects;