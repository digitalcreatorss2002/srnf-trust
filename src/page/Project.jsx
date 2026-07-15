import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const isVideoFile = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0];
  return /\.(mp4|webm|ogg)$/i.test(cleanUrl);
};

const Projects = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects.php?all=true`);
        const result = await response.json();
        
        if (result) {
          if (Array.isArray(result)) {
            setProjectsList(result);
          } else if (result.status === "success" && Array.isArray(result.data)) {
            setProjectsList(result.data);
          } else if (result.data && Array.isArray(result.data)) {
            setProjectsList(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching projects from server endpoint:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const formatTabLabel = (label) => {
    if (!label) return "";
    return label.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  useEffect(() => {
    if (location.hash) {
      const tab = decodeURIComponent(location.hash.replace("#", "")).trim().toLowerCase();
      if (["all", "completed", "planned"].includes(tab)) {
        setActiveTab(tab);
      } else {
        setActiveTab("all");
      }
    } else {
      setActiveTab("all");
    }
    
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.hash]);

  // Central handler to auto scroll to top on any sidebar layout interactions
  const handleTabSelection = (type, value) => {
    if (type === "status") {
      window.location.hash = value; 
    } else if (type === "category") {
      setSelectedCategory(value);
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

  const displayProjects = projectsList.filter((p) => {
    const projectStatus = p.status ? p.status.trim().toLowerCase() : "";
    
    let matchesTab = false;
    if (activeTab === "all") {
      matchesTab = projectStatus === "active" || projectStatus === "ongoing" || projectStatus === "";
    } else if (activeTab === "completed") {
      matchesTab = projectStatus === "completed";
    } else if (activeTab === "planned") {
      matchesTab = projectStatus === "planned";
    }

    const matchesCategory = selectedCategory 
      ? p.category?.trim().toLowerCase() === selectedCategory.toLowerCase() 
      : true;

    return matchesTab && matchesCategory;
  });

  const currentTabProjects = projectsList.filter((p) => {
    const projectStatus = p.status ? p.status.trim().toLowerCase() : "";
    if (activeTab === "all") return projectStatus === "active" || projectStatus === "ongoing" || projectStatus === "";
    if (activeTab === "completed") return projectStatus === "completed";
    if (activeTab === "planned") return projectStatus === "planned";
    return false;
  });

  const uniqueCategories = [
    ...new Set(currentTabProjects.map((p) => p.category?.trim()).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="w-full py-32 text-center bg-white text-gray-500 font-bold tracking-wider">
        Loading Projects Matrix View...
      </div>
    );
  }

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      
      {/* Banner Section */}
      <section id="ongoing" className="bg-[#006D5B] text-white py-16 relative overflow-hidden scroll-mt-24 mb-4 lg:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-font">
            {activeTab === "completed" ? "Completed Projects" : activeTab === "planned" ? "Planned Projects" : "Ongoing Projects"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-50 body-font">
            {activeTab === "completed" 
              ? "Take a look at our successfully delivered programs and sustained institutional milestones." 
              : activeTab === "planned" 
              ? "Explore upcoming strategies, planned programs, and future field operations." 
              : "Discover our active interventions and on-ground activities across various geographies."}
          </p>
        </div>
      </section>

      {/* Main Container - Split into Sidebar (20%) and Content Grid (80%) */}
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: FIXED mobile sticky layout support update applied */}
          <aside className="lg:col-span-2 sticky top-[76px] lg:top-50 bg-white p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 lg:gap-4 z-30 w-full overflow-hidden">
            
            {/* Project Status Filters */}
            <div>
              <h2 className="text-xs lg:text-lg font-bold text-[#212121] uppercase tracking-widest px-2 mb-1 lg:mb-2 heading-font">
                Project Status
              </h2>
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1.5 pb-1 lg:pb-0 scroll-smooth snap-x">
                <button
                  type="button"
                  onClick={() => handleTabSelection("status", "all")}
                  className={`text-left px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl text-xs lg:text-md font-bold whitespace-nowrap transition-all flex items-center justify-between cursor-pointer snap-center ${
                    activeTab === "all" ? "bg-[#006D5B] text-white shadow-md lg:translate-x-1" : "text-gray-600 bg-gray-50 lg:bg-transparent hover:bg-orange-50/40 hover:text-[#006D5B]"
                  }`}
                >
                  <span className="heading-font">Ongoing</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSelection("status", "completed")}
                  className={`text-left px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl text-xs lg:text-md font-bold whitespace-nowrap transition-all flex items-center justify-between cursor-pointer snap-center ${
                    activeTab === "completed" ? "bg-[#006D5B] text-white shadow-md lg:translate-x-1" : "text-gray-600 bg-gray-50 lg:bg-transparent hover:bg-orange-50/40 hover:text-[#006D5B]"
                  }`}
                >
                  <span className="heading-font">Completed</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSelection("status", "planned")}
                  className={`text-left px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl text-xs lg:text-md font-bold whitespace-nowrap transition-all flex items-center justify-between cursor-pointer snap-center ${
                    activeTab === "planned" ? "bg-[#006D5B] text-white shadow-md lg:translate-x-1" : "text-gray-600 bg-gray-50 lg:bg-transparent hover:bg-orange-50/40 hover:text-[#006D5B]"
                  }`}
                >
                  <span className="heading-font">Planned</span>
                </button>
              </div>
            </div>

            {/* Sub-Sector Filter Categories inside Sidebar */}
            {uniqueCategories.length > 0 && (
              <div className="border-t pt-3 lg:pt-4 border-gray-100">
                <div className="flex items-center justify-between px-2 mb-1.5 lg:mb-2">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest heading-font">
                    Sectors
                  </h2>
                  {selectedCategory && (
                    <button 
                      onClick={() => handleTabSelection("category", null)} 
                      className="text-[10px] font-bold text-[#006D5B] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1.5 pb-1 lg:pb-0 scroll-smooth snap-x">
                  {uniqueCategories.map(cat => {
                    const isCatSelected = selectedCategory === cat;
                    return (
                      <button 
                        type="button" 
                        key={cat} 
                        onClick={() => handleTabSelection("category", isCatSelected ? null : cat)} 
                        className={`text-left px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl text-xs font-bold transition-all border cursor-pointer snap-center whitespace-nowrap lg:whitespace-normal ${
                          isCatSelected 
                            ? "bg-orange-50 border-[#006D5B] text-[#006D5B]" 
                            : "bg-white border-gray-100 text-gray-600 hover:border-gray-200"
                        }`}
                      >
                        {formatTabLabel(cat)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT SIDE: 80% Width Layout Project Grid Content (lg:col-span-8) */}
          <main className="lg:col-span-8 w-full mt-4 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayProjects.length === 0 ? (
                <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm font-medium">
                  No projects found for this selection.
                </div>
              ) : (
                displayProjects.map((project) => {
                  const resolvedUrl = typeof getImageUrl === "function" ? getImageUrl(project.image_url) : project.image_url;
                  const isVideo = isVideoFile(resolvedUrl);
                  
                  return (
                    <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow group">
                      
                      {/* Media container element */}
                      <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-lg bg-gray-50 relative">
                        {isVideo ? (
                          <video src={resolvedUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                        ) : (
                          <img src={resolvedUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=No+Image"; }} />
                        )}
                      </div>

                      {/* Info & Text Wrapper element */}
                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="text-[9px] font-bold text-[#006D5B] uppercase tracking-widest heading-font">{project.category}</div>
                            <span className={`text-[8px] uppercase font-bold heading-font px-2 py-0.5 rounded ${project.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' : project.status?.toLowerCase() === 'planned' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-700'}`}>
                              {project.status || 'Active'}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-800 mb-1.5 leading-snug heading-font text-left group-hover:text-[#006D5B] transition-colors line-clamp-1">{project.title}</h3>
                          <p className="text-gray-600 body-font text-xs text-left mb-3 line-clamp-3 leading-relaxed">{project.description}</p>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3.5">
                            <span className="text-sm">📍</span> {project.location || "N/A"}
                          </div>
                          <Link to={`/projectdetails/${project.slug}`} className="inline-block heading-font bg-gray-800 hover:bg-[#006D5B] text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors text-center shadow-sm w-full sm:w-auto cursor-pointer">
                            View Details
                          </Link>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </main>

        </div>
      </div>

    </div>
  );
};

export default Projects;
