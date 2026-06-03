import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#75843a] text-white font-sans mt-auto">
      {/* 🌿 MAIN CONTENT AREA - Spacing and strict grid alignment */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start text-left">
          
          {/* 1. Left Side: Brand Statement & Social Icons */}
          <div className="space-y-6 flex flex-col justify-start items-start text-left">
            <p
              className="text-white/95 text-2xl md:text-[22px] leading-relaxed max-w-[380px] text-left font-normal"
              style={{
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              Empowering communities and sustaining the future through
              integrated development programs across health, education, and
              environment.
            </p>

            {/* Social Icons Container */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all font-bold text-sm"
              >
                f
              </a>
              <a
                href="#"
                className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all text-sm"
              >
                𝕏
              </a>
              <a
                href="#"
                className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all font-bold text-sm"
              >
                in
              </a>
            </div>
          </div>

          {/* 2. 🔗 Quick Links - Strictly left-aligned with heading */}
          <div className="flex flex-col items-start text-left w-full">
            <h4 className="text-xl font-bold mb-6 border-b-2 border-white/20 w-fit pb-1.5 tracking-wide text-left">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[15px] font-medium text-white/90 text-left w-full">
              <li className="text-left">
                <Link to="/about" className="hover:text-white/70 transition-colors block w-fit text-left">
                  About Us
                </Link>
              </li>
              <li className="text-left">
                <Link to="/programs" className="hover:text-white/70 transition-colors block w-fit text-left">
                  Our Programs
                </Link>
              </li>
              <li className="text-left">
                <Link to="/projects" className="hover:text-white/70 transition-colors block w-fit text-left">
                  Ongoing Projects
                </Link>
              </li>
              <li className="text-left">
                <Link to="/impact" className="hover:text-white/70 transition-colors block w-fit text-left">
                  Impact & Evidence
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. 🎯 Our Programs - Strictly left-aligned with heading */}
          <div className="flex flex-col items-start text-left w-full">
            <h4 className="text-xl font-bold mb-6 border-b-2 border-white/20 w-fit pb-1.5 tracking-wide text-left">
              Our Programs
            </h4>
            <ul className="space-y-3 text-[15px] font-medium text-white/90 text-left w-full">
              <li className="hover:text-white/70 cursor-pointer transition-colors block w-fit text-left">Health & Nutrition</li>
              <li className="hover:text-white/70 cursor-pointer transition-colors block w-fit text-left">Education & Child Care</li>
              <li className="hover:text-white/70 cursor-pointer transition-colors block w-fit text-left">Women Empowerment</li>
              <li className="hover:text-white/70 cursor-pointer transition-colors block w-fit text-left">Agriculture & Climate</li>
              <li className="hover:text-white/70 cursor-pointer transition-colors block w-fit text-left">Environment & WASH</li>
            </ul>
          </div>

          {/* 4. 📍 Contact Information */}
          <div className="flex flex-col items-start text-left w-full">
            <h4 className="text-xl font-bold mb-6 border-b-2 border-white/20 w-fit pb-1.5 tracking-wide text-left">
              Contact
            </h4>
            <ul className="space-y-5 text-[14px] font-medium text-white/95 leading-relaxed text-left w-full">
              <li className="flex items-start gap-3 text-left">
                <span className="text-base select-none mt-0.5">📍</span>
                <span className="text-left block">
                  Sustainable Development Foundation (SDF), Near Dwarka More,
                  Sector-15, Dwarka, Delhi – 110059
                </span>
              </li>

              <li className="flex items-center gap-3 text-left">
                <span className="text-base select-none">📞</span>
                <a href="tel:+919289222127" className="hover:underline tracking-wide block w-fit text-left">
                  +91 9289222127
                </a>
              </li>

              <li className="flex items-center gap-3 text-left">
                <span className="text-base select-none">✉️</span>
                <a href="mailto:contact@sdfoundation.org" className="hover:underline break-all block w-fit text-left">
                  contact@sdfoundation.org
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 🔻 BOTTOM STRIP */}
      <div className="border-t border-white/10 bg-black/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center text-center text-[13px] text-white/80 gap-2 sm:gap-3">
          <p>
            © {new Date().getFullYear()} Sustainable Development Foundation. All rights reserved.
          </p>
          <span className="hidden sm:inline text-white/40">||</span>
          <p>
            <a
              href="https://hrntechsolutions.com/digital_creators"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-bold text-white/95"
            >
              Digital Creators
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;