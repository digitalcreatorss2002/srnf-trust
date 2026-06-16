import React from "react";
import Hero from "../component/Hero";
import ProjectSlider from "../component/ProjectSlider";
import FocusAreas from "../component/StatCounter"; // 🔥 Yeh import add kiya
import OngoingProjects from "../component/OngoingProjects";
import OurPrograms from "../component/OurPrograms";
import StoriesImpact from "../component/StoriesImpact";
import GetInvolved from "../component/GetInvolved";
import PartnersSection from "../component/PartnersSection";
// import Newsletter from "../component/Newsletter";
import Whowe from "../component/Whowe";
import ImageGallerySection from "../component/ImageGallerySection";

export default function Home() {
  return (
    <>
      <Hero />
      <Whowe/>
      <ProjectSlider />
      <FocusAreas />
      <OurPrograms/>
      <OngoingProjects/>
      <StoriesImpact/>
      <GetInvolved/>
      <ImageGallerySection/>
      <PartnersSection/>
      {/* <Newsletter/> */}
    </>
  );
}