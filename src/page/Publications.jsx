import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const Publications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("annual-reports");
  
  const [publications, setPublications] = useState([]);
  const [inPublications, setInPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pubRes, inPubRes] = await Promise.all([
          fetch(`${API_BASE_URL}/publications.php`),
          fetch(`${API_BASE_URL}/in_publications.php`),
        ]);
        const pubData = await pubRes.json();
        const inPubData = await inPubRes.json();
        if (pubData.status === "success") {
          setPublications(pubData.data);
        }
        if (inPubData.status === "success") {
          setInPublications(inPubData.data);
        }
      } catch (error) {
        console.error("Error fetching publications data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sync URL parameter (?filter=...) cleanly with sidebar active tab state
  useEffect(() => {
    const filterParam = searchParams.get("filter")?.toLowerCase().trim();
    const validTabs = ["annual-reports", "case-studies", "in-publications", "legal-documents"];

    if (filterParam && validTabs.includes(filterParam)) {
      setActiveTab(filterParam);
    } else {
      setActiveTab("annual-reports");
      setSearchParams({ filter: "annual-reports" }, { replace: true });
    }
  }, [searchParams]);

  // Sidebar items click hander added to auto scroll view to the top smoothly
  const handleTabSelection = (tabId) => {
    setSearchParams({ filter: tabId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reports = publications.filter((p) => p.type === "report");
  const caseStudies = publications.filter((p) => p.type === "case_study");
  const legalDocs = publications.filter((p) => p.type === "legal");

  const sidebarTabs = [
    { id: "annual-reports", label: "Reports" },
    { id: "case-studies", label: "Case Studies" },
    { id: "in-publications", label: "Our Publications" },
    { id: "legal-documents", label: "Legal Documents" },
  ];

  if (loading) {
    return (
      <div className="w-full py-32 text-center bg-white text-gray-500 font-bold tracking-wider">
        Loading Publications Portfolio...
      </div>
    );
  }

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      
      {/* Banner Section */}
      <section className="bg-[#006D5B] text-white py-16 text-center relative mb-4 lg:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 heading-font"
          >
            Publications & Resources
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl max-w-2xl mx-auto text-orange-50 body-font">
            Explore our reports, case studies, legal documents, and books showcasing our impact-driven work.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Split Layout into Sidebar (20%) and Content Area (80%) */}
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: FIXED mobile top sticky layout implementation applied */}
          <aside className="lg:col-span-2 sticky top-[76px] lg:top-50 bg-white p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1 lg:gap-2 z-30 w-full overflow-hidden">
            <h2 className="text-xs lg:text-lg font-bold text-[#212121] uppercase tracking-widest px-2 mb-1 lg:mb-2 heading-font hidden sm:block">
              Resources
            </h2>
            
            {/* Horizontal swipe panel for mobile layout fallback wrapper */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1.5 pb-1 lg:pb-0 scroll-smooth snap-x">
              {sidebarTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabSelection(tab.id)}
                    className={`text-left px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl text-xs lg:text-sm font-bold whitespace-nowrap lg:whitespace-normal transition-all duration-200 flex items-center justify-between group cursor-pointer snap-center ${
                      isSelected
                        ? "bg-[#006D5B] text-white shadow-md lg:translate-x-1"
                        : "text-gray-600 bg-gray-50 lg:bg-transparent hover:bg-orange-50/40 hover:text-[#006D5B]"
                    }`}
                  >
                    <span className="heading-font">{tab.label}</span>
                    <span className={`text-[10px] hidden lg:inline transition-all ${isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT SIDE: 80% Width Layout Content Cards Area (lg:col-span-8) */}
          <main className="lg:col-span-8 w-full min-h-[50vh] mt-4 lg:mt-0">
            
            {/* 1. REPORTS RENDERING BOX */}
            {activeTab === "annual-reports" && (
              reports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in fade-in duration-300">
                  {reports.map((r) => (
                    <a
                      key={r.id}
                      href={getImageUrl(r.file_url)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-black shrink-0 text-[10px]">PDF</div>
                        <div>
                          <h3 className="font-bold text-xs text-gray-800 leading-tight group-hover:text-[#006D5B] transition-colors line-clamp-2 text-left heading-font">{r.title}</h3>
                          {r.file_size && <p className="text-[10px] text-gray-400 mt-0.5 text-left font-medium">{r.file_size}</p>}
                        </div>
                      </div>
                      <span className="text-[#006D5B] font-bold text-lg ml-2 transition-transform group-hover:translate-y-0.5">↓</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No annual reports available.</div>
              )
            )}

            {/* 2. CASE STUDIES RENDERING BOX */}
            {activeTab === "case-studies" && (
              caseStudies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
                  {caseStudies.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
                      <div className="h-44 bg-gray-100 overflow-hidden relative">
                        <img
                          src={getImageUrl(c.image_url)}
                          alt={c.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-[#006D5B] uppercase tracking-wider mb-1 block text-left heading-font">{c.category}</span>
                          <h3 className="font-bold text-gray-800 text-sm mb-3 text-left leading-snug line-clamp-2 heading-font">{c.title}</h3>
                        </div>
                        {c.file_url && (
                          <a href={getImageUrl(c.file_url)} target="_blank" rel="noreferrer" className="text-[#006D5B] hover:text-orange-600 text-xs font-bold flex items-center gap-0.5 self-start pt-2 border-t border-gray-50 w-full">
                            Read Study <span className="text-sm transition-transform group-hover:translate-x-1">&rarr;</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No case studies available.</div>
              )
            )}

            {/* 3. OUR PUBLICATIONS RENDERING BOX */}
            {activeTab === "in-publications" && (
              inPublications.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                  {inPublications.map((book) => (
                    <div key={book.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                      <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                        <img 
                          src={getImageUrl(book.image_url)} 
                          alt={book.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          onError={(e) => e.currentTarget.src='https://via.placeholder.com/400x500?text=No+Cover'} 
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between items-center text-center">
                        <h3 className="font-bold text-xs text-gray-800 mb-3 leading-snug line-clamp-2 heading-font">{book.title}</h3>
                        {book.pdf_url && (
                          <a href={getImageUrl(book.pdf_url)} target="_blank" rel="noreferrer" className="bg-gray-800 text-white hover:bg-[#006D5B] w-full py-2 rounded-xl text-xs font-bold shadow-sm transition-colors block mt-auto cursor-pointer">
                            Read PDF
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No books available at the moment.</div>
              )
            )}

            {/* 4. LEGAL DOCUMENTS RENDERING BOX */}
            {activeTab === "legal-documents" && (
              legalDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in fade-in duration-300">
                  {legalDocs.map((doc) => (
                    <a
                      key={doc.id}
                      href={getImageUrl(doc.file_url)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black shrink-0 text-[10px]">DOC</div>
                        <div>
                          <h3 className="font-bold text-xs text-gray-800 leading-tight group-hover:text-[#006D5B] transition-colors line-clamp-2 text-left heading-font">{doc.title}</h3>
                          {doc.file_size && <p className="text-[10px] text-gray-400 mt-0.5 text-left font-medium">{doc.file_size}</p>}
                        </div>
                      </div>
                      <span className="text-[#006D5B] font-bold text-lg ml-2 transition-transform group-hover:translate-y-0.5">↓</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No legal documents available.</div>
              )
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Publications;