import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap"

function DogHouseDetails() {
    const { id } = useParams();
    const [dogHouse, setDogHouse] = useState(null);
    // const navigate = Navigate();

    // const handleNewReview = () => {
    //     navigate("/reviews")
    // }

    useEffect(() => {
        // Fetch the details of the specific doghouse by ID from the API
        fetch(`/dog_houses/${id}`)
            .then((response) => response.json())
            .then((data) => setDogHouse(data))
            .catch((error) => console.error("Error fetching data:", error));
        }, [id]);

    if (!dogHouse) {
        return <div className="container mt-12">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{dogHouse.name}</h2>
            <div className="row">
                <div className="col-md-6">
                    <img src={dogHouse.image} alt={dogHouse.name} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Location</h5>
                            <p className="card-text">{dogHouse.location}</p>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Description</h5>
                            <p className="card-text">{dogHouse.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mt-4">Reviews</h3>
            <div className="list-group">
                {dogHouse.reviews.map((review) => (
                    <div key={review.id} className="list-group-item">
                        <h5 className="card-title">Rating: {review.rating}</h5>
                        <p className="card-text">Content: {review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default DogHouseDetails;

// onClick={handleNewReview}