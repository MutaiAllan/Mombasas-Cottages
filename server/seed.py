from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from faker import Faker
from sqlalchemy import func
from app import app, db
from models import User, DogHouse, Review  
import random

fake = Faker()

dog_house_names = ["Dog Palace", "Hound Town", "Paw Palace", "Furry Friends", "Dog Spot", "Dog Court", "Mans Best Friend", "Dog Hotel", "House of Dogs", "Pups & You" ]
descriptions = ["Warm beds available!", "We give treats...", "Large play area.", "No leash policy!", "Friendly groomer.", "Resident therapy dog.", "Cats and Dogs separate!", "Vet on call!", "Grassy fields.", "Clean spacious beds!"]
bad_reviews = [
    "Not a good experience. Facilities were dirty.",
    "Staff was unfriendly and unhelpful.",
    "My dog didn't like it here. Wouldn't recommend.",
    "Facility was overcrowded and noisy.",
    "Poor hygiene, my dog got sick after staying here."
]
good_reviews = [
    "Excellent service! The staff was friendly and attentive.",
    "My dog loved it here! Great play area.",
    "Clean and well-maintained facilities.",
    "Friendly staff, and they provide treats!",
    "Highly recommend! Will definitely come back."
]


def seed_database():

    User.query.delete()
    Review.query.delete()
    DogHouse.query.delete()
    
    for _ in range(5):  
        user = User(username=fake.user_name(), email=fake.email(), password=fake.password())
        db.session.add(user)

    for _ in range(10): 
        dog_house_name = random.choice(dog_house_names)
        description = random.choice(descriptions)
        dog_house = DogHouse(
            name=dog_house_name, 
            location=fake.address(), 
            description=description
            )
        
        db.session.add(dog_house)

    for _ in range(20):  
        random_user = User.query.order_by(func.random()).first()  
        random_dog_house = DogHouse.query.order_by(func.random()).first()  
        
        rating = fake.random_int(min=1, max=10)
        if rating < 6:
            review_content = random.choice(bad_reviews)
        else:
            review_content = random.choice(good_reviews)
        
        review = Review(rating=rating, content=review_content, user=random_user, dog_house=random_dog_house)
        db.session.add(review)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_database()
        print("Database seeded successfully!")