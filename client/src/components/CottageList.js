import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCottageContext } from "./CottageContext";


function CottageList() {
  const { cottages } = useCottageContext();
  const navigate = useNavigate();

  const handleNewCottage = () => {
    navigate("/new_cottage");
  };
          
    return (
        <div className="container mt-5">
            <h2>Welcome to Mombasa cottages! Most affordable and quality cottages.</h2>
             <button onClick={handleNewCottage} className="btn btn-info">AddNew Cottage</button>
                <div className="row">
                    {cottages.map((cottage) => (
                    <div key={cottage.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                src={cottage.image}
                                alt={cottage.name}
                                className="card-img-top img-fluid"
                              />
                              <div className="card-body">
                                <h3 className="card-title">{cottage.name}</h3>
                                <p className="card-text">Location: {cottage.location}</p>
                                <p className="card-text">Description: {cottage.description}</p>
                                <Link to={`/cottages/${cottage.id}`} className="btn btn-info">
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


export default CottageList;
