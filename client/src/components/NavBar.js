import React from "react";
import SearchBar from "./SearchBar";
import "./Nav.css"

function NavBar({ searchTerm, setSearchTerm}) {
    return (
        <div className="navbar">
            <div className="doghouse">DogHouse 254</div>
            <div className="searchbar">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
            <div className="signup">            
                <button>Sign Up</button>
            </div>
            <div className="login">            
                <button>Log In</button>
            </div>
        </div>
    )
}

export default NavBar;