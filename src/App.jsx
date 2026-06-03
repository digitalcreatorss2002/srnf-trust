import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";
import Home from "./page/Home";
import About from "./page/About";
import Programs from "./page/Programs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;