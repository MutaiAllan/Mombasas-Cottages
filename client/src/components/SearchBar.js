import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-10">
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Type a dog house to search..."
              value={searchTerm}
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