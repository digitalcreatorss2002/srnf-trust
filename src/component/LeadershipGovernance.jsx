import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const LeadershipGovernance = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeSubMemberModal, setActiveSubMemberModal] = useState(null);
  const [governanceList, setGovernanceList] = useState(null);
  const [loading, setLoading] = useState(true);

  const [flippedCardKey, setFlippedCardKey] = useState(null);

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
                  name: firstMember ? firstMember.name : "Founder Director",
                  role: firstMember ? firstMember.role : "Founder Director",
                  img:
                    firstMember && firstMember.image_url
                      ? getImageUrl(firstMember.image_url)
                      : staticLogos.founder,
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

  useEffect(() => {
    setFlippedCardKey(null);
  }, [activeModal]);

  const handleCardFlipToggle = (e, cardKey) => {
    e.stopPropagation();
    setFlippedCardKey((prevKey) => (prevKey === cardKey ? null : cardKey));
  };

  const openSubMemberModal = (e, member) => {
    e.stopPropagation();
    setActiveSubMemberModal(member);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-bold text-lg">
        Loading Leadership & Governance...
      </div>
    );
  }

  return (
    <section
      id="leadership"
      className="bg-gradient-to-b from-[#fff] to-[#006D5B] min-h-screen font-sans py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center relative overflow-hidden"
    >
      <h2
        className="text-center font-bold text-3xl md:text-4xl text-[#2c3e50] mb-20 tracking-wide"
        style={{ textShadow: "1px 1px 2px rgba(255, 255, 255, 0.6)" }}
      >
        Leadership & Governance
      </h2>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 px-4 mt-8">
        {governanceList &&
          Object.values(governanceList).map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveModal(card)}
              className="relative group cursor-pointer"
            >
              <div className="bg-[#fff] rounded-2xl p-6 pt-16 w-full min-h-[180px] flex flex-col items-center justify-center text-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border border-[#006D5B] transform transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full flex items-center justify-center -mt-14 shadow-[0_8px_16px_rgba(0,0,0,0.2)] border-2 border-[#006D5B] bg-white overflow-hidden z-10">
                  <img
                    src={card.circleImage}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-full transition-all duration-300 transform scale-110 group-hover:scale-115"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>

                <h3 className="text-xl font-bold text-[#006D5B] mb-2 tracking-wide group-hover:text-[#2d2d2d] transition-colors heading-title">
                  {card.title}
                </h3>
                <p className="text-sm text-[#2d2d2d] font-light max-w-sm px-2 heading-font">
                  {card.subtitle}
                </p>

                <span className="text-[10px] text-[#000] mt-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details &rarr;
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* PRIMARY CATEGORY MODAL DIALOG DISPLAY */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-neutral-200">
            
            {/* Header Sticky Only for Members List / Levels List view */}
            {activeModal.type !== "text-only" && (
              <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex justify-between items-center z-30">
                <h3 className="text-2xl font-bold text-neutral-900">
                  {activeModal.title}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-neutral-400 hover:text-neutral-600 text-3xl font-light transition-colors p-1 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            )}

            <div className={`${activeModal.type === "text-only" ? "p-0" : "p-6 md:p-8"}`}>
              
              {/* FOUNDER MODAL - IMPLEMENTED LIKE THE REFERENCE IMAGE DESIGN */}
              {activeModal.type === "text-only" && activeModal.details && (
                <div className="flex flex-col md:flex-row w-full min-h-[500px] relative bg-neutral-50 rounded-3xl overflow-hidden">
                  
                  {/* Floating Absolute Close Button specific to modern Founder's Layout */}
                  <button
                    onClick={() => setActiveModal(null)}
                    className="absolute top-4 right-5 text-neutral-400 hover:text-neutral-700 text-3xl font-light transition-colors z-40 cursor-pointer p-1"
                  >
                    &times;
                  </button>

                  {/* Left Column Panel: Branding Titles, Core Message, and Custom Credentials (55% Share Ratio) */}
                  <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="mb-6">
                      <p className="text-xs font-bold text-[#006D5B] tracking-widest uppercase mb-1">Welcome Note</p>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-none">
                        {activeModal.title}
                      </h3>
                      {/* <div className="w-16 h-1 bg-orange-500 rounded-full mt-3" /> */}
                    </div>

                    <div className="text-neutral-600 text-justify text-sm md:text-base leading-relaxed space-y-4 max-h-[280px] overflow-y-auto pr-3 custom-scrollbar font-light whitespace-pre-line">
                      {activeModal.details.text}
                    </div>

                    {/* Footer Custom Signatory Block directly derived from image pattern */}
                    <div className="mt-8 pt-4 border-t border-neutral-100 flex flex-col items-start">
                      {/* <p className="font-bold text-lg text-neutral-900 leading-tight">
                        — {activeModal.details.name !== "Founder Director" ? activeModal.details.name : "Dr. Shardindu Upadhyay"}
                      </p> */}
                      {/* <p className="text-xs text-[#006D5B] font-semibold uppercase tracking-wider mt-1">
                        {activeModal.details.role}
                      </p> */}
                    </div>
                  </div>

                  {/* Right Column Panel: Dynamic Shape Architecture & Image Frame (45% Share Ratio) */}
                  <div className="w-full md:w-[45%] min-h-[320px] md:min-h-full relative bg-gradient-to-br from-neutral-100 via-neutral-50 to-orange-50/40 flex items-end justify-center overflow-hidden">
                    
                    {/* Visual Architectural Shapes on background mimicking the template layer */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#006D5B]/5 rounded-bl-[100px] z-0 pointer-events-none" />
                    <div className="absolute bottom-12 left-6 w-16 h-16 bg-orange-200/20 rounded-full z-0 pointer-events-none" />

                    {/* Main Curved Profile Display */}
                    <div className="w-[85%] h-[90%] relative z-10 flex items-end justify-center">
                      <div className="w-full h-full rounded-t-[160px] md:rounded-t-[200px] overflow-hidden border-b-0 border-4 border-[#006D5B] shadow-[0_-10px_35px_rgba(0,109,91,0.15)] bg-white">
                        <img
                          src={activeModal.details.img}
                          alt={activeModal.details.name}
                          className="w-full h-full object-cover object-top transform scale-105 hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x500";
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* MEMBERS-LIST (Board & Advisory) VIEW */}
              {activeModal.type === "members-list" &&
                Array.isArray(activeModal.details) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 justify-items-center max-w-5xl mx-auto py-6">
                    {activeModal.details.map((member, idx) => {
                      const cardKey = `member-${idx}`;
                      const isFlipped = flippedCardKey === cardKey;
                      return (
                        <div
                          key={idx}
                          onClick={(e) => handleCardFlipToggle(e, cardKey)}
                          className="w-80 h-[400px] relative group [perspective:1000px] cursor-pointer"
                        >
                          <div
                            className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] relative ${
                              isFlipped
                                ? "[transform:rotateY(180deg)]"
                                : "lg:group-hover:[transform:rotateY(180deg)]"
                            }`}
                          >
                            {/* Front Side */}
                            <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-start p-6 [backface-visibility:hidden] z-10 border border-gray-200 shadow-md">
                              <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-[#006D5B] shadow-sm flex-shrink-0">
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
                              <h4 className="font-bold text-xl text-neutral-800 text-center leading-snug mt-6 line-clamp-2 px-2">
                                {member.name}
                              </h4>
                              <p className="text-xs text-[#006D5B] font-bold uppercase tracking-wider text-center mt-2 px-2">
                                {member.role}
                              </p>
                            </div>
                            {/* Back Side */}
                            <div className="absolute inset-0 bg-white rounded-2xl p-6 border border-[#006D5B] shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-between z-20">
                              <div className="w-full text-center flex flex-col items-center">
                                <h4 className="font-bold text-xl text-neutral-800 border-b border-orange-100 pb-2 mb-3 w-full">
                                  {member.name}
                                </h4>
                                <p className="text-sm text-gray-500 font-medium italic line-clamp-6 leading-relaxed mt-2">
                                  {member.message ||
                                    "Dedicated to the development and success of our initiatives."}
                                </p>
                              </div>
                              <button
                                onClick={(e) => openSubMemberModal(e, member)}
                                className="w-full bg-[#006D5B] hover:bg-[#237586] text-xs font-extrabold py-2.5 px-4 rounded-full transition-colors cursor-pointer shadow-sm active:scale-95 mt-4"
                              >
                                Read Full Bio &rarr;
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              {/* LEVELS-LIST (Management Team) VIEW */}
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
                          {level.members.map((member, mIdx) => {
                            const cardKey = `level-${idx}-member-${mIdx}`;
                            const isFlipped = flippedCardKey === cardKey;
                            return (
                              <div
                                key={mIdx}
                                onClick={(e) =>
                                  handleCardFlipToggle(e, cardKey)
                                }
                                className="w-56 h-72 relative group [perspective:1000px] cursor-pointer"
                              >
                                <div
                                  className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] relative ${
                                    isFlipped
                                      ? "[transform:rotateY(180deg)]"
                                      : "lg:group-hover:[transform:rotateY(180deg)]"
                                  }`}
                                >
                                  <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-start p-4 [backface-visibility:hidden] z-10 border border-gray-200 shadow-md">
                                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#006D5B] shadow-sm flex-shrink-0">
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
                                    <h4 className="font-bold text-base text-neutral-800 text-center leading-snug mt-3 line-clamp-2">
                                      {member.name}
                                    </h4>
                                    <p className="text-[11px] text-[#006D5B] font-bold uppercase tracking-wider text-center mt-1">
                                      {member.role}
                                    </p>
                                  </div>
                                  <div className="absolute inset-0 bg-white rounded-2xl p-4 border border-[#006D5B] shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-between z-20">
                                    <div className="w-full text-center flex flex-col items-center">
                                      <h4 className="font-bold text-base text-neutral-800 border-b border-orange-100 pb-1 mb-2 w-full">
                                        {member.name}
                                      </h4>
                                      <p className="text-[11px] text-gray-500 font-medium italic line-clamp-5 leading-relaxed">
                                        {member.message ||
                                          "Executing operations and managing dynamic workflows."}
                                      </p>
                                    </div>
                                    <button
                                      onClick={(e) =>
                                        openSubMemberModal(e, member)
                                      }
                                      className="w-full bg-[#006D5B] hover:bg-[#237586] text-white text-[11px] font-extrabold py-1.5 px-3 rounded-full transition-colors cursor-pointer shadow-sm active:scale-95"
                                    >
                                      Read Full Bio &rarr;
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* SECONDARY DETAILED SUB-MEMBER MODAL DIALOG */}
      {activeSubMemberModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative border border-neutral-100 flex flex-col md:flex-row min-h-[350px]">
            <button
              onClick={() => setActiveSubMemberModal(null)}
              className="absolute top-3 right-4 text-neutral-400 hover:text-neutral-700 text-3xl font-light transition-colors z-50 cursor-pointer p-1"
            >
              &times;
            </button>

            <div className="w-full md:w-[40%] bg-neutral-50 border-r border-neutral-100 flex items-center justify-center p-6 bg-gradient-to-br from-orange-50/30 to-white">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#006D5B] shadow-md aspect-square">
                <img
                  src={activeSubMemberModal.img}
                  alt={activeSubMemberModal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/200";
                  }}
                />
              </div>
            </div>

            <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-start">
              <div className="mb-4">
                <h4 className="text-2xl font-bold text-neutral-900 leading-tight">
                  {activeSubMemberModal.name}
                </h4>
                <p className="text-xs md:text-sm text-[#006D5B] font-bold uppercase tracking-widest mt-1">
                  {activeSubMemberModal.role}
                </p>
                <div className="w-16 h-0.5 bg-orange-200 mt-2.5 rounded-full" />
              </div>

              <div className="flex-grow overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                <p className="text-neutral-600 text-justify text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                  {activeSubMemberModal.message ||
                    "Dedicated to executing strategies, overseeing development."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeadershipGovernance;