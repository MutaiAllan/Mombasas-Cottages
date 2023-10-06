
import React, { useState, useEffect} from "react";
import { Link, Route, Routes } from "react-router-dom";
import DogHouseList from "./DogHouseList";
import DogHouseDetails from "./DogHouseDetails";

function Home() {

    const [dogHouses, setDogHouses] = useState([]);

    // useEffect(() => {
    //     // Fetch the list of doghouses from the provided API endpoint
    //     fetch("/dog_houses")
    //         .then((response) => response.json())
    //         .then((data) => setDogHouses(data))
    //         .catch((error) => console.error("Error fetching data: ", error));
    //     }, []);

    useEffect(() => {
        async function fetchDogHouses() {
          try {
            const res = await fetch("/dog_houses");
            const data = await res.json();
            setDogHouses(data);
          } catch (error) {
            console.log("Error fetching products:", error);
          }
        }
        fetchDogHouses();
      }, []);

    return (
        <div className="container mt-5" background-color="">
            <h1>Welcome to DogHouse 254!</h1>
            <div className="row">
                {dogHouses.map((dogHouse) => (
                  <div key={dogHouse.id} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={dogHouse.image}
                        alt={dogHouse.name}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{dogHouse.name}</h5>
                        <p className="card-text">Location: {dogHouse.location}</p>
                        {/* Add more information here as needed */}
                        <Link to={`/login`} className="btn btn-info">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        

export default Home;