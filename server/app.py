from flask import Flask, jsonify, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from models import DogHouse, User, Review
from config import app, db, api

# Route to get a list of dog houses
@app.route('/dog_houses', methods=['GET'])
def get_dog_houses():
    dog_houses = DogHouse.query.all()
    dog_houses_data = [dog_house.serialize() for dog_house in dog_houses]
    return jsonify(dog_houses_data)

# Route to create a new dog house
@app.route('/dog_houses', methods=['POST'])
def create_dog_house():
    data = request.get_json()  # Parse JSON data from the request
    if data:
        # Extract data from the JSON object
        name = data.get('name')
        location = data.get('location')
        description = data.get('description')
        image = data.get()

        if name and location:
            new_dog_house = DogHouse(name=name, location=location, description=description)
            db.session.add(new_dog_house)
            db.session.commit()
            return jsonify({'message': 'Dog house created successfully'})
        else:
            return jsonify({'error': 'Name and location are required fields'})
    else:
        return jsonify({'error': 'Invalid JSON data'})


# Route to update a dog house by its ID
@app.route('/dog_houses/<int:dog_house_id>', methods=['PATCH'])
def update_dog_house(dog_house_id):
    data = request.get_json()  
    if data:
        # Check if the dog house with the given ID exists
        dog_house = db.session.get(DogHouse, dog_house_id)
        if dog_house:
            # Extract data from the JSON object
            name = data.get('name')
            location = data.get('location')
            description = data.get('description')
            image = data.get('image')

            # Update the dog house attributes if they are provided in the JSON data
            if name is not None:
                dog_house.name = name
            if location is not None:
                dog_house.location = location
            if description is not None:
                dog_house.description = description
            if image is not None:
                dog_house.image = image

            db.session.commit()
            return jsonify({'message': 'Dog house updated successfully'})
        else:
            return jsonify({'error': 'Dog house with the provided ID not found'})
    else:
        return jsonify({'error': 'Invalid JSON data'})


# Route to get a specific dog house by ID
@app.route('/dog_houses/<int:dog_house_id>', methods=['GET'])
def get_dog_house(dog_house_id):
    dog_house = db.session.get(DogHouse, dog_house_id)
    if dog_house:
        return jsonify(dog_house.serialize())
    else:
        return jsonify({'error': 'Dog house not found'})


# Route for signing up
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # form = UserForm(request.form)

    if data:
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        new_user = User(
            username= username,
            email=email,
            password_hash=password
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'})
    else:
        return jsonify({'error': 'Invalid data'}), 401
    
#Route for Logging in
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 404

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Invalid credentials'}), 404

    user = User.query.filter(User.email == email).first()

    if user is None or not user.authenticate(password):
        return jsonify({'error': 'Invalid credentials'}), 404

    session['user_id'] = user.id
    return jsonify({'message': 'Logged in successfully!'}), 200
    
# Check session for auto-login
@app.route('/check_session')
def check_session():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify({}), 204
    
# Clearing the session after logging out
@app.route('/logout', methods=['DELETE'])
def logout():
    # Clear the user_id session variable to log the user out
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200


# Route to create a new review
@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    if data:
        user_id = session.get('user_id')
        dog_house_id = data.get('dog_house_id')
        rating = data.get('rating')
        content = data.get('content')

        if user_id and dog_house_id and rating:
            review = Review(
                user_id=user_id,
                dog_house_id=dog_house_id,
                rating=rating,
                content=content
            )
            db.session.add(review)
            db.session.commit()
            return jsonify({'message': 'Review created successfully'})
        else:
            return jsonify({'error': 'User ID, Dog House ID, and Rating are required fields'})
    else:
        return jsonify({'error': 'Invalid JSON data'})

# Route to get a specific review by ID
@app.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = db.session.get(Review, review_id)
    if review:
        return jsonify(review.serialize())
    else:
        return jsonify({'error': 'Review not found'})

# Route to update an existing review by ID
@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    data = request.get_json()
    if data:
        review = Review.query.get(review_id)
        if review:
            review.rating = data.get('rating', review.rating)
            review.content = data.get('content', review.content)
            db.session.commit()
            return jsonify({'message': 'Review updated successfully'})
        else:
            return jsonify({'error': 'Review not found'})
    else:
        return jsonify({'error': 'Invalid JSON data'})

# Route to delete a review by ID
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted successfully'})
    else:
        return jsonify({'error': 'Review not found'})

# Route to get all reviews for a specific dog house by its ID
@app.route('/dog_houses/<int:dog_house_id>/reviews', methods=['GET'])
def get_reviews_for_dog_house(dog_house_id):
    dog_house = db.session.get(DogHouse, dog_house_id)
    
    if dog_house:
        reviews = db.session.query(Review).filter_by(dog_house_id=dog_house_id).all()
        reviews_data = [review.serialize() for review in reviews]
        db.session.close()  
        return jsonify(reviews_data)
    else:
        db.session.close()  
        return jsonify({'error': 'Dog house not found'})

if __name__ == '__main__':
    app.run(debug=True, port=5555)
