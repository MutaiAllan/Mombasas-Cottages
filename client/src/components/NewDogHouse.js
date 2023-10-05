import React, { useState } from "react";
import { Link } from "react-router-dom";

function NewDoghouse() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [dogHouse, setDogHouse] = useState([])

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
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Add new dog house</h1>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br></br>

            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              autoComplete="off"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            /><br></br>

            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
            /><br></br>

            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              autoComplete="off"
            /><br></br>
            <button type="submit">Submit</button>
          </form>

        </div>
      );

}

export default NewDoghouse;