import React, { useState} from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
      <div className="App">
        <NavBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}       
        />
      </div>
    
  );
}
export default App;
