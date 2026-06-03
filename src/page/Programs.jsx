import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const Programs = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const [activeTab, setActiveTab] = useState("");

  // 🔥 1. STATIC PROGRAMS DATA ARRAY (आप यहाँ अपने सारे प्रोग्राम्स ऐड कर सकते हैं)
  const staticProgramsList = [
    {
      id: 1,
      program_id: "education",
      title: "Smart Classroom Initiative",
      description: "Equipping rural public schools with multimedia projectors, digital content packs, and fundamental teacher training modules to improve overall student engagement.",
      image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600",
      slug: "smart-classroom-initiative",
      icon: "🎓",
      beneficiaries: "12,000+",
      regions: "4 States"
    },
    {
      id: 2,
      program_id: "education",
      title: "Scholarship for Excellence",
      description: "Financial assistance and career mentoring paths for brilliant underprivileged students pursuing higher professional degrees in STEM branches.",
      image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600",
      slug: "scholarship-for-excellence",
      icon: "📜",
      beneficiaries: "450+",
      regions: "Pan-India"
    },
    {
      id: 3,
      program_id: "healthcare",
      title: "Mobile Health Clinics",
      description: "Bringing basic primary diagnostics, essential pediatric checkups, and free life-saving medicines directly to isolated remote tribal communities via equipped vans.",
      image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600",
      slug: "mobile-health-clinics",
      icon: "🏥",
      beneficiaries: "25,000+",
      regions: "18 Districts"
    },
    {
      id: 4,
      program_id: "livelihood",
      title: "Women Micro-Entrepreneurship",
      description: "Providing vocational stitching skills, business management workshops, and low-interest seed capital access to rural women self-help collectives.",
      image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600",
      slug: "women-micro-entrepreneurship",
      icon: "🧵",
      beneficiaries: "3,200+",
      regions: "8 Regions"
    }
  ];

  // 🔥 2. EXTRACT UNIQUE CATEGORIES FOR TABS DYNAMICALLY FROM STATIC LIST
  const uniqueCategories = [
    ...new Set(
      staticProgramsList
        .map((p) => p.program_id?.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];

  // 🔥 3. HANDLE HASH FOR TABS & DEFAULT ACTIVE TAB CONFIGURATION
  useEffect(() => {
    if (location.hash) {
      const tab = location.hash.replace("#", "");
      setActiveTab(tab);
    } else if (uniqueCategories.length > 0) {
      // डिफ़ॉल्ट रूप से पहले कैटेगरी के टैब को ओपन रखेगा
      setActiveTab(uniqueCategories[0]);
    }
  }, [location, uniqueCategories.length]);

  // 🔥 4. SCROLL LOGIC FOR TAB NAVIGATION ARROWS
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 300;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // Helper to format tab labels properly
  const formatTabLabel = (id) => {
    if (id === "all") return "All Programs 🌍";
    return id.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // 🔥 5. FILTER PROGRAMS BASED ON THE ACTIVE STATIC TAB
  const displayPrograms = staticProgramsList.filter(
    (p) => (p.program_id || "").toLowerCase().trim() === activeTab.toLowerCase().trim(),
  );

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      
      {/* HEADER SECTION WITH BACKGROUND IMAGE */}
      <section className="bg-secondary text-white py-20 bg-opacity-90 relative">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Programmes
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-green-50">
            Impact-driven initiatives targeting the most critical challenges
            facing our communities today.
          </p>
        </div>
      </section>

      {/* TABS SECTION WITH SMOOTH HORIZONTAL SCROLL ARROWS */}
      <section className="border-b sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-10 h-10 border border-gray-100"
          >
            <span className="text-lg">❮</span>
          </button>

          {/* Scrollable Tab Container */}
          <div
            ref={scrollRef}
            className="flex items-center space-x-8 overflow-x-auto no-scrollbar scroll-smooth px-12"
          >
            {uniqueCategories.map((tabId) => (
              <button
                key={tabId}
                onClick={() => {
                  setActiveTab(tabId);
                  window.history.replaceState(null, "", `#${tabId}`);
                }}
                className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === tabId
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-primary"
                }`}
              >
                {formatTabLabel(tabId)}
              </button>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-10 h-10 border border-gray-100"
          >
            <span className="text-lg">❯</span>
          </button>
        </div>
      </section>

      {/* FILTERED CARDS CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {displayPrograms.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
              No programs found for this category.
            </div>
          )}

          {displayPrograms.map((program, idx) => (
            <div
              key={program.id || idx}
              id={program.program_id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col scroll-mt-28"
            >
              {/* Card Image Block */}
              <div className="h-48 overflow-hidden">
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/600x400?text=SDF+Program";
                  }}
                />
              </div>

              {/* Card Detailed Info Block */}
              <div className="p-8 relative grow flex flex-col">
                {/* Floating Absolute Icon */}
                <div className="absolute -top-10 right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border border-gray-50 hover:scale-110 transition-transform duration-300">
                  {program.icon || "📌"}
                </div>

                <h3 className="text-2xl font-serif font-bold text-text-primary mb-4 mt-4 leading-tight">
                  {program.title}
                </h3>

                <p className="text-gray-600 mb-6 grow line-clamp-4">
                  {program.description}
                </p>

                {/* Badges Info (Beneficiaries & Active Region Status) */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100 flex-wrap">
                  <span className="bg-[#E9EFE1] text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {program.beneficiaries || "N/A"} Beneficiaries
                  </span>
                  <span className="bg-blue-50 text-accent text-xs font-bold px-3 py-1 rounded-full">
                    {program.regions || "N/A"} Active
                  </span>
                </div>

                {/* Detail Router Redirect Link */}
                <Link
                  to={`/programdetails/${program.slug}`}
                  className="text-primary font-bold hover:text-secondary uppercase tracking-wider text-sm self-start transition-colors mt-6"
                >
                  Explore Project &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Programs;