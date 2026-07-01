import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const Programs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("");
  const [programsList, setProgramsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch programs list on mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/programs.php`);
        const result = await response.json();
        if (result.status === "success") {
          setProgramsList(result.data);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Compute unique categories
  const uniqueCategories = [
    ...new Set(
      programsList
        .map((p) => p.program_id?.trim().toLowerCase())
        .filter(Boolean)
    ),
  ];

  // 2. Purely sync URL parameter (?filter=...) with activeTab state
  useEffect(() => {
    if (uniqueCategories.length === 0) return;

    const filterParam = searchParams.get("filter")?.toLowerCase().trim();

    if (filterParam && uniqueCategories.includes(filterParam)) {
      setActiveTab(filterParam);
    } else {
      setActiveTab(uniqueCategories[0]);
      setSearchParams({ filter: uniqueCategories[0] }, { replace: true });
    }
  }, [searchParams, programsList]);

  // Handler function to update tab parameter and smoothly scroll viewport to top
  const handleCategorySelection = (tabId) => {
    setSearchParams({ filter: tabId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatTabLabel = (id) => {
    if (id === "all") return "All Programs 🌍";
    if (id.toLowerCase() === "cbo") return "CBO"; // Handled CBO specifically here
    return id.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const displayPrograms = programsList.filter(
    (p) =>
      (p.program_id || "").toLowerCase().trim() === activeTab.toLowerCase().trim()
  );

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      {/* Banner Section */}
      <section className="bg-[#006D5B] text-white py-16 bg-opacity-90 relative mb-4 lg:mb-12">
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl heading-font font-bold mb-4">
            Our Programmes
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-green-50 body-font">
            Impact-driven initiatives targeting the most critical challenges facing our communities today.
          </p>
        </div>
      </section>

      {/* Main Grid Content Area */}
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-2 sticky top-[76px] lg:top-50 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1 lg:gap-2 z-30 w-full overflow-hidden">
            <h2 className="text-xs lg:text-md font-bold text-[#212121] uppercase tracking-widest px-3 mb-1 lg:mb-2 heading-font hidden sm:block">
              Categories
            </h2>
            
            {/* Horizontal scroll panel container for mobile views */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1.5 pb-1 lg:pb-0 scroll-smooth snap-x">
              {uniqueCategories.map((tabId) => {
                const isSelected = activeTab === tabId;
                return (
                  <button
                    key={tabId}
                    onClick={() => handleCategorySelection(tabId)}
                    className={`text-left px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-bold whitespace-nowrap lg:whitespace-normal transition-all duration-200 flex items-center justify-between group cursor-pointer snap-center ${
                      isSelected
                        ? "bg-[#006D5B] text-white shadow-md shadow-orange-500/10 lg:translate-x-1"
                        : "text-gray-600 bg-gray-50 lg:bg-transparent hover:bg-orange-50/40 hover:text-[#006D5B]"
                    }`}
                  >
                    <span className="heading-font">{formatTabLabel(tabId)}</span>
                    <span className={`text-xs hidden lg:inline transition-transform duration-200 ${
                      isSelected ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}>
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT GRID CONTENT AREA */}
          <main className="lg:col-span-8 w-full mt-4 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayPrograms.length === 0 && !loading && (
                <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm font-medium">
                  No programs found for this category.
                </div>
              )}

              {displayPrograms.map((program, idx) => (
                <div
                  key={program.id || idx}
                  id={program.program_id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={getImageUrl(program.image_url)}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/600x400?text=SDF+Program";
                      }}
                    />
                  </div>

                  <div className="p-6 relative grow flex flex-col">
                    <h3 className="text-base text-left font-bold text-gray-800 mb-3 mt-4 leading-snug heading-font group-hover:text-[#006D5B] transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 text-xs mb-5 grow line-clamp-4 body-font text-left leading-relaxed">
                      {program.description}
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100 flex-wrap">
                      <span className="bg-orange-50 text-[#006D5B] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                        {program.beneficiaries || "N/A"} Beneficiaries
                      </span>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                        {program.regions || "N/A"} Active
                      </span>
                    </div>

                    <Link
                      to={`/programdetails/${program.slug}`}
                      className="text-[#006D5B] font-bold hover:text-orange-600 uppercase tracking-wider text-xs self-start transition-colors mt-5 flex items-center gap-1"
                    >
                      Explore Project &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Programs;