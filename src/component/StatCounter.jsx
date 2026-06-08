import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../apiConfig";

const defaultFocusData = [
  {
    id: 1,
    title: "Health & Nutrition",
    targetNumber: 450,
    suffix: "+",
    label: "Clinics Supported",
    image: "hero/banner3.png",
    isUp: true,
  },
  {
    id: 2,
    title: "Education & Child Care",
    targetNumber: 12500,
    suffix: "+",
    label: "Students Reached",
    image: "hero/banner1.png",
    isUp: false,
  },
  {
    id: 3,
    title: "Women Empowerment",
    targetNumber: 85,
    suffix: "%",
    label: "Self-Reliance Rate",
    image: "hero/banner2.png",
    isUp: true,
  },
  {
    id: 4,
    title: "Agriculture & Climate",
    targetNumber: 120,
    suffix: "K+",
    label: "Trees Planted",
    image: "hero/banner3.png",
    isUp: false,
  },
];

// 1. Single Counter Component
const StatCounter = ({ target, duration = 2000, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

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

// 2. Main Focus Areas Component
const FocusAreas = () => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [focusList, setFocusList] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/focus_areas.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (
          resData.status === "success" &&
          resData.data &&
          resData.data.length > 0
        ) {
          const defaultImages = {
            1: "hero/banner3.png",
            2: "hero/banner1.png",
            3: "hero/banner2.png",
            4: "hero/banner3.png",
          };
          const friendlyTitles = {
            1: "Institution Building",
            2: "Water Resources",
            3: "Agriculture & Livelihood",
            4: "Environment & Forest",
          };
          const formatted = resData.data.map((item, index) => {
            const idVal = parseInt(item.id) || index + 1;
            const targetVal = parseInt(item.number_text) || 0;
            const suffixVal = item.number_text.replace(/[0-9]/g, "");
            return {
              id: idVal,
              title: friendlyTitles[idVal] || "Focus Area",
              targetNumber: targetVal,
              suffix: suffixVal,
              label: item.title,
              image: defaultImages[idVal] || "hero/banner1.png",
              isUp: idVal % 2 !== 0,
            };
          });
          setFocusList(formatted);
        }
      })
      .catch((err) => {
        console.error("Error fetching focus areas:", err);
      });
  }, []);

  const focusData = focusList.length > 0 ? focusList : defaultFocusData;

  return (
    /* 🔥 Background color ko footer se match karne ke liye bg-[#75843a] lagaya aur text white kiya */
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-t from-[#E56D37] to-[#fff] text-white pt-[20px] pb-25 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Top Heading */}
        <div className="text-center mb-24">
          <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest block mb-2">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Our Focus Areas
          </h2>
          <div className="w-24 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        {/* 🌟 MAIN ZIGZAG GRID TIMELINE */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-24 gap-x-8 items-center pt-6">
          {/* SVG Connecting Line - Line stroke ko white kiya contrast ke liye */}
          <div className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-[2px] pointer-events-none z-0">
            <svg
              className="w-full h-32 absolute -top-16 left-0"
              viewBox="0 0 1000 100"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,30 L 333,100 L 666,0 L 1000,70"
                stroke="#2b434d"
                strokeWidth="2"
                strokeDasharray="6,6"
                opacity="0.3"
              />
            </svg>
          </div>

          {focusData.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center relative z-10 transition-all duration-1000 ${
                item.isUp ? "lg:-translate-y-12" : "lg:translate-y-12"
              }`}
            >
              {/* ⚪ THE IMAGE IN CIRCLE */}
              <div className="w-36 h-36 rounded-full p-1 border-1 border-dashed border-[#2b434d] bg-[#2b434d] hover:border-solid hover:border-[#2b434d] hover:scale-130 transition-all duration-300 shadow-lg relative overflow-hidden group cursor-pointer">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* 📝 WORDS BELOW THE CIRCLE */}
              <div className="mt-6 space-y-2 max-w-[200px]">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                {/* 🔥 Stats color aur label text color ab cleanly white hain */}
                <div className="text-2xl font-black text-white flex items-center justify-center tracking-wide">
                  <StatCounter
                    target={item.targetNumber}
                    trigger={hasIntersected}
                  />
                  <span>{item.suffix}</span>
                </div>

                <p className="text-xs font-semibold text-white/75 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
