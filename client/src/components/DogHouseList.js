import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDogHouseContext } from "./DogHouseContext";


function DogHouseList() {
  const { dogHouses } = useDogHouseContext();
  const navigate = useNavigate();

  const handleNewDogHouse = () => {
    navigate("/new_dog_house");
  };

  let cardStyle = {
    width: "18rem",
    height: "28rem",
  };
          
    return (
        <div className="container mt-5">
            <h2>Dog Houses</h2>
             <button onClick={handleNewDogHouse} className="btn btn-info">AddNew Dog House</button>
                <div className="row">
                    {dogHouses.map((dogHouse) => (
                    <div key={dogHouse.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                src={dogHouse.image}
                                alt={dogHouse.name}
                                className="card-img-top img-fluid"
                              />
                              <div className="card-body">
                                <h3 className="card-title">{dogHouse.name}</h3>
                                <p className="card-text">Location: {dogHouse.location}</p>
                                <p className="card-text">Description: {dogHouse.description}</p>
                                <Link to={`/dog_houses/${dogHouse.id}`} className="btn btn-info">
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


export default DogHouseList;
