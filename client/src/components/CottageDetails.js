import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './CottageDetails.css';
import { Spinner } from "react-bootstrap"


function CottageDetails() {
    const { id } = useParams();
    const [cottage, setCottage] = useState(null);

    useEffect(() => {
        fetch(`/dog_houses/${id}`)
            .then((response) => response.json())
            .then((data) => setCottage(data))
            .catch((error) => console.error("Error fetching data:", error));
        }, [id]);

    if (!cottage) {
        return <div className="container mt-12">Loading...</div>;
    }

    return (
        <div className="container_details">
            <h2>{cottage.name}</h2>
            <div className="row_details">
                <div className="col-md-8">
                    <img src={cottage.image} alt={cottage.name} className="img-fluid" />
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Location</h5>
                            <p className="card-text">{cottage.location}</p>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Description</h5>
                            <p className="card-text">{cottage.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mt-4">Reviews</h3>
            <div className="list-group">
                {cottage.reviews.map((review) => (
                    <div key={review.id} className="list-group-item">
                        <h5 className="card-title">Rating: {review.rating}</h5>
                        <p className="card-text">Content: {review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default CottageDetails;

// onClick={handleNewReview}