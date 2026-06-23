import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const GetInvolved = () => {
  const location = useLocation();
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

  useEffect(() => {
    if (location.hash) {
      const targetTab = location.hash.replace("#", "");
      if (["volunteer", "careers", "funds"].includes(targetTab)) {
        setTimeout(() => {
          setActiveTab(targetTab);
        }, 0);
      }
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="bg-bg-color min-h-screen pb-24 relative">
      <section className="bg-[#E56D37] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Get Involved
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Be a part of our movement. There are many ways to contribute your
            time, skills, and passion.
          </p>
        </div>
      </section>

      <section className="border-b border-gray-200 sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {[
              { id: "volunteer", label: "Volunteer With Us", icon: "🤝" },
              { id: "careers", label: "Careers", icon: "💼" },
              { id: "funds", label: "Partners (EOI/RFQ)", icon: "🌱" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
                className={`py-4 px-1 flex items-center gap-2 border-b-2 font-bold transition-all text-sm md:text-base cursor-pointer ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[50vh]">
        
        {activeTab === "volunteer" && (
          <section id="volunteer" className="mb-24 scroll-mt-32 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-sm h-96 relative">
                <img
                  src="about/volunteer.jpeg"
                  alt="Volunteer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                  <h2 className="text-4xl text-white font-serif font-bold tracking-wide">
                    Volunteer With Us
                  </h2>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Volunteering is the ultimate exercise in democracy. Join our grassroots programs and make a tangible difference on the ground. We offer both field-based and remote skill-sharing opportunities.
                </p>
                <Link
                  to="/volunteerform"
                  className="bg-primary hover:bg-[#5a6425] text-white px-8 py-4 rounded-full font-bold shadow-md hover:-translate-y-1 transition-all mt-6 inline-block"
                >
                  Apply to Volunteer
                </Link>
              </div>
            </div>
          </section>
        )}

        {activeTab === "careers" && (
          <section id="careers" className="scroll-mt-32 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-12">
              <span className="text-4xl mb-4 block animate-bounce">💼</span>
              <h2 className="text-3xl font-serif text-text-primary mb-4">Careers</h2>
              <p className="text-gray-500">Join our team of professionals driving sustainable development.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {loadingCareers ? (
                <div className="p-10 text-center text-gray-500">Loading careers...</div>
              ) : careers.length > 0 ? (
                careers.map((career) => (
                  <div key={career.id} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{career.title}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-2">📍 {career.location}</p>
                      {career.pdf_url && career.pdf_url !== "#" && (
                        <a 
                          href={getImageUrl(career.pdf_url)} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs mt-2 inline-block font-bold"
                        >
                          📄 View Job Description
                        </a>
                      )}
                    </div>
                    <a href={career.apply_link || `mailto:careers@sdfoundation.org?subject=Application for ${encodeURIComponent(career.title)}`} className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full font-bold transition-all">
                      Apply Now
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">No open positions currently. Check back later!</div>
              )}
            </div>
          </section>
        )}

        {activeTab === "funds" && (
          <section id="funds" className="scroll-mt-32 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-12">
              <span className="text-4xl mb-4 block animate-float">🌱</span>
              <h2 className="text-3xl font-serif text-text-primary mb-4">Partners (EOI/RFQ)</h2>
              <p className="text-gray-500">Review active strategic procurement frameworks and tender submissions.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {loadingFunds ? (
                <div className="p-10 text-center text-gray-500">Loading opportunities...</div>
              ) : funds.length > 0 ? (
                funds.map((fund) => (
                  <div key={fund.id} className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1">{fund.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">📍 {fund.location}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{fund.description}</p>
                    </div>
                    <a
                      href={fund.donate_link || `mailto:partner@sdfoundation.org?subject=${encodeURIComponent("EOI/RFQ - " + fund.title)}`}
                      className="shrink-0 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-md"
                    >
                      Submit Quote
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">No active EOI/RFQ found at the moment.</div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default GetInvolved;