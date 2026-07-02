import React from "react";
import Whowe from "../component/Whowe";
import LeadershipGovernance from "../component/LeadershipGovernance";
import PartnersSection from "../component/PartnersSection";
import FaqAccordion from "../component/FaqAccordion";

const About = () => {
  const backgroundImageURL =
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070";
  return (
    <>
      <section className="relative w-full h-[300px] flex flex-col justify-center items-center overflow-hidden bg-[#006D5B]">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-80"
          // style={{ backgroundImage: `url(${backgroundImageURL})` }}
        />

        <div className="absolute inset-0 z-10" />

        <div className="relative z-40 text-center px-5">
          <h1
            className="text-6xl font-bold text-[#fff] mb-2 heading-font tracking-wide"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
          >
            About Us
          </h1>
          <p className="text-base text-[#fff] font-normal max-w-md mx-auto body-font opacity-95">
            Crafting digital experiences with precision and passion.
          </p>
        </div>
      </section>

      <Whowe />
      <LeadershipGovernance />
      <PartnersSection />
      <FaqAccordion />
    </>
  );
};

export default About;
