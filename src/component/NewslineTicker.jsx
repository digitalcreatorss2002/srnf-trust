import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig"; 

export default function NewslineTicker() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewslineFeed = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/newsline.php?t=${Date.now()}`);
        const resData = await response.json();
        
        if (resData.status === "success" && Array.isArray(resData.data)) {
          setNewsData(resData.data);
        }
      } catch (error) {
        console.error("Error loading newsline feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewslineFeed();
  }, []);

  const parseTargetSlug = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleNewsClick = (routeType, targetSlug) => {
    if (!targetSlug || !routeType) return;
    
    const activeSlug = parseTargetSlug(targetSlug);
    let targetPath = "/";

    if (routeType === "programs") {
      targetPath = `/programs?filter=${activeSlug}`; 
    } else if (routeType === "projects") {
      targetPath = `/projectdetails/${activeSlug}`; 
    }

    window.location.href = targetPath;
  };

  if (loading || newsData.length === 0) return null;

  const duplicatedNews = [...newsData, ...newsData, ...newsData, ...newsData];

  return (
    <div className="w-full bg-[#006D5B] text-gray-800 border-t border-zinc-200 relative z-20 flex items-center">
      
      <div className="overflow-hidden w-full relative py-2">
        <style>{`
          @keyframes newsTickerLoop {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .news-ticker-container {
            display: flex;
            white-space: nowrap;
            width: max-content;
            animation: newsTickerLoop 10s linear infinite;
          }
          .news-ticker-container:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="news-ticker-container gap-12 md:gap-16">
          {duplicatedNews.map((item, idx) => (
            <div 
              key={`news-${item.id || idx}-${idx}`}
              className="inline-flex items-center text-xs md:text-sm font-semibold tracking-wide"
            >
              <span className="text-[#fff] font-bold mr-4 md:mr-6 text-sm">✦</span>
              
              <span 
                onClick={() => handleNewsClick(item.route_type, item.target_slug)}
                className="cursor-pointer select-none text-[#fff] hover:text-[#fff] transition-colors duration-200"
                title={`View ${item.route_type} details`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}