from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from faker import Faker
from sqlalchemy import func
from app import app, db

fake = Faker()

# Import your models
from models import User, DogHouse, Review  

# Function to seed the database with fake data
def seed_database():
    # Create and add users
    for _ in range(5):  # Create 5 users
        user = User(username=fake.user_name(), email=fake.email(), password=fake.password())
        db.session.add(user)

    # Create and add dog houses
    for _ in range(10):  # Create 10 dog houses
        dog_house = DogHouse(name=fake.company(), location=fake.address(), description=fake.text())
        db.session.add(dog_house)

    # Create and add reviews
    for _ in range(20):  # Create 20 reviews
        random_user = User.query.order_by(func.random()).first()  # Get a random user
        random_dog_house = DogHouse.query.order_by(func.random()).first()  # Get a random dog house
        review = Review(rating=fake.random_int(min=1, max=5), content=fake.paragraph(), user=random_user, dog_house=random_dog_house)
        db.session.add(review)

    # Commit the changes to the database
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_database()
        print("Database seeded successfully.")