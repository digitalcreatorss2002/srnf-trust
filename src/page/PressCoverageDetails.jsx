import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const STATIC_PRESS_DATABASE = [
  {
    slug: "bridging-digital-divide-rural-schools",
    tag: "National News",
    datee: "May 14, 2026",
    title: "SDF Trust Transforms 150+ Block Classrooms Into Smart Multimedia Hubs",
    para: "In a major stride toward educational equity, the Sustainable Development Foundation (SDF) has successfully modernized over 150 classrooms in rural blocks.\nBy integrating completely offline K-12 interactive multimedia projectors, village public schools have recorded an unprecedented drop in student absenteeism.\nLocal teachers have undergone extensive training modules, enabling them to confidently navigate digital content packs, visual charts, and interactive quiz tools without requiring active internet setups.",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200"
    ]
  },
  {
    slug: "mobile-healthcare-impact-report",
    tag: "Regional Spectrum",
    datee: "April 28, 2026",
    title: "Mobile Health Clinics Deliver Free Primary Care Across Tribal Belts",
    para: "Access to life-saving diagnostics is no longer a distant dream for remote tribal communities.\nSDF Trust's custom health vans have seamlessly conducted thousands of pediatric evaluations and primary blood panels over the last quarter alone.\nEquipped with built-in generic medicine dispensaries and clinical evaluation setups, these mobile units ensure that essential drugs are handed over immediately to families without travel blockades.",
    images: [
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200"
    ]
  }
];

const PressCoverageDetails = () => {
  const { slug } = useParams();

  const [coverage, setCoverage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activePreviewImage, setActivePreviewImage] = useState("");

  // GALLERY LIGHTBOX MODAL STATES
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    const foundCoverage = STATIC_PRESS_DATABASE.find((item) => item.slug === slug);

    if (foundCoverage) {
      setCoverage(foundCoverage);
      setActivePreviewImage(foundCoverage.images[0] || "https://via.placeholder.com/1200x800?text=No+Image");
    } else {
      setCoverage(null);
    }
    setLoading(false);
  }, [slug]);

  const openModal = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % coverage.images.length;
    setSelectedImage(coverage.images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + coverage.images.length) % coverage.images.length;
    setSelectedImage(coverage.images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-[#6a752b] animate-pulse">
        Loading Press Details...
      </div>
    );
  }

  // ERROR / NOT FOUND SCREEN
  if (!coverage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 font-bold mb-4">Press Coverage Not Found</h2>
          <Link to="/media" className="text-[#6a752b] font-bold underline">Back to Media & Stories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 pt-16 pb-12">
        
        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4 text-sm font-bold text-[#6a752b] uppercase tracking-widest">
            <span>{coverage.tag || "Press Coverage"}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">{coverage.datee}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-gray-900 leading-tight">
            {coverage.title}
        </h1>

        {/* 🔥 INTERACTIVE GALLERY CONTAINER (1 BIG IMAGE + THUMBNAILS BELOW) */}
        <div className="mb-10 flex flex-col gap-4">
            {/* Large Main Display View */}
            <div className="relative group overflow-hidden rounded-3xl shadow-md border border-gray-100 bg-gray-50 flex items-center justify-center">
                <img
                  src={activePreviewImage}
                  alt={coverage.title}
                  className="w-full h-[320px] md:h-[520px] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-102"
                  onClick={() => openModal(activePreviewImage, coverage.images.indexOf(activePreviewImage))}
                />
            </div>

            {/* Interactive Row Grid Thumbnails Layout */}
            {coverage.images && coverage.images.length > 1 && (
                <div className="flex flex-wrap gap-3 items-center justify-start p-1 overflow-x-auto no-scrollbar">
                    {coverage.images.map((img, i) => {
                        const isActive = activePreviewImage === img;
                        return (
                            <button
                                key={i}
                                onClick={() => setActivePreviewImage(img)}
                                className={`aspect-[4/3] w-20 md:w-24 rounded-xl overflow-hidden border-2 bg-white transition-all shadow-sm shrink-0 duration-200 cursor-pointer ${isActive ? "border-[#6a752b] scale-105 shadow" : "border-gray-200 hover:border-gray-400 opacity-75 hover:opacity-100"}`}
                            >
                                <img 
                                    src={img} 
                                    alt={`Thumbnail index ${i}`} 
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>

        {/* TEXT CONTENT AREA */}
        <div className="prose prose-lg max-w-none mb-12">
            {(coverage.para || "").split("\n").map((p, i) => (
              <p key={i} className="mb-6 text-gray-600 leading-relaxed text-lg">
                {p}
              </p>
            ))}
        </div>

      </article>

      {/* LIGHTBOX FULLSCREEN MODAL GALLERY WRAPPER */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] backdrop-blur-md transition-opacity" onClick={closeModal}>
          
          {/* Close Button */}
          <button className="absolute top-8 right-8 text-white/70 hover:text-white text-5xl font-light z-50 transition-colors cursor-pointer" onClick={closeModal}>&times;</button>

          {/* Previous Arrow Button */}
          <button className="absolute left-4 md:left-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full z-50 transition-all cursor-pointer" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Fullscreen Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                alt="Enlarged gallery preview"
              />
              <div className="text-white/40 text-center mt-4 text-sm font-medium tracking-widest">
                  {currentIndex + 1} / {coverage.images.length}
              </div>
          </div>

          {/* Next Arrow Button */}
          <button className="absolute right-4 md:right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full z-50 transition-all cursor-pointer" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}

      {/* Bottom Directory Return */}
      <div className="text-center py-16 border-t border-gray-50">
        <Link to="/media" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-black uppercase text-xs tracking-widest">
            <span className="text-xl">←</span> Back to Media & Stories
        </Link>
      </div>
    </div>
  );
};

export default PressCoverageDetails;