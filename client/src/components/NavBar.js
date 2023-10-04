import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Nav.css";

function NavBar({ searchTerm, setSearchTerm, user, setUser }) {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/api/signup");
  };

  const handleLogInClick = () => {
    navigate("/api/login");
  };

  const handleLogoutClick = () => {
    setUser(null);
  };

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
