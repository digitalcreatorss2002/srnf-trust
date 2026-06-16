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
          const formatted = resData.data.map((item) => ({
            id: item.id,
            title: item.title,
            image: getImageUrl(item.image_url)
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
        
        {/* 🎯 HEADINGS CENTERED */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest block mb-2">
            Grassroots Initiatives
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            State Map
          </h2>
          <div className="w-24 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
          
          <div className="lg:col-span-5 w-full h-[350px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-md bg-neutral-900 relative border-2 border-white flex flex-col justify-end">
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
                <h3 className="font-bold text-xl sm:text-2xl tracking-wide font-serif text-[#E56D37]">
                  {selectedItem.title}
                </h3>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 w-full h-full max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((item) => {
                const isSelected = selectedItem && selectedItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className={`w-full text-center px-4 py-5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border focus:outline-none flex items-center justify-center min-h-[80px] shadow-sm cursor-pointer ${
                      isSelected
                        ? "bg-[#E56D37] border-[#E56D37] text-white shadow-md scale-[1.02]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-[#E56D37] hover:text-[#E56D37] hover:bg-orange-50/20"
                    }`}
                  >
                    <span className="line-clamp-2 leading-snug">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ImageGallerySection;