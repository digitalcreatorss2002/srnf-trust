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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="projectdetails/:slug" element={<ProjectDetails />} />
          <Route path="projects" element={<Projects/>} />
          <Route path="programdetails/:slug" element={<ProgramDetails />} />
          <Route path="contact" element={<Contact/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;