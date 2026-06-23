import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const id = hash.replace("#", "");
      // Small timeout to ensure element exists in DOM (important for lazy-loaded pages)
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // 80px offset for sticky header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;