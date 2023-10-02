from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validate

db = SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    
    # Define one-to-many relationship with reviews
    reviews = db.relationship('Review', backref='user', lazy=True)

    # Dog House Model
class DogHouse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    
    # Define one-to-many relationship with reviews
    reviews = db.relationship('Review', backref='dog_house', lazy=True)

# Review Model (Reciprocal Many-to-Many)
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    
    # Define many-to-one relationship with users
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Define many-to-one relationship with dog houses
    dog_house_id = db.Column(db.Integer, db.ForeignKey('dog_house.id'), nullable=False)