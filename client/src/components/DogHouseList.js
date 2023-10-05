import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewDoghouse from "./NewDogHouse";
import { useNavigate } from "react-router-dom";

function DogHouseList() {
    const [dogHouses, setDogHouses] = useState([]);
    const navigate = useNavigate();

    const handleNewDogHouse = () => {
        navigate("/new_dog_house");
      };

    useEffect(() => {
        // Fetch the list of doghouses from the provided API endpoint
        fetch("/dog_houses")
            .then((response) => response.json())
            .then((data) => setDogHouses(data))
            .catch((error) => console.error("Error fetching data: ", error));
        }, []);

        
    return (
        <div>
            <h2>Dog Houses</h2>
             <button onClick={handleNewDogHouse}>New Dog House</button>
                <ul>
                    {dogHouses.map((dogHouse) => (
                    <li key={dogHouse.id}>
                        <Link to={`/dog_houses/${dogHouse.id}`}>
                            <div>
                                <h3>{dogHouse.name}</h3>
                                <img src={dogHouse.image} alt={dogHouse.name} />
                                <p>Location: {dogHouse.location}</p>
                                <p>Description: {dogHouse.description}</p>
                            </div>
                        </Link>
                    </li>
                    ))}
                </ul>
        </div>
    );
}

export default DogHouseList;
