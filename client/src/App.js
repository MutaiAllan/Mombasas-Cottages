import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Home />
      </div>
    </Router>
  );
}

export default App;
