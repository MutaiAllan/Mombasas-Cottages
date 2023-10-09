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
              className="form-control"
              placeholder="Type a dog house to search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
      </div>
    </div>
  );
}
  
  export default SearchBar;