import React from 'react';

const Programs = () => {
  // अपनी इमेज का पाथ या URL यहाँ डालें
  const backgroundImageURL = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070";

  return (
    <section className="relative w-full h-[300px] flex flex-col justify-center items-center overflow-hidden bg-[#75843a]">
      
      {/* 1. Background Image Div */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-80"
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      />

      {/* 2. Dark Overlay for Text Legibility (टेक्स्ट को साफ़ दिखाने के लिए) */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Banner Content Container */}
      <div className="relative z-40 text-center px-5">
        <h1
          className="text-4xl font-bold text-[#fff] mb-2 tracking-wide"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
        >
          Our Programs
        </h1>
        <p className="text-base text-[#fff] font-normal max-w-md mx-auto opacity-95">
          Crafting digital experiences with precision and passion.
        </p>
      </div>

    </section>
  );
};

export default Programs;