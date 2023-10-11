import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import CottageList from "./CottageList";
import CottageDetails from "./CottageDetails";
import Home from "./Home";
import Footer from "./Footer";
import NewCottage from "./NewCottage";
import { CottageProvider } from "./CottageContext"; 


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
    }

    // Check if the response has a body
        const contentLength = r.headers.get("Content-Length");
        if (!contentLength || contentLength === "0") {
      // Response is empty, handle accordingly
        return null;
        }

        return r.json();
        })
      .then((user) => {
        if (user !== null) {
          setUser(user);
        }
        })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [])
    

  return (
    <CottageProvider>

    <div className="App">
    <Router>
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

        <main>
          {user ? (
            <Routes>
              {/* <Route path="/api/cottages" element={<Home />} /> */}
              {/* <Route path="/reviews" element={<NewReview />} /> */}
              <Route path="/cottages/:id" element={<CottageDetails />} />
              <Route path="/new_cottage" element={<NewCottage />} />
              <Route path="/cottages" element={<CottageList />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
              <Route path="/login" element={<LogIn setUser={setUser} />} />
            </Routes>
          ) : (
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/cottages/:id" element={<CottageDetails />} />
              <Route path="/new_dog_house" element={<NewCottage />} />
              <Route path="/" element={<CottageList />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
            </Routes>
          )}
        </main>
    </Router>

      <Footer />
    </div>
    </CottageProvider>
  );
}

export default App;