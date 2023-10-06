import React from "react";
import { useDogHouseContext } from "./DogHouseContext";

function SearchBar() {
  const { setSearchTerm } = useDogHouseContext();  

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-10">
          <input
            type="text"
            id="search"
            placeholder="Type a dog house to search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          <div className="col-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/128/200/200941.png"
            alt="Search Icon"
            className="img-fluid"
            style={{ width: "30px", height: "30px", marginTop: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
  
  export default SearchBar;