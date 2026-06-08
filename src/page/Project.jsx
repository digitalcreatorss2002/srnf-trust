import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

// Video Checker Helper
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

  // Fetch projects from backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects.php`);
        const result = await response.json();
        if (result.status === "success") {
          setProjectsList(result.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Helper formatting utility
  const formatTabLabel = (label) => {
    return label.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // 🔥 2. EXTRACT DYNAMIC UNIQUE CATEGORIES FROM LIST
  const uniqueCategories = [
    ...new Set(projectsList.map((p) => p.category?.trim()).filter(Boolean)),
  ];

  // Handle URL Hash sync (Removed "listings" condition)
  useEffect(() => {
    if (location.hash) {
      const tab = decodeURIComponent(location.hash.replace("#", ""));
      if (["all", "completed", "planned"].includes(tab)) {
        setActiveTab(tab);
      } else {
        setActiveTab("all");
      }
    } else {
      setActiveTab("all");
    }
  }, [location.hash]);

  // Horizontal Tab scroll helpers
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 300;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // 🔥 3. SIMPLIFIED TAB FILTERING LOGIC
  let displayProjects = [];
  if (activeTab === "all") {
      displayProjects = projectsList.filter((p) => p.status?.toLowerCase() === 'active' || p.status?.toLowerCase() === 'ongoing');
      if (selectedCategory) {
          displayProjects = displayProjects.filter((p) => p.category?.trim() === selectedCategory);
      }
  } else if (activeTab === "completed") {
      displayProjects = projectsList.filter((p) => p.status?.toLowerCase() === 'completed');
      if (selectedCategory) {
          displayProjects = displayProjects.filter((p) => p.category?.trim() === selectedCategory);
      }
  } else if (activeTab === "planned") {
      displayProjects = projectsList.filter((p) => p.status?.toLowerCase() === 'planned');
      if (selectedCategory) {
          displayProjects = displayProjects.filter((p) => p.category?.trim() === selectedCategory);
      }
  }

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      
      {/* HEADER HERO VIEW */}
      <section id="ongoing" className="bg-accent text-white py-20 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {activeTab === "completed" ? "Completed Projects" : activeTab === "planned" ? "Planned Projects" : "Ongoing Projects"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-50">
            {activeTab === "completed" 
              ? "Take a look at our successfully delivered programs and sustained institutional milestones." 
              : activeTab === "planned" 
              ? "Explore upcoming strategies, planned programs, and future field operations." 
              : "Discover our active interventions and on-ground activities across various geographies."}
          </p>
        </div>
      </section>

      {/* FILTER BUTTON TABS NAVIGATION */}
      <section className="border-b sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-10 h-10 border border-gray-100">
            <span>❮</span>
          </button>
          
          <div ref={scrollRef} className="flex items-center justify-center space-x-8 overflow-x-auto no-scrollbar scroll-smooth px-12">
            <button onClick={() => { setActiveTab("all"); setSelectedCategory(null); window.history.replaceState(null, "", `#all`); }} className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors shrink-0 ${activeTab === "all" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-primary"}`}>Ongoing Projects 🏢</button>
            <button onClick={() => { setActiveTab("completed"); setSelectedCategory(null); window.history.replaceState(null, "", `#completed`); }} className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors shrink-0 ${activeTab === "completed" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-primary"}`}>Completed Projects ✅</button>
            <button onClick={() => { setActiveTab("planned"); setSelectedCategory(null); window.history.replaceState(null, "", `#planned`); }} className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors shrink-0 ${activeTab === "planned" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-primary"}`}>Planned Projects 📋</button>
          </div>

          {/* Dynamic Categories Row under status updates */}
          {(activeTab === "all" || activeTab === "completed" || activeTab === "planned") && uniqueCategories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2 pb-4 bg-white border-t pt-3 border-gray-50 animate-in fade-in duration-300">
              {uniqueCategories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat ? "bg-[#E56D37] text-white shadow" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{formatTabLabel(cat)}</button>
              ))}
            </div>
          )}
          
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-10 h-10 border border-gray-100">
            <span>❯</span>
          </button>
        </div>
      </section>

      {/* STATIC CARDS CONTENT GRID RENDERING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">No projects found for this selection.</div>
          ) : (
            displayProjects.map((project) => {
              const resolvedUrl = getImageUrl(project.image_url);
              const isVideo = isVideoFile(resolvedUrl);
              
              return (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    {isVideo ? (
                      <video src={resolvedUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img src={resolvedUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-bold text-accent uppercase tracking-widest">{project.category}</div>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${project.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' : project.status?.toLowerCase() === 'planned' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-700'}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-text-primary mb-2 leading-tight">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 mt-auto">
                      <span className="text-base">📍</span> {project.location}
                    </div>
                    <Link to={`/projectdetails/${project.slug}`} className="inline-block bg-primary hover:bg-[#2d2d2d] text-white px-5 py-2 rounded font-medium text-sm transition-colors text-center self-start shadow-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

    </div>
  );
};

export default Projects;