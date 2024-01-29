import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./componenets/Navbar";
import MainSection from "./componenets/MainSection";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <MainSection />
      </div>
    </Router>
  );
}

export default App;
