import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../apiConfig";
import NewslineTicker from "./NewslineTicker"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [dynamicPrograms, setDynamicPrograms] = useState([]);
  const navigate = useNavigate();

  const formatLabel = (label) => {
    if (!label) return "";
    let formatted = label.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return formatted.replace(/\(eoi\/rfq\)/gi, "(EOI/RFQ)");
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/programs.php?t=${Date.now()}`,
        );
        const data = await response.json();
        if (data.status === "success" || data.status === true || Array.isArray(data.data)) {
          const uniquePrograms = [];
          const seen = new Set();
          
          const programsList = Array.isArray(data.data) ? data.data : [];

          for (const prog of programsList) {
            const normalizedId = (prog.program_id || "").trim();
            if (normalizedId && !seen.has(normalizedId.toLowerCase())) {
              seen.add(normalizedId.toLowerCase());
              uniquePrograms.push({
                rawLabel: normalizedId,
                label: formatLabel(normalizedId), 
                path: `/programs?filter=${encodeURIComponent(normalizedId.toLowerCase())}`,
                icon: prog.icon || "📌",
              });
            }
          }
          setDynamicPrograms(uniquePrograms);
        }
      } catch (error) {
        console.error("Failed to fetch programs for navbar", error);
      }
    };
    fetchPrograms();
  }, []);

  const toggleMobileMenu = (menu) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  const handleDropdownItemClick = (path) => {
    setIsOpen(false);
    setActiveMobileMenu(null);
    navigate(path);
    window.dispatchEvent(new Event("popstate"));
  };

  const menuItems = [
    {
      name: "About",
      path: "/about",
      hasDropdown: true,
      dropdownItems: [
        { label: "Who We Are", path: "/about#who-we-are",},
        { label: "Leadership", path: "/about#leadership",},
        { label: "Our Approach", path: "/about#approach",},
        { label: "Partners", path: "/about#partners",},
        { label: "FAQ", path: "/about#faq",},
      ],
    },
    {
      name: "Programs",
      path: "/programs",
      hasDropdown: true,
      dropdownItems:
        dynamicPrograms.length > 0
          ? dynamicPrograms
          : [{ label: "Loading...", path: "/programs"}],
    },
    {
      name: "Our Work",
      path: "/projects",
      hasDropdown: true,
      dropdownItems: [
        { label: "Ongoing Projects", path: "/projects#ongoing"},
        // { label: "Impact Snapshot", path: "/projects#impact"},
      ],
    },
    {
      name: "Publications",
      path: "/publications",
      hasDropdown: true,
      dropdownItems: [
        { label: "Annual Reports", path: "/publications#annual-reports"},
        { label: "Case Studies", path: "/publications#case-studies"},
        { label: "Legal Documents", path: "/publications#legal-documents"},
        { label: "Our Publications", path: "/publications#in-publications"},
      ],
    },
    {
      name: "Media & Stories",
      path: "/media",
      hasDropdown: true,
      dropdownItems: [
        { label: "Photo Gallery", path: "/media#photos"},
        { label: "Video Gallery", path: "/media#videos"},
        { label: "Press Coverage", path: "/media#press"},
      ],
    },
    {
      name: "Get Involved",
      path: "/get-involved",
      hasDropdown: true,
      dropdownItems: [
        { label: "Volunteer With Us", path: "/get-involved#volunteer"},
        { label: "Careers", path: "/get-involved#careers"},
        { label: "Partners (EOI/RFQ)", path: "/get-involved#funds"},
      ],
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <nav className="bg-white backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-30 w-full">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center h-25 w-auto">
                <img
                  src="/logo/logo-bg.png"
                  alt="SDF Logo"
                  className="h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Center aligned */}
          <div className="hidden xl:flex items-center justify-center flex-grow space-x-1 px-4">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group py-6">
                <Link
                  to={item.path}
                  className="text-text-primary font-bold text-base transition-all flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-lg border border-transparent hover:text-primary hover:bg-teal-50 group-hover:text-primary group-hover:bg-teal-50 group-hover:border-teal-100 group-hover:shadow-sm"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <span className="text-[10px] text-gray-400 group-hover:rotate-180 transition-transform duration-300">
                      ▼
                    </span>
                  )}
                </Link>

                {item.hasDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[90%] w-64 bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-2 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="p-2">
                      {item.dropdownItems.map((subItem, idx) => (
                        <button
                          key={subItem.path + idx}
                          onClick={() => handleDropdownItemClick(subItem.path)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-teal-50 rounded-lg transition-all group/link text-left hover:shadow-sm border border-transparent hover:border-teal-100/50"
                        >
                          <span className="text-lg group-hover/link:scale-110 transition-transform">
                            {subItem.icon}
                          </span>
                          <span className="text-sm font-bold text-gray-700 group-hover/link:text-primary transition-colors normal-case">
                            {subItem.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Action (Donate) & Mobile Hamburger Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden xl:block">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center bg-accent hover:bg-[#237586] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-primary hover:text-primary p-2 focus:outline-none"
              >
                <span className="text-2xl font-bold">{isOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white shadow-inner max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name} className="border-b border-gray-50 last:border-0">
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileMenu(item.name)}
                    className="w-full flex items-center justify-between px-3 py-4 text-base font-bold text-text-primary focus:outline-none"
                  >
                    {item.name}
                    <span
                      className={`text-sm text-gray-400 transition-transform ${activeMobileMenu === item.name ? "rotate-180 text-primary" : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 rounded-lg px-2 ${
                      activeMobileMenu === item.name
                        ? "max-h-96 py-2 mb-2 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.dropdownItems.map((subItem, idx) => (
                      <button
                        key={subItem.path + idx}
                        className="w-full flex items-center gap-3 px-4 py-2.5 my-1 text-sm font-bold text-gray-600 hover:text-primary hover:bg-teal-50 rounded-lg border border-transparent hover:border-teal-100/50 hover:shadow-sm transition-all normal-case text-left"
                        onClick={() => handleDropdownItemClick(subItem.path)}
                      >
                        <span className="text-lg transition-transform duration-200 group-hover:scale-110">{subItem.icon}</span>
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  className="block w-full text-left px-3 py-4 text-base font-bold text-text-primary"
                  onClick={() => handleDropdownItemClick(item.path)}
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
          <div className="pt-6 pb-2">
            <button
              className="block w-full text-center bg-accent text-white px-6 py-4 rounded-xl font-bold shadow-md heading-font"
              onClick={() => handleDropdownItemClick("/donate")}
            >
              ❤️ Donate Now
            </button>
          </div>
        </div>
      </div>
      <NewslineTicker/>
    </nav>
  );
};

export default Navbar;