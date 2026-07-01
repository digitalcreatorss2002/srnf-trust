import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const GetInvolved = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("volunteer");

  const [careers, setCareers] = useState([]);
  const [funds, setFunds] = useState([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [loadingFunds, setLoadingFunds] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/careers.php`);
        const result = await response.json();
        if (result.status === "success") {
          setCareers(result.data);
        }
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoadingCareers(false);
      }
    };

    const fetchFunds = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/funds.php`);
        const result = await response.json();
        if (result.status === "success") {
          setFunds(result.data);
        }
      } catch (error) {
        console.error("Error fetching funds:", error);
      } finally {
        setLoadingFunds(false);
      }
    };

    fetchCareers();
    fetchFunds();
  }, []);

  // Sync URL search parameters (?filter=...) with sidebar active tab state
  useEffect(() => {
    const filterParam = searchParams.get("filter")?.toLowerCase().trim();
    const validTabs = ["volunteer", "careers", "funds"];

    if (filterParam && validTabs.includes(filterParam)) {
      setActiveTab(filterParam);
    } else {
      setActiveTab("volunteer");
      setSearchParams({ filter: "volunteer" }, { replace: true });
    }
  }, [searchParams]);

  // Handler function to update search params state and scroll page back to top smoothly
  const handleTabSelection = (tabId) => {
    setSearchParams({ filter: tabId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebarTabs = [
    { id: "volunteer", label: "Volunteer With Us" },
    { id: "careers", label: "Careers Portal"},
    { id: "funds", label: "Partners (EOI/RFQ)"},
  ];

  return (
    <div className="bg-bg-color min-h-screen pb-24 relative">
      {/* Banner Section */}
      <section className="bg-[#006D5B] text-white py-16 mb-4 lg:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-font">
            Get Involved
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-orange-50 body-font">
            Be a part of our movement. There are many ways to contribute your
            time, skills, and passion.
          </p>
        </div>
      </section>

      {/* Main Workspace Layout - Split into Sidebar (20%) and Content (80%) */}
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: FIXED mobile top sticky layout support implemented */}
          <aside className="lg:col-span-2 sticky top-[76px] lg:top-50 bg-white p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1 lg:gap-2 z-30 w-full overflow-hidden">
            <h2 className="text-xs lg:text-md font-bold text-[#212121] uppercase tracking-widest px-2 mb-1 lg:mb-2 heading-font hidden sm:block">
              Opportunities
            </h2>
            
            {/* Horizontal slider bar for mobile viewport support */}
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
                    <div className="flex items-center gap-2">
                      <span>{tab.icon}</span>
                      <span className="heading-font">{tab.label}</span>
                    </div>
                    <span className={`text-[10px] hidden lg:inline transition-all ${isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT VIEWPORT: 80% Width Layout Dynamic Feed Content (lg:col-span-8) */}
          <main className="lg:col-span-8 w-full min-h-[50vh] mt-4 lg:mt-0">
            
            {/* 1. VOLUNTEER SECTION */}
            {activeTab === "volunteer" && (
              <section id="volunteer" className="animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm h-72 relative">
                    <img
                      src="about/volunteer.jpeg"
                      alt="Volunteer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h2 className="text-2xl text-white font-bold tracking-wide heading-font">
                        Volunteer With Us
                      </h2>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-4 flex flex-col items-start">
                    <p className="text-gray-600 text-sm leading-relaxed text-left body-font">
                      Volunteering is the ultimate exercise in democracy. Join our grassroots programs and make a tangible difference on the ground. We offer both field-based and remote skill-sharing opportunities.
                    </p>
                    <Link
                      to="/volunteerform"
                      className="bg-[#006D5B] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-all text-xs inline-block cursor-pointer"
                    >
                      Apply to Volunteer &rarr;
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* 2. CAREERS APPLICATION GRID SECTION */}
            {activeTab === "careers" && (
              <section id="careers" className="animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2">
                  {loadingCareers ? (
                    <div className="p-12 text-center text-gray-400 font-medium">Loading available positions...</div>
                  ) : careers.length > 0 ? (
                    careers.map((career) => (
                      <div key={career.id} className="p-5 border-b border-gray-50 last:border-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-orange-50/10 rounded-xl transition-colors">
                        <div className="text-left">
                          <h3 className="text-base font-bold text-gray-800 mb-1 heading-font group-hover:text-[#006D5B]">{career.title}</h3>
                          <p className="text-gray-400 text-xs flex items-center gap-1 font-medium">📍 {career.location}</p>
                          {career.pdf_url && career.pdf_url !== "#" && (
                            <a 
                              href={getImageUrl(career.pdf_url)} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-[11px] mt-2 inline-block font-extrabold"
                            >
                              📄 View Job Details (PDF)
                            </a>
                          )}
                        </div>
                        <Link 
                          to="/contact" 
                          className="border-2 border-[#006D5B] bg-white text-[#006D5B] hover:bg-[#006D5B] hover:text-white px-5 py-1.5 rounded-xl font-bold text-xs transition-all tracking-wide shrink-0 text-center cursor-pointer"
                        >
                          Apply Now
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-gray-400 font-medium">No open positions currently. Check back later!</div>
                  )}
                </div>
              </section>
            )}

            {/* 3. PROCUREMENT & CONTRACT GRANTS SECTION */}
            {activeTab === "funds" && (
              <section id="funds" className="animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2">
                  {loadingFunds ? (
                    <div className="p-12 text-center text-gray-400 font-medium">Loading opportunities framework...</div>
                  ) : funds.length > 0 ? (
                    funds.map((fund) => (
                      <div key={fund.id} className="p-6 border-b border-gray-50 last:border-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:bg-orange-50/10 rounded-xl transition-colors">
                        <div className="max-w-xl text-left">
                          <h3 className="text-base font-bold text-gray-800 mb-1 heading-font">{fund.title}</h3>
                          <p className="text-gray-400 text-xs mb-2.5 font-medium">📍 {fund.location}</p>
                          <p className="text-gray-500 text-xs leading-relaxed body-font">{fund.description}</p>
                        </div>
                        <a
                          href={fund.donate_link || `mailto:partner@sdfoundation.org?subject=${encodeURIComponent("EOI/RFQ - " + fund.title)}`}
                          className="shrink-0 border-2 border-[#006D5B] text-[#006D5B] hover:bg-[#006D5B] hover:text-white px-5 py-2 rounded-xl font-bold text-xs transition-all hover:shadow-sm tracking-wide"
                        >
                          Submit Quote
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-gray-400 font-medium">No active EOI/RFQ found at the moment.</div>
                  )}
                </div>
              </section>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};

export default GetInvolved;