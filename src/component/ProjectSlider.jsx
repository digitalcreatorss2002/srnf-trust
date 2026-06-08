import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

// Screenshot base directory matching config url
const BACKEND_BASE_URL = "http://localhost/srnf/srnf_data/admin/";

const defaultSlides = [
  {
    id: 1,
    title: "Skill Development Initiative",
    description:
      "Empowering rural youth with modern technical skills and vocational training to build sustainable livelihoods and secure financial independence.",
    image: "hero/banner1.png",
    link: "/programs?filter=skill-development",
  },
  {
    id: 2,
    title: "Women Empowerment Centers",
    description:
      "Creating safe community spaces to support women through entrepreneurship mentorship, financial literacy, and self-help group networking.",
    image: "hero/banner2.png",
    link: "/programs?filter=women-empowerment",
  },
  {
    id: 3,
    title: "Rural Education Reach",
    description:
      "Setting up smart digital classrooms and library resources across distant villages to ensure quality education for under-resourced kids.",
    image: "hero/banner3.png",
    link: "/programs?filter=rural-education",
  },
];

const ProjectSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesList, setSlidesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live projects rows data straight from the REST endpoint
  useEffect(() => {
    fetch(`${API_BASE_URL}/projects_slider.php`)
      .then((res) => {
        if (!res.ok) throw new Error("API stream connection error response.");
        return res.json();
      })
      .then((resData) => {
        if (
          resData.status === "success" &&
          Array.isArray(resData.data) &&
          resData.data.length > 0
        ) {
          const formatted = resData.data.map((project) => {
            // Check if uploaded path is absolute web string or absolute local pointer
            const finalImg = project.image_url.startsWith("http")
              ? project.image_url
              : `${BACKEND_BASE_URL}${project.image_url}`;

            return {
              id: project.id,
              title: project.title,
              description: project.description,
              image: finalImg,
              link: `/projectdetails/${project.slug}`, // Sync dynamic slug detailing links cleanly
            };
          });
          setSlidesList(formatted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error synchronizing project slides array matrix:", err);
        setLoading(false);
      });
  }, []);

  const projectSlides = slidesList.length > 0 ? slidesList : defaultSlides;

  // 2. Continuous 5 seconds transition state loop configuration
  useEffect(() => {
    if (isPaused || projectSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === projectSlides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, projectSlides.length]);

  if (loading) {
    return (
      <div className="w-full py-24 text-center bg-white text-gray-500 font-bold tracking-wider">
        Loading Projects Presentation Deck...
      </div>
    );
  }

  return (
    /* 🌍 MAIN WRAPPER CONTAINER */
    <section className="w-full bg-white py-20 px-6 sm:px-10 lg:px-16 overflow-hidden relative">
      {/* 🌪️ 50% LEFT SIDE FLOATING TOPOGRAPHY BACKGROUND LAYER */}
      <div className="absolute left-0 top-0 w-full lg:w-1/2 h-full pointer-events-none overflow-hidden z-0">
        <div
          className="w-full h-full opacity-35 bg-cover bg-left bg-no-repeat animate-left-topo origin-left"
          style={{
            backgroundImage: "url('/about/bgillustrate.png')",
          }}
        />
      </div>

      {/* 📦 FOREGROUND MAIN CONTENT */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 🎯 HEADINGS CENTERED */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest block mb-2">
            Our Organization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Ongoing Projects
          </h2>
          <div className="w-24 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        {/* 🌟 MAIN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[420px]">
          {/* 📝 LEFT SIDE: ANIMATED TEXT CONTENT */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1 relative z-10">
            {projectSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ease-in-out origin-left ${
                  index === current
                    ? "opacity-100 translate-x-0 scale-100 block"
                    : "opacity-0 -translate-x-8 scale-95 hidden"
                }`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E56D37] mb-4 leading-tight">
                  {slide.title}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 line-clamp-5">
                  {slide.description}
                </p>

                <Link
                  to={slide.link}
                  className="inline-flex items-center text-[#E56D37] hover:text-black font-bold text-base transition-colors group"
                >
                  Explore Project Details
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            ))}

            {/* 📍 Pagination Indicators */}
            {projectSlides.length > 1 && (
              <div className="flex space-x-2 pt-4">
                {projectSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                      index === current
                        ? "w-8 bg-[#E56D37]"
                        : "w-2 bg-black/20 hover:bg-black/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 🖼️ RIGHT SIDE: IMAGE SLIDER */}
          <div className="lg:col-span-7 relative h-[350px] sm:h-[420px] w-full order-1 lg:order-2 z-10">
            {projectSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  index === current
                    ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                    : "opacity-0 translate-x-12 z-0 pointer-events-none"
                }`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <Link to={slide.link} className="block w-full h-full group">
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 bg-gray-200 relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

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
