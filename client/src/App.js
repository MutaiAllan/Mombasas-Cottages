import React, { useState} from "react";
import "./App.css";
import NavBar from "./components/NavBar";


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
