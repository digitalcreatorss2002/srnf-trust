import React, { useState, useEffect } from "react";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const defaultPartners = [
  {
    id: 1,
    name: "Green Tech Corp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/greentech",
  },
];

const PartnersSection = () => {
  const [partnersList, setPartnersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/partners.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && Array.isArray(resData.data)) {
          const formatted = resData.data.map((partner) => {
            const finalLogo = getImageUrl(partner.image_url);
            return {
              id: partner.id,
              name: partner.title,
              logo: finalLogo,
              link: partner.link,
            };
          });
          setPartnersList(formatted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching partners dynamic entries:", err);
        setLoading(false);
      });
  }, []);

  const partnersData = partnersList.length > 0 ? partnersList : defaultPartners;

  if (loading) {
    return (
      <div className="w-full py-14 text-center text-gray-600 font-bold">
        Loading Supporters...
      </div>
    );
  }

  return (
    <section 
      id="partners"
      className="w-full bg-gradient-to-b from-[#E56D37] to-[#fff] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-[#fff] uppercase tracking-widest block mb-2 heading-font">
            Partners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight heading-font">
            Our Supporters
          </h2>
          <div className="w-20 h-1 bg-[#fff] mt-3 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
          {partnersData.map((partner) => (
            <a
              key={partner.id}
              href={partner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-32 h-32 relative [perspective:1000px]"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                <div className="absolute inset-0 w-full h-full bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-md [backface-visibility:hidden] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center rounded-full bg-white overflow-hidden p-5">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 w-full h-full bg-white rounded-full flex flex-col items-center justify-center p-3 border border-gray-100 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] text-center">
                  <h4 className="text-[11px] font-bold text-[#E56D37] tracking-tight line-clamp-2 px-1 leading-tight">
                    {partner.name}
                  </h4>
                  {partner.link && (
                    <span className="mt-1 text-[#75843a] text-[9px] font-semibold">
                      Visit ↗
                    </span>
                  )}
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;