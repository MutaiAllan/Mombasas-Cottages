import React, { useState } from "react";

function NewDogHouse() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [setDogHouse] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/dog_houses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            image,
            location,
            description
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((dogHouse) => setDogHouse(dogHouse));
          }
        });
    }


    return (
      <div className="container mt-5">
      <div className="col-md-6">
      <form onSubmit={handleSubmit}>
        <h1>Add new dog house</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            autoComplete="off"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            autoComplete="off"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
      </div>
    </div>
  );
}

export default NewDogHouse;