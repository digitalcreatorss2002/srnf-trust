import React, { useState, useEffect, useRef } from "react";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const StatCounter = ({ target, duration = 1500, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger || target <= 0) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return <span>{count.toLocaleString()}</span>;
};

const FocusAreas = () => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [focusData, setFocusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  // ✅ TIMELINE TRIGGER: Intersection Observer with Fallback
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 } // Ultra-low window constraint guarantees execution
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Dynamic backup trigger: If observer doesn't fire within 3.5 seconds, force play
    const backupTimer = setTimeout(() => {
      setHasIntersected(true);
    }, 3500);

    return () => {
      observer.disconnect();
      clearTimeout(backupTimer);
    };
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/focus_areas.php`)
      .then((res) => {
        if (!res.ok) throw new Error("Database network payload tracking failed.");
        return res.json();
      })
      .then((resData) => {
        if (resData.status === "success" && Array.isArray(resData.data)) {
          const formatted = resData.data.map((item, index) => {
            const idVal = parseInt(item.id) || index + 1;
            
            // SANITIZED REGEX PARSER: Extracts numbers vs strings
            const rawText = item.number_text ? String(item.number_text).trim() : "0";
            const numberMatch = rawText.match(/\d+/);
            const targetVal = numberMatch ? parseInt(numberMatch[0], 10) : 0;
            const suffixVal = rawText.replace(/[0-9]/g, "");

            // 🛠️ FIXED: Absolute boundary path verification structure
            let finalImg;
            if (item.image_url && !item.image_url.includes("default.png")) {
              if (item.image_url.startsWith("http://") || item.image_url.startsWith("https://")) {
                finalImg = item.image_url;
              } else {
                // Slashes and cleanup mapping
                let cleanPath = item.image_url.startsWith("/") ? item.image_url.substring(1) : item.image_url;
                
                if (cleanPath.startsWith("admin/")) {
                  cleanPath = cleanPath.substring(6);
                }
                
                // Pure dynamic conditional routing matrix
                if (!cleanPath.startsWith("uploads/")) {
                  cleanPath = `uploads/focus_areas/${cleanPath}`;
                }
                
                finalImg = getImageUrl(cleanPath);
              }
            } else {
              finalImg = `https://placehold.co/150?text=${encodeURIComponent(item.title || 'Focus')}`;
            }

            return {
              id: idVal,
              title: item.title || "Focus Area",
              targetNumber: targetVal, 
              suffix: suffixVal,
              image: finalImg,
              isUp: idVal % 2 !== 0,
            };
          });
          setFocusData(formatted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Critical stream fetch mapping failure:", err);
        setLoading(false);
      });
  }, []);

  if (loading || focusData.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-t from-[#E56D37]/10 via-[#fdf4ee] to-[#fff] text-slate-800 pt-[40px] pb-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24">
          <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest block mb-2">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">Our Focus Areas</h2>
          <div className="w-24 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-24 gap-x-8 items-center pt-6">
          <div className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-[2px] pointer-events-none z-0">
            <svg className="w-full h-32 absolute -top-16 left-0" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              <path d="M 0,30 L 333,100 L 666,0 L 1000,70" stroke="#E56D37" strokeWidth="2" strokeDasharray="6,6" opacity="0.4" />
            </svg>
          </div>

          {focusData.map((item) => (
            <div key={item.id} className={`flex flex-col items-center text-center relative z-10 transition-all duration-1000 ${item.isUp ? "lg:-translate-y-12" : "lg:translate-y-12"}`}>
              
              <div className="w-36 h-36 rounded-full p-1 border border-dashed border-[#E56D37] bg-white hover:border-solid hover:scale-110 transition-all duration-300 shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => { e.target.src = 'https://placehold.co/150?text=SRNF+Focus'; }} 
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 max-w-[200px]">
                <div className="text-3xl font-black text-gray-900 flex items-center justify-center tracking-wide drop-shadow-sm">
                  <StatCounter target={item.targetNumber} trigger={hasIntersected} />
                  <span>{item.suffix}</span>
                </div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-700 leading-relaxed">{item.title}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;