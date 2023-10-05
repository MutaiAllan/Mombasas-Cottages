import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import DogHouseList from "./DogHouseList";
import DogHouseDetails from "./DogHouseDetails";
import Home from "./Home";
import Footer from "./Footer";
import NewDogHouse from "./NewDogHouse";

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
    <div className="App">
      {/* <NewDoghouse /> */}
    <Router>
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

        <main>
          {user ? (
            <Routes>
              {/* <Route path="/api/dog_houses" element={<Home />} /> */}
              <Route path="/dog_houses/:id" element={<DogHouseDetails />} />
              <Route path="/new_dog_house" element={<NewDogHouse />} />
              <Route path="/dog_houses" element={<DogHouseList />} />
              <Route path="/login" element={<LogIn setUser={setUser} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/dog_houses/:id" element={<DogHouseDetails />} />
                <Route path="/dog_houses" element={<DogHouseList />} /> */}
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
              <Route path="/login" element={<LogIn setUser={setUser} />} />
            </Routes>
          )}
        </main>
    </Router>

      <Footer />
    </div>
  );
}

export default App;