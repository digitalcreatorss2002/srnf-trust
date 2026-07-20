import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../apiConfig";
import NewslineTicker from "./NewslineTicker";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [dynamicPrograms, setDynamicPrograms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic label formatter for acronyms and title casing
  const formatLabel = (label) => {
    if (!label) return "";
    
    // 1. Hyphens ko spaces se replace karein
    let formatted = label.replace(/-/g, " ");
    
    // 2. Har word ka first letter Capitalize karein (Title Case)
    formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());
    
    // 3. Jo acronyms strictly capital letters me chahiye unhe array me target karein
    const acronyms = ["CBO", "WASH"];
    
    // 4. Pure phrase ko update karein (Dynamic mapping)
    formatted = formatted
      .split(" ")
      .map((word) => (acronyms.includes(word.toUpperCase()) ? word.toUpperCase() : word))
      .join(" ");

    // 5. Special edge cases check karein
    formatted = formatted.replace(/\(eoi\/rfq\)/gi, "(EOI/RFQ)");
    
    return formatted;
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

  const isLinkActive = (itemPath, hasDropdown = false, dropdownItems = []) => {
    const currentFullRoot = location.pathname + location.search + location.hash;
    
    if (currentFullRoot === itemPath) return true;
    if (location.pathname === itemPath) return true;
    
    if (hasDropdown && dropdownItems.length > 0) {
      return dropdownItems.some(sub => currentFullRoot.includes(sub.path) || location.pathname === sub.path.split('#')[0]);
    }
    
    return false;
  };

  const menuItems = [
    {
      name: "About",
      path: "/about",
      hasDropdown: true,
      dropdownItems: [
        { label: "Who We Are", path: "/about#who-we-are" },
        { label: "Leadership", path: "/about#leadership" },
        { label: "Partners", path: "/about#partners" },
        { label: "FAQ", path: "/about#faq" },
      ],
    },
    {
      name: "Programs",
      path: "/programs",
      hasDropdown: true,
      dropdownItems:
        dynamicPrograms.length > 0
          ? dynamicPrograms
          : [{ label: "Loading...", path: "/programs" }],
    },
    {
      name: "Our Work",
      path: "/projects",
      hasDropdown: true,
      dropdownItems: [
        { label: "Ongoing Projects", path: "/projects#all" },
        { label: "Completed Projects", path: "/projects#completed" },
        { label: "Planned Projects", path: "/projects#planned" },
      ],
    },
    {
      name: "Publications",
      path: "/publications",
      hasDropdown: true,
      dropdownItems: [
        { label: "Annual Reports", path: "/publications?filter=annual-reports" },
        { label: "Case Studies", path: "/publications?filter=case-studies" },
        { label: "Legal Documents", path: "/publications?filter=legal-documents" },
        { label: "Our Publications", path: "/publications?filter=in-publications" },
      ],
    },
    {
      name: "Media & Stories",
      path: "/media",
      hasDropdown: true,
      dropdownItems: [
        { label: "Photo Gallery", path: "/media?filter=photos" },
        { label: "Video Gallery", path: "/media?filter=videos" },
        { label: "Press Coverage", path: "/media?filter=press" },
      ],
    },
    {
      name: "Get Involved",
      path: "/get-involved",
      hasDropdown: true,
      dropdownItems: [
        { label: "Volunteer With Us", path: "/get-involved?filter=volunteer" },
        { label: "Careers", path: "/get-involved?filter=careers" },
        { label: "Partners (EOI/RFQ)", path: "/get-involved?filter=funds" },
      ],
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <nav className="bg-white backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <NewslineTicker />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24 w-full">
          
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center h-22 w-auto">
                <img
                  src="/logo/logo-bg.png"
                  alt="SRNF Logo"
                  className="h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center justify-center flex-grow space-x-1 px-4">
            {menuItems.map((item) => {
              const active = isLinkActive(item.path, item.hasDropdown, item.dropdownItems);
              return (
                <div key={item.name} className="relative group py-6">
                  <Link
                    to={item.path}
                    className={`font-bold text-base transition-all flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-lg border border-transparent ${
                      active
                        ? "text-primary bg-teal-50 border-teal-100 shadow-sm"
                        : "text-text-primary hover:text-primary hover:bg-teal-50 group-hover:text-primary group-hover:bg-teal-50 group-hover:border-teal-100 group-hover:shadow-sm"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <span className="text-[9px] text-gray-400 group-hover:rotate-180 transition-transform duration-300 ml-0.5">
                        ▼
                      </span>
                    )}
                  </Link>

                  {item.hasDropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[90%] w-64 bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-2 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="p-2">
                        {item.dropdownItems.map((subItem, idx) => {
                          const subActive = location.pathname + location.search + location.hash === subItem.path || location.pathname === subItem.path.split('#')[0];
                          return (
                            <button
                              key={subItem.path + idx}
                              onClick={() => handleDropdownItemClick(subItem.path)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group/link text-left border cursor-pointer ${
                                subActive 
                                  ? "bg-teal-50 text-primary border-teal-100/70 shadow-sm"
                                  : "bg-transparent text-gray-700 hover:bg-teal-50 border-transparent hover:border-teal-100/50 hover:shadow-sm"
                              }`}
                            >
                              <span className={`text-sm font-bold transition-colors normal-case ${subActive ? "text-primary" : "text-gray-700 group-hover/link:text-primary"}`}>
                                {subItem.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Action (Donate) & Mobile Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden xl:block">
              <Link
                to="/donate"
                className={`inline-flex items-center justify-center bg-accent hover:bg-[#237586] text-white px-6 py-2.5 rounded-full font-bold heading-font transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md ${
                  location.pathname === "/donate" ? "ring-4 ring-teal-200" : ""
                }`}
              >
                Donate
              </Link>
            </div>

            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-primary hover:text-primary p-2 focus:outline-none cursor-pointer"
              >
                <span className="text-2xl font-bold">{isOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Content Layout */}
      <div
        className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white shadow-inner max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => {
            const active = isLinkActive(item.path, item.hasDropdown, item.dropdownItems);
            return (
              <div key={item.name} className="border-b border-gray-50 last:border-0">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileMenu(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-4 text-base font-bold focus:outline-none cursor-pointer ${
                        active ? "text-primary bg-teal-50/50 rounded-lg" : "text-text-primary"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`text-sm transition-transform ${activeMobileMenu === item.name ? "rotate-180 text-primary" : "text-gray-400"}`}
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
                      {item.dropdownItems.map((subItem, idx) => {
                        const subActive = location.pathname + location.search + location.hash === subItem.path;
                        return (
                          <button
                            key={subItem.path + idx}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 my-1 text-sm font-bold rounded-lg border transition-all normal-case text-left cursor-pointer ${
                              subActive
                                ? "bg-white text-primary border-teal-100 shadow-sm"
                                : "text-gray-600 hover:text-primary hover:bg-teal-50 border-transparent hover:border-teal-100/50 hover:shadow-sm"
                            }`}
                            onClick={() => handleDropdownItemClick(subItem.path)}
                          >
                            {subItem.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <button
                    className={`block w-full text-left px-3 py-4 text-base font-bold cursor-pointer ${
                      active ? "text-primary bg-teal-50/50 rounded-lg" : "text-text-primary"
                    }`}
                    onClick={() => handleDropdownItemClick(item.path)}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            );
          })}
          <div className="pt-6 pb-2">
            <button
              className="block w-full text-center bg-accent text-white px-6 py-4 rounded-xl font-bold shadow-md heading-font cursor-pointer"
              onClick={() => handleDropdownItemClick("/donate")}
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
