import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Publications = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("annual-reports");

  // 🔥 1. STATIC CENTRAL DATABASE FOR REPORTS & CASE STUDIES
  const staticPublications = [
    {
      id: 1,
      type: "report",
      title: "Annual Impact Report FY 2025-26",
      file_size: "4.2 MB",
      file_url: "#"
    },
    {
      id: 2,
      type: "report",
      title: "Rural Education Assessment Policy Framework",
      file_size: "2.8 MB",
      file_url: "#"
    },
    {
      id: 3,
      type: "case_study",
      category: "Education",
      title: "Impact Analysis of Offline Multimedia Projectors in Block Classrooms",
      image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600",
      file_url: "#"
    },
    {
      id: 4,
      type: "case_study",
      category: "Healthcare",
      title: "Overcoming Accessibility Barriers via Mobile Clinical Diagnostics",
      image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600",
      file_url: "#"
    }
  ];

  // 🔥 2. STATIC CENTRAL DATABASE FOR BOOKS / EXTRA PUBLICATIONS
  const staticInPublications = [
    {
      id: 1,
      title: "Empowering Rural Collectives: A Guide to SHG Frameworks",
      image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
      pdf_url: "#"
    },
    {
      id: 2,
      title: "Sustainable Field Development Operations Manual",
      image_url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600",
      pdf_url: "#"
    }
  ];

  // URL Hash Synchronizer Logic
  useEffect(() => {
    if (location.hash) {
      const tab = location.hash.replace("#", "");
      if (["annual-reports", "case-studies", "in-publications"].includes(tab)) {
        setActiveTab(tab);
      }
    } else {
      setActiveTab("annual-reports");
    }
  }, [location]);

  // Filters for structural tabs
  const reports = staticPublications.filter((p) => p.type === "report");
  const caseStudies = staticPublications.filter((p) => p.type === "case_study");

  return (
    <div className="bg-bg-color min-h-screen">
      
      {/* HEADER HERO VIEW */}
      <section className="bg-primary text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4 font-serif"
        >
          Publications & Resources
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary-50 opacity-90">
          Explore our reports, case studies, and books showcasing our impact-driven work.
        </motion.p>
      </section>

      {/* STICKY NAVIGATION TABS */}
      <section className="border-b sticky top-20 bg-white z-40 shadow-sm border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 overflow-x-auto no-scrollbar">
            {[
              { id: "annual-reports", label: "Reports 📊" },
              { id: "case-studies", label: "Case Studies 📝" },
              { id: "in-publications", label: "Our Publications 📚" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
                className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors outline-none cursor-pointer ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONAL CARDS CONTENT RENDERING */}
      <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">
        
        {/* ANNUAL REPORTS VIEW */}
        {activeTab === "annual-reports" && (
          reports.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {reports.map((r) => (
                <a
                  key={r.id}
                  href={r.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md flex items-center justify-between transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-red-50 text-red-500 rounded flex items-center justify-center font-bold shrink-0 text-xs">PDF</div>
                     <div>
                       <h3 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{r.title}</h3>
                       {r.file_size && <p className="text-xs text-gray-400 mt-1 block font-medium">{r.file_size}</p>}
                     </div>
                  </div>
                  <span className="text-primary font-bold text-xl ml-4 transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              ))}
            </div>
          ) : (
             <p className="text-gray-500 text-center py-8">No annual reports available.</p>
          )
        )}

        {/* CASE STUDIES VIEW */}
        {activeTab === "case-studies" && (
          caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
              {caseStudies.map((c) => (
                <div key={c.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={c.image_url}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 block">{c.category}</span>
                      <h3 className="font-bold text-gray-900 text-lg mb-4 leading-tight line-clamp-2">{c.title}</h3>
                    </div>
                    {c.file_url && (
                        <a href={c.file_url} target="_blank" rel="noreferrer" className="text-primary hover:text-[#5a6425] text-sm font-bold flex items-center gap-1 self-start mt-4">
                          Read Study <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
                        </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
           ) : (
             <p className="text-gray-500 text-center py-8">No case studies available.</p>
          )
        )}

        {/* IN PUBLICATIONS / BOOKS VIEW */}
        {activeTab === "in-publications" && (
          staticInPublications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
              {staticInPublications.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                    <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                      <img 
                        src={book.image_url} 
                        alt={book.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        onError={(e) => e.currentTarget.src='https://via.placeholder.com/400x500?text=No+Cover'} 
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between items-center text-center">
                      <h3 className="font-bold text-md text-gray-900 mb-4 leading-snug line-clamp-2">{book.title}</h3>
                      {book.pdf_url && (
                          <a href={book.pdf_url} target="_blank" rel="noreferrer" className="bg-[#6a752b] text-white hover:bg-[#5a6425] w-full py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors block mt-auto">
                              Read PDF
                          </a>
                      )}
                    </div>
                </div>
              ))}
            </div>
           ) : (
             <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                 <p className="text-gray-500 font-medium">No books available at the moment.</p>
             </div>
          )
        )}
      </div>
    </div>
  );
};

export default Publications;