import React, { useState, useEffect } from "react";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const LeadershipGovernance = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [governanceList, setGovernanceList] = useState(null);
  const [loading, setLoading] = useState(true);

  const staticLogos = {
    founder: "/icons/founder.png",
    board: "/icons/boardDirector.png",
    advisory: "/icons/community.png",
    management: "/icons/team.png",
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/leadership.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (
          resData.status === "success" &&
          resData.data &&
          resData.data.length > 0
        ) {
          const sections = resData.data;
          const mappedData = {};

          sections.forEach((sec) => {
            const titleLower = sec.title.toLowerCase();

            if (titleLower.includes("founder")) {
              const firstMember = sec.members[0];
              mappedData.founder = {
                id: "founder",
                title: sec.title,
                subtitle:
                  sec.description ||
                  "A vision for transformation and sustainable growth.",
                circleImage: staticLogos.founder,
                type: "text-only",
                details: {
                  heading: "Message From Our Founder",
                  text: firstMember
                    ? firstMember.content
                    : sec.description || "",
                },
              };
            } else if (titleLower.includes("board")) {
              mappedData.board = {
                id: "board",
                title: sec.title,
                subtitle:
                  sec.description ||
                  "Guiding our strategic decisions and compliance framework.",
                circleImage: staticLogos.board,
                type: "members-list",
                details: sec.members.map((m) => ({
                  name: m.name,
                  role: m.role,
                  message: m.content || "",
                  img:
                    getImageUrl(m.image_url) ||
                    "https://via.placeholder.com/150",
                })),
              };
            } else if (titleLower.includes("advisory")) {
              mappedData.advisory = {
                id: "advisory",
                title: sec.title,
                subtitle:
                  sec.description ||
                  "Industry leaders steering our innovation paths.",
                circleImage: staticLogos.advisory,
                type: "members-list",
                details: sec.members.map((m) => ({
                  name: m.name,
                  role: m.role,
                  message: m.content || "",
                  img:
                    getImageUrl(m.image_url) ||
                    "https://via.placeholder.com/150",
                })),
              };
            } else if (
              titleLower.includes("management") ||
              titleLower.includes("team")
            ) {
              const levelsMap = {
                M1: {
                  levelTitle: "Level 1: Executive Leadership",
                  members: [],
                },
                M2: {
                  levelTitle: "Level 2: Operations & Delivery",
                  members: [],
                },
                M3: {
                  levelTitle: "Level 3: Administration & Support",
                  members: [],
                },
                General: { levelTitle: "General Management", members: [] },
              };

              sec.members.forEach((m) => {
                const levelKey = m.staff_level || "General";
                if (levelsMap[levelKey]) {
                  levelsMap[levelKey].members.push({
                    name: m.name,
                    role: m.role,
                    message: m.content || "",
                    img:
                      getImageUrl(m.image_url) ||
                      "https://via.placeholder.com/150",
                  });
                }
              });

              const details = Object.values(levelsMap).filter(
                (lvl) => lvl.members.length > 0,
              );

              mappedData.management = {
                id: "management",
                title: sec.title,
                subtitle:
                  sec.description ||
                  "Executing operations and managing dynamic workflows.",
                circleImage: staticLogos.management,
                type: "levels-list",
                details: details,
              };
            }
          });

          setGovernanceList(mappedData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leadership:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-bold text-lg">
        Loading Leadership & Governance...
      </div>
    );
  }

  if (!governanceList || Object.keys(governanceList).length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-lg">
        No records found.
      </div>
    );
  }

  return (
    <section id="leadership" className="bg-gradient-to-b from-[#fff] to-[#E56D37] min-h-screen font-sans py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center relative overflow-hidden">
      <h2
        className="text-center font-bold text-3xl md:text-4xl text-[#2c3e50] mb-20 tracking-wide"
        style={{ textShadow: "1px 1px 2px rgba(255, 255, 255, 0.6)" }}
      >
        Leadership & Governance
      </h2>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 px-4 mt-8">
        {Object.values(governanceList).map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveModal(card)}
            className="relative group cursor-pointer"
          >
            <div className="bg-[#fff] rounded-2xl p-6 pt-16 w-full min-h-[180px] flex flex-col items-center justify-center text-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border border-[#E56D37] transform transition-all duration-300 hover:-translate-y-1">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full flex items-center justify-center -mt-14 shadow-[0_8px_16px_rgba(0,0,0,0.2)] border-2 border-[#E56D37] bg-white overflow-hidden z-10">
                <img
                  src={card.circleImage}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-full transition-all duration-300 transform scale-110 group-hover:scale-115"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>

              <h3 className="text-xl font-bold text-[#E56D37] mb-2 tracking-wide group-hover:text-[#2d2d2d] transition-colors heading-title">
                {card.title}
              </h3>
              <p className="text-sm text-[#2d2d2d] font-light max-w-sm px-2 heading-font">
                {card.subtitle}
              </p>

              <span className="text-[10px] text-[#000] mt-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                View Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto shadow-2xl relative border border-neutral-200">
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex justify-between items-center z-30">
              <h3 className="text-2xl font-bold text-neutral-900">
                {activeModal.title}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-neutral-400 hover:text-neutral-600 text-3xl font-light transition-colors p-1"
              >
                &times;
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeModal.type === "text-only" && activeModal.details && (
                <div className="prose max-w-none">
                  <h4 className="text-xl font-semibold text-neutral-800 mb-4">
                    {activeModal.details.heading}
                  </h4>
                  <p className="text-neutral-600 text-justify text-lg leading-relaxed whitespace-pre-line">
                    {activeModal.details.text}
                  </p>
                </div>
              )}

              {activeModal.type === "members-list" &&
                Array.isArray(activeModal.details) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {activeModal.details.map((member, idx) => (
                      <div
                        key={idx}
                        className="w-56 h-70 relative group [perspective:1000px]"
                      >
                        <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative">
                          <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-start p-4 [backface-visibility:hidden] z-10 border border-gray-200 shadow-md">
                            <div className="w-45 h-45 rounded-full overflow-hidden border-4 border-[#E56D37] shadow-sm flex-shrink-0">
                              <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/150";
                                }}
                              />
                            </div>
                            <h4 className="font-bold text-1xl text-neutral-800 text-center leading-snug mt-3 line-clamp-2">
                              {member.name}
                            </h4>
                            <p className="text-[11px] text-[#E56D37] font-bold uppercase tracking-wider text-center mt-1">
                              {member.role}
                            </p>
                          </div>
                          <div className="absolute inset-0 bg-white rounded-2xl p-4 border border-[#E56D37] shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center z-20">
                            <h4 className="font-bold text-1xl text-neutral-800 border-b border-orange-100 pb-1 mb-2 text-center w-full">
                              {member.name}
                            </h4>
                            {member.message ? (
                              <p className="text-[16px] text-gray-600 font-medium italic overflow-y-auto max-h-[170px] px-1 custom-scrollbar text-center leading-relaxed">
                                {member.message}
                              </p>
                            ) : (
                              <p className="text-[12px] text-gray-400 italic text-center">
                                Dedicated to the development and success of our initiatives.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {activeModal.type === "levels-list" &&
                Array.isArray(activeModal.details) && (
                  <div className="space-y-12">
                    {activeModal.details.map((level, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-orange-500 pl-4"
                      >
                        <h4 className="text-md font-bold text-orange-600 uppercase tracking-wider mb-6">
                          {level.levelTitle}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                          {level.members.map((member, mIdx) => (
                            <div
                              key={mIdx}
                              className="w-56 h-80 relative group [perspective:1000px]"
                            >
                              <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative">
                                <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-center p-4 [backface-visibility:hidden] z-10 border border-gray-200 shadow-md">
                                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#E56D37] shadow-sm flex-shrink-0">
                                    <img
                                      src={member.img}
                                      alt={member.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "https://via.placeholder.com/150";
                                      }}
                                    />
                                  </div>
                                  <h4 className="font-bold text-base text-neutral-800 text-center leading-snug mt-4 line-clamp-2">
                                    {member.name}
                                  </h4>
                                  <p className="text-[11px] text-[#E56D37] font-bold uppercase tracking-wider text-center mt-1">
                                    {member.role}
                                  </p>
                                </div>
                                <div className="absolute inset-0 bg-white rounded-2xl p-4 border border-[#E56D37] shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center z-20">
                                  <h4 className="font-bold text-sm text-neutral-800 border-b border-orange-100 pb-1 mb-2 text-center w-full">
                                    {member.name}
                                  </h4>
                                  {member.message ? (
                                    <p className="text-[12px] text-gray-600 font-medium italic overflow-y-auto max-h-[170px] px-1 custom-scrollbar text-center leading-relaxed">
                                      "{member.message}"
                                    </p>
                                  ) : (
                                    <p className="text-[12px] text-gray-400 italic text-center">
                                      Executing operations and managing dynamic workflows.
                                    </p>
                                  )}
                                </div>
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