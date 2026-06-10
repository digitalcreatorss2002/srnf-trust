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
          // Database schema fields map logic
          // PartnersSection.jsx - Inside your useEffect fetch mapper block
          const formatted = resData.data.map((partner) => {
            // Safe condition check to join image_url with your exact admin domain folder URL structure
            const finalLogo = getImageUrl(partner.image_url);

            return {
              id: partner.id,
              name: partner.title,
              logo: finalLogo, // Dynamically parsing clean images links directly to the grid view
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
    <section className="w-full bg-gradient-to-b from-[#E56D37] to-[#fff] py-14 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-sm font-bold text-[#fff] uppercase tracking-widest block mb-2">
            Partners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Our Supporters
          </h2>
          <div className="w-20 h-1 bg-[#fff] mt-3 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partnersData.map((partner) => (
            <a
              key={partner.id}
              href={partner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl relative flex flex-col h-64"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)" }}
            >
              <div className="absolute inset-0 bg-[#75843a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="w-full flex-grow bg-white overflow-hidden relative p-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out block"
                />
              </div>

              <div className="p-4 text-center bg-white border-t border-gray-50 relative z-20 w-full">
                <h4 className="text-sm font-bold text-[#E56D37] group-hover:text-[#2d3748] tracking-tight transition-colors duration-300 text-center w-full block truncate">
                  {partner.name}
                </h4>
              </div>

              {partner.link && (
                <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-[#75843a] text-[10px] font-bold transform translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                  ↗
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
