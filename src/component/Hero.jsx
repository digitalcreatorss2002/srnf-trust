import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slidesData = [
  {
    id: 1,
    image:
      "hero/banner1.png", // Yahan apni local ya server image path dalein
    title: "Building Stronger Communities",
    description:
      "Together, we create opportunities for all. Stronger communities start with collective action.",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    id: 2,
    image:
      "hero/banner2.png",
    title: "Empowering Rural Education",
    description:
      "Bridging the gap by providing quality education and resources to children in need.",
    buttonText: "Our Programs",
    buttonLink: "/programs",
  },
  {
    id: 3,
    image:
      "hero/banner3.png",
    title: "Transforming Healthcare Services",
    description:
      "Bringing vital medical attention, health awareness, and clean water resources directly to families.",
    buttonText: "See Our Impact",
    buttonLink: "/projects",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play interval setup (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === slidesData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slidesData.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-[calc(100vh-110px)] min-h-[500px] overflow-hidden bg-gray-900">
      {/* 🖼️ Slides Wrapper */}
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Zoom Effect */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out ${
              index === current ? "scale-105" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark Overlay - Text Visibility ke liye */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* 📝 Animated Text Content Block */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-8 w-full text-left">
              <div className="max-w-2xl space-y-6">
                {/* Title Animation */}
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#e5b83b] transition-all duration-700 delay-300 transform ${
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Description Animation */}
                <p
                  className={`text-lg sm:text-xl text-white/90 leading-relaxed transition-all duration-700 delay-500 transform ${
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.description}
                </p>

                {/* Button Animation */}
                <div
                  className={`pt-2 transition-all duration-700 delay-700 transform ${
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Link
                    to={slide.buttonLink}
                    className="inline-flex items-center justify-center bg-[#75843a] hover:bg-[#5e6b2e] text-white px-8 py-3.5 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
                  >
                    {slide.buttonText}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 🧭 Left & Right Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none"
      >
        <span className="text-xl">❮</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none"
      >
        <span className="text-xl">❯</span>
      </button>

      {/* 📍 Bottom Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              index === current
                ? "w-8 bg-[#e5b83b]"
                : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
