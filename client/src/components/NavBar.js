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
    }, []);

  return (
    <div className="navbar">
      <div className="doghouse">DogHouse 254</div>
      <div className="searchbar">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {user ? (
        <div className="user-actions">
          <div className="username">{user.username}</div>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <div className="auth-actions">
          <button onClick={handleSignUpClick}>Sign Up</button>
          <button onClick={handleLogInClick}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
