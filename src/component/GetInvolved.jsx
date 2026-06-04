import { Link } from "react-router-dom";

const GetInvolved = () => {
  return (
    <section className="w-full bg-gradient-to-t from-[#E56D37] to-[#fff] py-15 px-6 sm:px-10 lg:px-16 overflow-hidden">
      
      {/* Dynamic Keyframes injected globally for independent smooth up-down float loops */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(15px) rotate(1deg); }
        }
        .animate-float-up {
          animation: floatUp 4s ease-in-out infinite;
        }
        .animate-float-down {
          animation: floatDown 4s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* 📝 LEFT COLUMN: WORDS AREA (5 Columns Block) */}
        <div className="lg:col-span-5 text-left space-y-4">
          <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest block">
            Get Involved
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 leading-tight">
            Join Us in Making a Difference
          </h2>
          <div className="w-16 h-1 bg-[#fff] rounded-full pt-1" />
          <p className="text-white text-base sm:text-lg leading-relaxed pt-2 max-w-[450px]">
            Aapka ek chhota sa yogdaan kisi ki zindagi badal sakta hai. Humare sath judkar badlav ka hissa banein.
          </p>
        </div>

        {/* 🖼️ RIGHT COLUMN: ALTERNATING INTERACTIVE FLOATING CARDS (7 Columns Block) */}
        <div className="lg:col-span-7 flex flex-row items-center justify-center gap-6 sm:gap-8 pt-8 lg:pt-0 min-h-[400px]">
          
          {/* 🤝 CARD 1: VOLUNTEER (Floats Upwards First) */}
          <Link 
            to="/get-involved#volunteer" 
            className="w-1/2 max-w-[240px] block group animate-float-up"
          >
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl border border-gray-100 transition-all duration-300 relative">
              {/* Image Frame Container */}
              <div className="h-56 sm:h-64 w-full bg-gray-200 overflow-hidden">
                <img
                  src="hero/banner1.png" // Volunteer support image
                  alt="Volunteer With Us"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Bottom Label Text Strip */}
              <div className="p-4 text-center bg-white border-t border-gray-50">
                <h4 className="font-bold text-[#E56D37] group-hover:text-[#2d3748] transition-colors text-sm sm:text-base">
                  Volunteer With Us
                </h4>
              </div>
              
              {/* Subtle Overlay Glow */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 pointer-events-none transition-colors duration-300" />
            </div>
          </Link>

          {/* 🪙 CARD 2: DONATION (Floats Downwards First) */}
          <Link 
            to="/donate" 
            className="w-1/2 max-w-[240px] block group animate-float-down"
          >
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl border border-gray-100 transition-all duration-300 relative">
              {/* Image Frame Container */}
              <div className="h-56 sm:h-64 w-full bg-gray-200 overflow-hidden">
                <img
                  src="hero/banner3.png" // Donation/Helping support image
                  alt="Donate Now"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Bottom Label Text Strip */}
              <div className="p-4 text-center bg-white border-t border-gray-50">
                <h4 className="font-bold text-[#E56D37] group-hover:text-[#2d3748] transition-colors text-sm sm:text-base">
                  Donate Now ❤️
                </h4>
              </div>

              {/* Subtle Overlay Glow */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 pointer-events-none transition-colors duration-300" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default GetInvolved;