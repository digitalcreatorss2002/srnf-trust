import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";
import Home from "./page/Home";
import About from "./page/About";
import Programs from "./page/Programs";
import ProgramDetails from './page/Programdetails';
import Projects from "./page/Project";
import ProjectDetails from './page/Projectdetails';
import Contact from "./page/Contact";
import Donate from "./page/Donate";
import GetInvolved from "./page/GetInvolved";
import MediaAndStories from "./page/MediaAndStories";
import PressCoverageDetails from "./page/PressCoverageDetails";
import Publications from "./page/Publications";

// 💡 फ़ाइल अभी मौजूद नहीं है, इसलिए इसे कमेंट ही रखना है:
// import Publications from "./page/Publications"; 

function App() {
  return (
    <BrowserRouter>
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
          
          {/* Media Routes */}
          <Route path="media-and-stories" element={<MediaAndStories />} />
          <Route path="media" element={<MediaAndStories />} /> 
          <Route path="media-and-stories/:slug" element={<PressCoverageDetails />} />
          <Route path="press-coverage/:slug" element={<PressCoverageDetails />} />

          {/* Temporary Fallback for Publications */}
          <Route path="publications" element={<Publications />} /> 
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;