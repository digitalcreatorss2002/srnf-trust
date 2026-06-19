// 1. Link ki jagah NavLink import karein
import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import NewslineTicker from "./NewslineTicker";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  const location = useLocation();

  const formatLabel = (label) => {
    if (!label) return "";
    let formatted = label
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return formatted.replace(/\(eoi\/rfq\)/gi, "(EOI/RFQ)");
  };

  const toggleMobileMenu = (menu) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  const staticPrograms = [
    {
      label: "skill-development",
      path: "/programs?filter=skill-development",
    },
    {
      label: "women-empowerment",
      path: "/programs?filter=women-empowerment",
    },
    {
      label: "rural-education",
      path: "/programs?filter=rural-education",
    },
  ];

  const menuItems = [
    {
      name: "About",
      path: "/about",
      dropdownItems: [],
    },
    {
      name: "Programs",
      path: "/programs",
    },
    {
      name: "Our Work",
      path: "/projects",
    },
    {
      name: "Publications",
      path: "/publications",
    },
    {
      name: "Media & Stories",
      path: "/media",
    },
    {
      name: "Get Involved",
      path: "/get-involved",
    },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="bg-white backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-[110px] py-3">
          
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center justify-center">
              <div className="h-24 w-auto flex items-center justify-center p-1">
                <img
                  src="/logo/logo-bg.png"
                  alt="SDF Logo"
                  className="h-full max-h-full object-contain block"
                />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 justify-center items-center mx-4 space-x-1">
            {menuItems.map((item) => {
              const isParentActive = location.pathname.startsWith(item.path);

              return (
                <div key={item.name} className="relative group px-3 py-6">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `font-bold text-md transition-colors flex items-center gap-1 whitespace-nowrap ${
                        isActive || isParentActive
                          ? "text-[#E56D37]"
                          : "text-[#2d2d2d] hover:text-[#2b434d]"
                      }`
                    }
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <span className="text-[10px] text-gray-400 group-hover:rotate-180 transition-transform duration-300">
                        ▼
                      </span>
                    )}
                  </NavLink>

                  {item.hasDropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[90%] w-64 bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-2 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="p-2">
                        {item.dropdownItems.map((subItem) => (
                          <NavLink
                            key={subItem.label}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group/link hover:bg-gray-50 ${
                                isActive
                                  ? "bg-gray-50 text-[#E56D37]"
                                  : "text-gray-700"
                              }`
                            }
                          >
                            <span className="text-xl group-hover/link:scale-110 transition-transform">
                              {subItem.icon}
                            </span>
                            <span className="text-sm font-bold normal-case group-hover/link:text-[#2b434d]">
                              {formatLabel(subItem.label)}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center shrink-0 pl-2">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center bg-[#E56D37] hover:bg-[#2b434d]/90 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap"
            >
              Donate
            </Link>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary hover:text-primary p-2 focus:outline-none"
            >
              <span className="text-2xl font-bold">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white shadow-inner max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => {
            const isParentActive = location.pathname.startsWith(item.path);

            return (
              <div
                key={item.name}
                className="border-b border-gray-50 last:border-0"
              >
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileMenu(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-4 text-base font-bold focus:outline-none ${
                        isParentActive ? "text-[#2b434d]" : "text-text-primary"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`text-sm text-gray-400 transition-transform ${activeMobileMenu === item.name || isParentActive ? "rotate-180 text-[#2b434d]" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 rounded-lg ${activeMobileMenu === item.name ? "max-h-96 mb-2 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {item.dropdownItems.map((subItem) => (
                        <NavLink
                          key={subItem.label}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 text-sm font-bold transition-colors normal-case hover:bg-white ${
                              isActive
                                ? "text-[#2b434d] bg-white"
                                : "text-gray-600"
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-lg">{subItem.icon}</span>
                          {formatLabel(subItem.label)}
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-4 text-base font-bold ${
                        isActive ? "text-[#2b434d]" : "text-text-primary"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            );
          })}
          <div className="pt-6 pb-2">
            <Link
              to="/donate"
              className="block w-full text-center bg-[#E56D37] hover:bg-[#fff]/90 text-black px-6 py-4 rounded-xl font-bold shadow-md"
              onClick={() => setIsOpen(false)}
            >
              ❤️ Donate Now
            </Link>
          </div>
        </div>
      </div>
      <NewslineTicker/>
    </nav>
  );
};

export default Navbar;