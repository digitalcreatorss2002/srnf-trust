import React from "react";

// Infinite Data Array
const partnersData = [
  {
    id: 1,
    name: "Green Tech Corp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/greentech",
  },
  {
    id: 2,
    name: "Global Relief Net",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/reliefnet",
  },
  {
    id: 3,
    name: "Eco Farming Trust",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/ecofarming",
  },
  {
    id: 4,
    name: "Apex Learning Ltd",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/apexlearning",
  },
  {
    id: 5,
    name: "Pure Water Alliance",
    logo: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/purewater",
  },
  {
    id: 6,
    name: "Nurture Child Care",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/nurturechild",
  },
  {
    id: 7,
    name: "Weave Heritage Foundation",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/weaveheritage",
  },
  {
    id: 8,
    name: "Climate Action Fund",
    logo: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&h=300&fit=crop",
    link: "https://example.com/climateaction",
  }
];

const PartnersSection = () => {
  return (
    <section className="w-full bg-[#75843a] py-14 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* 🎯 Centered Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Our Partners & Supporters
          </h2>
          <div className="w-20 h-1 bg-[#fff] mt-3 rounded-full mx-auto" />
        </div>

        {/* 📦 4xUNLIMITED DYNAMIC GRID SYSTEM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partnersData.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl relative flex flex-col h-64"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
              }}
            >
              {/* 🌟 Background Premium Aura Glow on Hover */}
              <div className="absolute inset-0 bg-[#75843a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              {/* 🖼️ PARTNER LOGO BLOCK (Takes exact 100% of its area via object-cover) */}
              <div className="w-full flex-grow bg-gray-100 overflow-hidden relative">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out block"
                />
              </div>

              {/* 📝 TEXT INFORMATION AREA (Centered Heading at the bottom edge) */}
              <div className="p-4 text-center bg-white border-t border-gray-50 relative z-20 w-full">
                <h4 className="text-sm font-bold text-gray-700 group-hover:text-[#75843a] tracking-tight transition-colors duration-300 text-center w-full block">
                  {partner.name}
                </h4>
              </div>

              {/* Floating Action Arrow */}
              <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-[#75843a] text-[10px] font-bold transform translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;