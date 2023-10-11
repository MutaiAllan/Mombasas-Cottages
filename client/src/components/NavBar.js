import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Nav.css";

function NavBar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLogInClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(null))
        navigate("/");
      }
    });
  };

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
                navigate("/dog_houses")
            }
            })
        .catch((error) => {
        console.error("Error fetching data:", error);
            });
    }, [navigate]);

  return (
    <div className="navbar">
      <div className="nav_bar doghouse">Mombasa Cottages</div>
          <div className="nav_bar searchbar">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          {user ? (
            <div className="nav_bar user-actions">
              <div className="username">{user.username}</div>
              <button onClick={handleLogoutClick} className="btn btn-danger">Logout</button>
            </div>
          ) : (
            <div className="nav_bar auth-actions">
              <button onClick={handleSignUpClick} className="btn btn-danger">Sign Up</button>
              <button onClick={handleLogInClick} className="btn btn-info">Log In</button>
            </div>
          )}
    </div>
  );
}

export default NavBar;
