import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const ImageGallerySection = () => {
  const [images, setImages] = useState([]);
  const [selectedItem, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/mapsection.php`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((resData) => {
        if (resData.status === "success" && Array.isArray(resData.data)) {
          // Pure backend payload keys (district_covered, block_covered, village_covered, major_project, total_complete_projects, live_impact)
          const formatted = resData.data.map((item) => ({
            id: item.id,
            title: item.title,
            image: getImageUrl(item.image_url),
            // Yahan hum database ke har possible case ko strictly bind kar rahe hain
            district: item.district_covered || item.district || "N/A",
            block: item.block_covered || item.block || "N/A",
            village: item.village_covered || item.village || "N/A",
            majorProject: item.major_project || item.majorProject || "N/A",
            totalProjects: item.total_complete_projects !== undefined ? item.total_complete_projects : (item.totalProjects || 0),
            liveImpact: item.live_impact || item.liveImpact || "N/A",
          }));

          setImages(formatted);
          if (formatted.length > 0) {
            setSelectedImage(formatted[0]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dynamic gallery images:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-24 text-center text-gray-500 font-bold tracking-wider">
        Loading Photo Gallery...
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-[#006D5B] uppercase tracking-widest block mb-2 heading-font">
            Grassroots Initiatives
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight heading-font">
            State Map
          </h2>
          <div className="w-24 h-1 bg-[#006D5B] mt-3 rounded-full mx-auto" />
        </div>

        {/* Main Content Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
          
          {/* LEFT SIDE: Standalone Map Image (5 Columns Wide) */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full h-[380px] sm:h-[500px] rounded-2xl overflow-hidden shadow-md bg-neutral-900 relative border-2 border-white flex flex-col justify-end">
              <AnimatePresence mode="wait">
                {selectedItem && (
                  <motion.img
                    key={selectedItem.id}
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
              
              {selectedItem && (
                <div className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white pt-20">
                  <h3 className="font-bold text-xl sm:text-2xl tracking-wide font-serif text-[#006D5B] heading-font">
                    {selectedItem.title}
                  </h3>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 w-full flex flex-col gap-6">
            
            {/* Top: State Names Grid (Configured for up to 4x4 layout) */}
            <div className="w-full max-h-[310px] overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {images.map((item) => {
                  const isSelected = selectedItem && selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className={`w-full text-center px-2 py-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 border focus:outline-none flex items-center justify-center min-h-[68px] shadow-sm cursor-pointer ${
                        isSelected
                          ? "bg-[#006D5B] border-[#006D5B] text-white shadow-md scale-[1.01]"
                          : "bg-white border-gray-200 text-gray-700 hover:border-[#006D5B] hover:text-[#006D5B] hover:bg-orange-50/20"
                      }`}
                    >
                      <span className="line-clamp-2 leading-snug heading-font">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section: Heading + Snap Impact Shot Grid (Strictly 3 Columns x 2 Rows) */}
            {selectedItem && (
              <div className="flex flex-col gap-3">
                {/* Section Subheading added here */}
                <h3 className="text-md font-bold text-gray-700 uppercase tracking-wider pl-1 heading-font">
                  Impact Snap Shot ⚡
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-5 rounded-2xl border border-[#006D5B] shadow-sm transition-all duration-300">
                  
                  {/* Column 1, Row 1: District */}
                  <div className="bg-orange-50/40 p-3 rounded-xl border border-orange-100/80">
                    <span className="block text-[10px] font-bold text-[#212121] uppercase tracking-wider mb-0.5">District Covered</span>
                    <span className="text-xs font-bold text-gray-800 line-clamp-1">{selectedItem.district}</span>
                  </div>

                  {/* Column 2, Row 1: Block */}
                  <div className="bg-orange-50/40 p-3 rounded-xl border border-orange-100/60">
                    <span className="block text-[10px] font-bold text-[#212121] uppercase tracking-wider mb-0.5">Block Covered</span>
                    <span className="text-xs font-bold text-gray-800 line-clamp-1">{selectedItem.block}</span>
                  </div>

                  {/* Column 3, Row 1: Village */}
                  <div className="bg-orange-50/40 p-3 rounded-xl border border-orange-100/60">
                    <span className="block text-[10px] font-bold text-[#212121] uppercase tracking-wider mb-0.5">Village Covered</span>
                    <span className="text-xs font-bold text-gray-800 line-clamp-1">{selectedItem.village}</span>
                  </div>

                  {/* Column 1, Row 2: Major Project */}
                  <div className="bg-orange-50/40 p-3 rounded-xl border border-orange-100/60">
                    <span className="block text-[10px] font-bold text-[#212121] uppercase tracking-wider mb-0.5">Major Project</span>
                    <span className="text-xs font-bold text-gray-800 line-clamp-1">{selectedItem.majorProject}</span>
                  </div>

                  {/* Column 2, Row 2: Total Complete Projects */}
                  <div className="bg-orange-50/40 p-3 rounded-xl border border-orange-100/60">
                    <span className="block text-[10px] font-bold text-[#212121] uppercase tracking-wider mb-0.5">Total Complete Projects</span>
                    <span className="text-sm font-extrabold text-[#006D5B]">{selectedItem.totalProjects}</span>
                  </div>

                  {/* Column 3, Row 2: Live Impact */}
                  <div className="bg-orange-50/40 p-3 rounded-xl border border-orange-100/60">
                    <span className="block text-[10px] font-bold text-[#212121] uppercase tracking-wider mb-0.5">Live Impact</span>
                    <span className="text-sm font-extrabold text-[#006D5B]">{selectedItem.liveImpact}</span>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ImageGallerySection;