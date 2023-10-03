from flask import Flask, jsonify, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from models import DogHouse, User
from config import app, db, api

# Route to get a list of dog houses
@app.route('/dog_houses', methods=['GET'])
def get_dog_houses():
    dog_houses = DogHouse.query.all()
    dog_houses_data = [dog_house.serialize() for dog_house in dog_houses]
    return jsonify(dog_houses_data)

# Route to create a new dog house
@app.route('/api/dog_houses', methods=['POST'])
def create_dog_house():
    data = request.get_json()  # Parse JSON data from the request
    if data:
        # Extract data from the JSON object
        name = data.get('name')
        location = data.get('location')
        description = data.get('description')

        if name and location:
            new_dog_house = DogHouse(name=name, location=location, description=description)
            db.session.add(new_dog_house)
            db.session.commit()
            return jsonify({'message': 'Dog house created successfully'})
        else:
            return jsonify({'error': 'Name and location are required fields'})
    else:
        return jsonify({'error': 'Invalid JSON data'})


# Route to get a specific dog house by ID
@app.route('/dog_houses/<int:dog_house_id>', methods=['GET'])
def get_dog_house(dog_house_id):
    dog_house = DogHouse.query.get(dog_house_id)
    if dog_house:
        return jsonify(dog_house.serialize())
    else:
        return jsonify({'error': 'Dog house not found'})

# Add routes 

# Route for signing up
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # form = UserForm(request.form)
    if data:
        new_user = User(
            username= data.get('username'),
            email=data.get('email'),
            password_hash=data.get('password')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'})
    else:
        return jsonify({'error': 'Invalid data'})
    
#Route for Logging in
@app.route('/api/login', methods=['POST'])
def login():
    form = UserForm(request.form)
    email = form.email.data
    user = User.query.filter(User.email == email).first()

    password = form.password.data
    if user.authenticate(password):
        session['user_id'] = user.id
        return jsonify({'message': 'Logged in successfully!'})
    else:
        return jsonify({'error': 'Invalid credentials!'})
    
# Check session for auto-login
@app.route('/api/check_session')
def check_session():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return jsonify(user.to_dict())
    else:
        return '', 204
    
# Clearing the session after logging out
@app.route('/api/logout')
def clear_session():
    session['user_id'] = None

if __name__ == '__main__':
    app.run(debug=True, port=5555)
