import React, { useState } from "react";

function NewReview() {

    const [user_id, setUserId] = useState("");
    const [dog_house_id, setDogHouseId] = useState("");
    const [rating, setRating] = useState("");
    const [content, setContent] = useState("");
    const [review, setReview] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            content,
            user_id,
            dog_house_id,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((review) => setReview(review));
          }
        });
    }

    return (
        <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <h1>Add Review</h1>
  
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="text"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              autoComplete="off"
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoComplete="off"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">
              User Id
            </label>
            <input
              type="text"
              id="user_id"
              autoComplete="off"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dog_house_id" className="form-label">
              Dog House Id
            </label>
            <input
              type="text"
              id="dog_house_id"
              autoComplete="off"
              value={dog_house_id}
              onChange={(e) => setDogHouseId(e.target.value)}
              className="form-control"
            />
          </div>
  
          <button type="submit" className="btn btn-info">
            Submit Review
          </button>
        </form>
      </div>
    );
}

export default NewReview;