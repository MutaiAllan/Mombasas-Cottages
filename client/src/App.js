
import React, { useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import DogHouseList from "./components/DogHouseList";
import DogHouseDetails from "./components/DogHouseDetails";
import Home from "./components/Home";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
      <div className="App">

                <NavBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm} 
                  setUser={setUser}     
                />
        
        <Router>
          <main>
            {user ? (
              <Routes>
                {/* <Route path="/api/dog_houses" element={<Home />} /> */}
                <Route path="/dog_houses/:id" element={<DogHouseDetails />} />
                <Route path="/dog_houses" element={<DogHouseList />} />
              </Routes>
            ): (
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/dog_houses" element={<DogHouseList />} /> */}
                <Route path="/api/signup" element={<SignUp setUser={setUser} />} />
                <Route path="/api/login" element={<LogIn setUser={setUser} />} />
              </Routes>
            )}
            
          </main>
          </Router>

        
      </div>
      
  );
}

export default App;
