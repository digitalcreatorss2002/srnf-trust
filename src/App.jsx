import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";

// Lazy loading page components
const Home = lazy(() => import("./page/Home"));
const About = lazy(() => import("./page/About"));
const Programs = lazy(() => import("./page/Programs"));
const ProgramDetails = lazy(() => import("./page/Programdetails"));
const Projects = lazy(() => import("./page/Project"));
const ProjectDetails = lazy(() => import("./page/Projectdetails"));
const Contact = lazy(() => import("./page/Contact"));
const Donate = lazy(() => import("./page/Donate"));
const GetInvolved = lazy(() => import("./page/GetInvolved"));
const VolunteerForm = lazy(() => import("./page/VolunteerForm"));
const MediaAndStories = lazy(() => import("./page/MediaAndStories"));
const PressCoverageDetails = lazy(() => import("./page/PressCoverageDetails"));
const Publications = lazy(() => import("./page/Publications"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex items-center justify-center bg-white text-primary font-bold text-lg">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 font-sans tracking-wide">Loading page...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="programs" element={<Programs />} />
            <Route path="programdetails/:slug" element={<ProgramDetails />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projectdetails/:slug" element={<ProjectDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="donate" element={<Donate />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="volunteerform" element={<VolunteerForm />} />

            {/* Media Routes */}
            <Route path="media-and-stories" element={<MediaAndStories />} />
            <Route path="media" element={<MediaAndStories />} />
            <Route path="media-and-stories/:slug" element={<PressCoverageDetails />} />
            <Route path="press-coverage/:slug" element={<PressCoverageDetails />} />

            {/* Temporary Fallback for Publications */}
            <Route path="publications" element={<Publications />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;