import React from "react";
import { useCottageContext } from "./CottageContext";

function SearchBar() {
  const { setSearchTerm } = useCottageContext();  

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-10">
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Type a cottage to search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
      </div>
    </div>
  );
}
  
  export default SearchBar;