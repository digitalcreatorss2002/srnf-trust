import React, { useState } from 'react';

const LeadershipGovernance = () => {
  const [activeModal, setActiveModal] = useState(null);

  // 1. Data Structure for each card and its popup details
  const governanceData = {
    founder: {
      id: 'founder',
      title: "Founder's Message",
      subtitle: "A vision for transformation and sustainable growth.",
      // Main card placeholder circle image
      circleImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150", 
      type: 'text-only',
      details: {
        heading: "Message From Our Founder",
        text: "Welcome to our platform. From day one, our mission has been centered around transparency, impactful execution, and empowering professional networks. We strictly maintain our core metrics, such as our team discipline and automated tracking, ensuring that every project we deliver aligns with the highest quality standards. Thank you for being a part of our journey as we scale new heights together."
      }
    },
    board: {
      id: 'board',
      title: "Board of Trustees",
      subtitle: "Guiding our strategic decisions and compliance framework.",
      circleImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
      type: 'members-list',
      details: [
        { name: "Dr. Shivam Khare", role: "Chief Trustee & Medical Advisor", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200" },
        { name: "Ananya Sharma", role: "Financial Operations Trustee", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200" }
      ]
    },
    advisory: {
      id: 'advisory',
      title: "Advisory Committee",
      subtitle: "Industry leaders steering our innovation paths.",
      circleImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
      type: 'members-list',
      details: [
        { name: "Rajesh Mehta", role: "Senior Brand Consultant", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" },
        { name: "Vikram Malhotra", role: "Technical Infrastructure Advisor", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200" }
      ]
    },
    management: {
      id: 'management',
      title: "Management Team",
      subtitle: "Executing operations and managing dynamic workflows.",
      circleImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=150",
      type: 'levels-list',
      details: [
        {
          levelTitle: "Level 1: Executive Leadership",
          members: [
            { name: "Dharmendra Kumar", role: "Web Developer", img: "hero/banner1.png" },
            { name: "Sweety Shrivastava", role: "Sales Associate", img: "hero/banner2.png" }
          ]
        },
        {
          levelTitle: "Level 2: Operations & Delivery",
          members: [
            { name: "Tiya Saini", role: "Head of Operations", img: "hero/banner3.png" },
            { name: "Shashwat Mishra", role: "Technical Project Lead", img: "hero/banner1.png" }
          ]
        }
      ]
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#fff] to-[#E56D37] min-h-screen font-sans py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center relative overflow-hidden">
      
      {/* Page Main Header */}
      <h2 className="text-center font-bold text-3xl md:text-4xl text-[#2c3e50] mb-20 tracking-wide"
          style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}>
        Leadership & Governance
      </h2>

      {/* Grid Container matching image layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 px-4 mt-8">
        {Object.values(governanceData).map((card) => (
          <div 
            key={card.id} 
            onClick={() => setActiveModal(card)}
            className="relative group cursor-pointer"
          >
            {/* Dark/Grey Rounded Card Background with Inset shadow effect */}
            <div className="bg-[#fff] rounded-2xl p-6 pt-16 w-full min-h-[180px] flex flex-col items-center justify-center text-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(0,0,0,0.4)] border border-[#E56D37] transform transition-all duration-300 hover:-translate-y-1">
              
              {/* Increased Size Circle Element Container */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#4a4a4a] rounded-full flex items-center justify-center -mt-12 p-1 shadow-[0_8px_16px_rgba(0,0,0,0.2)] border-2 border-[#E56D37] overflow-hidden z-10">
                <img 
                  src={card.circleImage} 
                  alt={card.title} 
                  className="w-full h-full object-cover rounded-full filter grayscale contrast-125 mix-blend-luminosity group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Card Text Content */}
              <h3 className="text-xl font-bold text-[#E56D37] mb-2 tracking-wide group-hover:text-[#2d2d2d] transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-[#2d2d2d] font-light max-w-sm px-2">
                {card.subtitle}
              </p>
              
              {/* Click indicator */}
              <span className="text-[10px] text-[#000] mt-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                View Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== POPUP MODAL LOGIC ==================== */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          
          {/* Modal Container */}
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Sticky Modal Close Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex justify-between items-center z-20">
              <h3 className="text-2xl font-bold text-neutral-900">{activeModal.title}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-neutral-400 hover:text-neutral-600 text-3xl font-light transition-colors p-1"
              >
                &times;
              </button>
            </div>

            {/* Modal Body Based on Requirements */}
            <div className="p-6 md:p-8">
              
              {/* CONDITION 1: Founder's Message (Text Only) */}
              {activeModal.type === 'text-only' && (
                <div className="prose max-w-none">
                  <h4 className="text-xl font-semibold text-neutral-800 mb-4">{activeModal.details.heading}</h4>
                  <p className="text-neutral-600 text-lg leading-relaxed whitespace-pre-line">
                    {activeModal.details.text}
                  </p>
                </div>
              )}

              {/* CONDITION 2: Board of Trustees & Advisory Committee (Cards Grid Layout) */}
              {activeModal.type === 'members-list' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activeModal.details.map((member, idx) => (
                    <div key={idx} className="flex items-center space-x-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                      <img src={member.img} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200 shadow-sm" />
                      <div>
                        <h4 className="font-bold text-lg text-neutral-800">{member.name}</h4>
                        <p className="text-sm text-neutral-500 font-medium">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CONDITION 3: Management Team (Level Wise Layout) */}
              {activeModal.type === 'levels-list' && (
                <div className="space-y-8">
                  {activeModal.details.map((level, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-md font-bold text-blue-600 uppercase tracking-wider mb-4">
                        {level.levelTitle}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {level.members.map((member, mIdx) => (
                          <div key={mIdx} className="flex items-center space-x-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                            <img src={member.img} alt={member.name} className="w-14 h-14 rounded-full object-cover border border-neutral-200" />
                            <div>
                              <h5 className="font-bold text-neutral-800">{member.name}</h5>
                              <p className="text-xs text-neutral-500">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeadershipGovernance;