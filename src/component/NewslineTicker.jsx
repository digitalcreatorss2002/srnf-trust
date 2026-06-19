import React, { useEffect, useState } from "react";
// Path ko absolute root se or safe single dot traversal se update kiya hai
import { API_BASE_URL } from "../apiConfig"; 

export default function NewslineTicker() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Newsline Text data from public GET endpoint
  useEffect(() => {
    const fetchNewslineFeed = async () => {
      try {
        // Safe backend checker mapping
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

  if (loading || newsData.length === 0) return null;

  // Seamless animation speed multiplier block array setup
  const duplicatedNews = [...newsData, ...newsData, ...newsData, ...newsData];

  return (
    /* 🟢 FIXED: bg-transparent kiya aur border-b hata kar sirf border-t (top) rakha hai */
    <div className="w-full bg-gray-500 text-white border-t border-zinc-800 relative z-20 flex items-center">
      
      {/* 🔄 Scrolling Box Wrapper */}
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
            animation: newsTickerLoop 15s linear infinite;
          }
          /* 🟢 HOVER STOP LOGIC: Hover karte hi ticker slow or freeze frame ho jayega */
          .news-ticker-container:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="news-ticker-container gap-12 md:gap-16">
          {duplicatedNews.map((item, idx) => {
            const hasLink = item.link && item.link.trim() !== "";
            
            return (
              <div 
                key={`news-${item.id || idx}-${idx}`}
                className="inline-flex items-center text-xs md:text-sm font-medium tracking-wide"
              >
                <span className="text-orange-500 font-bold mr-4 md:mr-6 text-sm">✦</span>
                
                {/* 🟢 Click Redirect Handler Node */}
                {hasLink ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-100 hover:text-[#E56D37] font-semibold cursor-pointer transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="text-gray-200 cursor-default select-none">
                    {item.title}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}