import React from "react";
import Hero from "../component/Hero";
import ProjectSlider from "../component/ProjectSlider";
import FocusAreas from "../component/StatCounter";
import OngoingProjects from "../component/OngoingProjects";
// import OurPrograms from "../component/OurPrograms";
import StoriesImpact from "../component/StoriesImpact";
import GetInvolved from "../component/GetInvolved";
import PartnersSection from "../component/PartnersSection";
import Whowe from "../component/Whowe";
import ImageGallerySection from "../component/ImageGallerySection";
import DynamicCirclePrograms from "../component/DynamicCirclePrograms";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Home page par conditional design trigger karne ke liye prop pass kiya */}
      <Whowe isHomePage={true} />
      <ProjectSlider />
      <FocusAreas />
      {/* <OurPrograms/> */}
      <DynamicCirclePrograms/>
      <OngoingProjects/>
      <StoriesImpact/>
      <GetInvolved/>
      <ImageGallerySection/>
      <PartnersSection/>
    </>
  );
}