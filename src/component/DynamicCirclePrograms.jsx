import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

// Har ek bubble ke liye different distinct background, active background, aur ring color variables
const bubbleColors = [
  { bg: "bg-[#E56D37]", text: "text-white uppercase", border: "border-white/60", ring: "ring-orange-300/50", activeBg: "bg-white text-[#E56D37] uppercase" }, // Orange
  { bg: "bg-[#2E7D32]", text: "text-white", border: "border-white/60", ring: "ring-green-300/50", activeBg: "bg-white text-[#2E7D32]" },  // Green
  { bg: "bg-[#1565C0]", text: "text-white", border: "border-white/60", ring: "ring-blue-300/50", activeBg: "bg-white text-[#1565C0]" },   // Blue
  { bg: "bg-[#AD1457]", text: "text-white", border: "border-white/60", ring: "ring-pink-300/50", activeBg: "bg-white text-[#AD1457]" },   // Pink
  { bg: "bg-[#283593]", text: "text-white", border: "border-white/60", ring: "ring-indigo-300/50", activeBg: "bg-white text-[#283593]" }, // Indigo
  { bg: "bg-[#00838F]", text: "text-white", border: "border-white/60", ring: "ring-cyan-300/50", activeBg: "bg-white text-[#00838F]" },   // Cyan
  { bg: "bg-[#6A1B9A]", text: "text-white", border: "border-white/60", ring: "ring-purple-300/50", activeBg: "bg-white text-[#6A1B9A]" }, // Purple
  { bg: "bg-[#EF6C00]", text: "text-white", border: "border-white/60", ring: "ring-orange-400/50", activeBg: "bg-white text-[#EF6C00]" }, // Deep Orange
];

const DynamicCirclePrograms = () => {
  const [programsList, setProgramsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(220); // Dynamic radius initialization

  // Window resize handler to update translation radius instantly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(120); // Mobile radius reduction to prevent screen clipping and overlaps
      } else if (window.innerWidth < 1024) {
        setRadius(170); // Tablet view radius
      } else {
        setRadius(220); // Desktop view radius
      }
    };

    handleResize(); // Initial trigger
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // API se programs data fetch karna
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/programs.php`);
        const result = await response.json();
        if (result.status === "success" && result.data) {
          const reversedData = [...result.data].reverse();
          setProgramsList(reversedData);

          // Unique categories filter aur format karna
          const uniqueCats = [
            ...new Set(
              reversedData
                .map((p) => p.program_id?.trim().toLowerCase())
                .filter(Boolean),
            ),
          ];
          setCategories(uniqueCats);

          // Default active category first item set karna
          if (uniqueCats.length > 0) {
            setActiveCategory(uniqueCats[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Filter programs based on active category
  const filteredPrograms = programsList.filter(
    (p) => (p.program_id || "").toLowerCase().trim() === activeCategory,
  );

  const formatLabel = (label) => {
    return label.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-600 font-bold">
        Loading Beautiful Layout...
      </div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-[#E56D37] to-[#fff] py-12 sm:py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-16">
          <span className="text-sm heading-font font-bold text-white uppercase tracking-widest block mb-2">
            Our Organization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#212121] heading-font tracking-tight">
            Our Programs
          </h2>
          <div className="w-20 h-1 bg-white mt-3 rounded-full mx-auto" />
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-12 items-center">
          
          {/* LEFT SIDE: Big Rotating Circle (Perfect Circle Fluid Configuration) */}
          <div className="flex justify-center items-center min-h-[320px] sm:min-h-[500px] lg:min-h-[580px] overflow-visible w-full mt-4 sm:mt-0">
            
            {/* FIXED: Mobile aspect size scale optimized down to 240px from 280px to fix heading intersection */}
            <div
              className="relative rounded-full border-4 border-dashed border-white/50 flex items-center justify-center transition-all duration-300 aspect-square w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                animation: "spin 25s linear infinite",
                animationPlayState: isHovered ? "paused" : "running",
              }}
            >
              {/* FIXED: Center Core Branding Image Element Logo Layout with precise mobile centering anchor variables */}
              <div
                className="absolute rounded-full flex items-center justify-center p-2 text-center z-10 transition-all w-16 h-16 sm:w-28 sm:h-28 lg:w-32 lg:h-32 overflow-hidden top-1/2 left-1/2 -mt-8 -ml-8 sm:-mt-14 sm:-ml-14 lg:-mt-16 lg:-ml-16"
                style={{
                  animation: "counter-spin 25s linear infinite",
                  animationPlayState: isHovered ? "paused" : "running",
                }}
              >
                <img
                  src="/logo/logo-bg.png"
                  alt="SRNF Logo"
                  className="w-full h-full object-contain rounded-full select-none pointer-events-none"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Dynamic Categories Placed on Circle Perimeter */}
              {categories.map((cat, index) => {
                const total = categories.length;
                const angle = (index * 360) / total;
                const colorConfig = bubbleColors[index % bubbleColors.length];

                return (
                  // FIXED: Absolute pivot points centered logic with dynamic responsive dot positions
                  <div
                    key={cat}
                    className="absolute flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 top-1/2 left-1/2 -mt-10 -ml-10 sm:-mt-14 sm:-ml-14 lg:-mt-16 lg:-ml-16 transition-all duration-300"
                    style={{
                      transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                    }}
                  >
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full h-full rounded-full flex items-center justify-center p-2 sm:p-3 text-[10px] sm:text-xs lg:text-sm font-bold text-center shadow-xl border transition-all duration-300 ${
                        activeCategory === cat
                          ? `${colorConfig.activeBg} border-white scale-110 ring-4 ${colorConfig.ring}`
                          : `${colorConfig.bg} ${colorConfig.text} ${colorConfig.border} hover:bg-white hover:text-gray-800`
                      }`}
                      style={{
                        animation: "counter-spin 25s linear infinite",
                        animationPlayState: isHovered ? "paused" : "running",
                      }}
                    >
                      {formatLabel(cat)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Filtered Output Cards Layout */}
          <div className="flex flex-col justify-center min-h-[400px] w-full mt-10 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {filteredPrograms.length === 0 ? (
                <div className="col-span-full bg-white/80 backdrop-blur p-8 rounded-2xl text-center text-gray-500 font-medium">
                  No active programs available in this category.
                </div>
              ) : (
                <>
                  {filteredPrograms.slice(0, 5).map((program, idx) => (
                    <Link
                      key={program.id || idx}
                      to={`/programdetails/${program.slug}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group h-auto sm:h-[250px] cursor-pointer block"
                    >
                      <div className="h-44 sm:h-28 overflow-hidden relative w-full">
                        <img
                          src={getImageUrl(program.image_url)}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://placehold.co/600x400?text=Program";
                          }}
                        />
                        <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs shadow">
                          {program.icon || "📌"}
                        </div>
                      </div>

                      <div className="p-4 sm:p-3 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-sm sm:text-xs font-bold text-gray-800 line-clamp-1 mb-1 heading-font group-hover:text-[#E56D37] transition-colors">
                            {program.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-[11px] text-left line-clamp-3 leading-relaxed body-font">
                            {program.description}
                          </p>
                        </div>

                        <div className="pt-3 sm:pt-2 mt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] sm:text-[8px] bg-orange-50 text-[#E56D37] font-bold px-2 sm:px-1 py-0.5 rounded-full">
                            Active
                          </span>
                          <span className="text-[#E56D37] font-bold text-xs sm:text-[10px] group-hover:underline flex items-center gap-0.5">
                            Explore &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  <Link
                    to="/programs"
                    className="bg-[#fff] rounded-2xl shadow-md border-2 border-[#E56D37] p-6 flex flex-col justify-center items-center text-center h-[180px] sm:h-[250px] group transition-all duration-300 hover:shadow-xl cursor-pointer gap-4"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <h3 className="text-sm font-bold text-[#E56D37] heading-font tracking-wide max-w-[180px]">
                        Want to explore more initiatives?
                      </h3>
                    </div>

                    <div className="w-full bg-transparent text-[#E56D37] border-2 font-extrabold text-xs py-2.5 px-2 rounded-xl shadow transition-all duration-300 group-hover:bg-[#E56D37] group-hover:text-white active:scale-95 text-center">
                      View All Programs
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};

export default DynamicCirclePrograms;