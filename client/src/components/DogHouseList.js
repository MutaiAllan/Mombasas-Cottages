import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DogHouseList() {
    const [dogHouses, setDogHouses] = useState([]);

    useEffect(() => {
        // Fetch the list of doghouses from the provided API endpoint
        fetch("/dog_houses")
            .then((response) => response.json())
            .then((data) => console.log(data))

            .catch((error) => console.error("Error fetching data: ", error));
        }, []);

    return (
        <div>
        <h2>Dog Houses</h2>
        <ul>
            {dogHouses.map((dogHouse) => (
            <li key={dogHouse.id}>
                <Link to={`/doghouse/${dogHouse.id}`}>{dogHouse.name}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default DogHouseList;
