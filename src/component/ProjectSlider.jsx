import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const projectSlides = [
  {
    id: 1,
    title: "Skill Development Initiative",
    description: "Empowering rural youth with modern technical skills and vocational training to build sustainable livelihoods and secure financial independence.",
    image: "hero/banner1.png",
    link: "/programs?filter=skill-development"
  },
  {
    id: 2,
    title: "Women Empowerment Centers",
    description: "Creating safe community spaces to support women through entrepreneurship mentorship, financial literacy, and self-help group networking.",
    image: "hero/banner2.png",
    link: "/programs?filter=women-empowerment"
  },
  {
    id: 3,
    title: "Rural Education Reach",
    description: "Setting up smart digital classrooms and library resources across distant villages to ensure quality education for under-resourced kids.",
    image: "hero/banner3.png",
    link: "/programs?filter=rural-education"
  }
];

const ProjectSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Slider ko pause karne ki state

  // 5 seconds automatic interval slider cycle (Pause logic ke sath)
  useEffect(() => {
    if (isPaused) return; // Agar mouse image par hai, toh interval mat banao

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === projectSlides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]); // Jab bhi isPaused state change hogi, effect re-run hoga

  return (
    <section className="w-full bg-[#f4f6f0] py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 🎯 HEADINGS CENTERED */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-[#75843a] uppercase tracking-widest block mb-2">
            Our Organization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Ongoing Projects
          </h2>
          <div className="w-24 h-1 bg-[#75843a] mt-3 rounded-full mx-auto" />
        </div>

        {/* 🌟 MAIN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[420px]">
          
          {/* 📝 LEFT SIDE: ANIMATED TEXT CONTENT */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
            {projectSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ease-in-out origin-left ${
                  index === current
                    ? "opacity-100 translate-x-0 scale-100 block"
                    : "opacity-0 -translate-x-8 scale-95 hidden"
                }`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {slide.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  {slide.description}
                </p>
                
                <Link
                  to={slide.link}
                  className="inline-flex items-center text-[#75843a] hover:text-[#5e6b2e] font-bold text-base transition-colors group"
                >
                  Explore Project Details
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            ))}

            {/* 📍 Pagination Indicators under the text */}
            <div className="flex space-x-2 pt-4">
              {projectSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    index === current ? "w-8 bg-[#75843a]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 🖼️ RIGHT SIDE: INTERACTIVE IMAGE SLIDER WITH HOVER PAUSE & LINK */}
          <div className="lg:col-span-7 relative h-[350px] sm:h-[420px] w-full order-1 lg:order-2">
            {projectSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  index === current
                    ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                    : "opacity-0 translate-x-12 z-0 pointer-events-none"
                }`}
                // Hover Events to Control Slide State
                onMouseEnter={() => setIsPaused(true)}  // Mouse aane pr stop
                onMouseLeave={() => setIsPaused(false)} // Mouse hatne pr start
              >
                {/* Image Link Component wrapper */}
                <Link to={slide.link} className="block w-full h-full group">
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 bg-gray-200 relative">
                    
                    {/* Background Slide Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Internal Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Floating Action Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Project ↗
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectSlider;