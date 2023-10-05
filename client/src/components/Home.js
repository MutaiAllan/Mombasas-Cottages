
import React, { useState, useEffect} from "react";
import { Link, Route, Routes } from "react-router-dom";
import DogHouseList from "./DogHouseList";
import DogHouseDetails from "./DogHouseDetails";

function Home() {

    const [dogHouses, setDogHouses] = useState([]);

    useEffect(() => {
        // Fetch the list of doghouses from the provided API endpoint
        fetch("/dog_houses")
            .then((response) => response.json())
            .then((data) => setDogHouses(data))
            .catch((error) => console.error("Error fetching data: ", error));
        }, []);

    return (
        <div>
            <h1>Welcome to DogHouse 254</h1>
            <ul>
                {dogHouses.map((dogHouse) => (
                <li key={dogHouse.id} >
                    <img src={dogHouse.image} alt={dogHouse.name} />
                    
                    <p>Name: <Link to={`/login`}>{dogHouse.name}</Link></p>
                    <p>Location: {dogHouse.location}</p>
                    
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;