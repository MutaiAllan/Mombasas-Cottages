from faker import Faker
from sqlalchemy import func
from app import app
from models import db, User, DogHouse, Review  
import random

fake = Faker()

dog_house_names = ["Dog Palace", "Hound Town", "Paw Palace", "Furry Friends", "Dog Spot", "Dog Court", "Mans Best Friend", "Dog Hotel", "House of Dogs", "Pups & You"]
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
dog_house_images = [
    "https://rb.gy/bkuiq",
    "https://rb.gy/bkuiq",
    "https://t.ly/-g-UU",
    "https://t.ly/eewCZ",
    "https://t.ly/39lZL",
    "https://t.ly/Nh10x",
    "https://t.ly/6dnHJ",
    "https://t.ly/-g-UU",
    "https://t.ly/eewCZ",
    "https://rb.gy/bkuiq"
]

def seed_database():
    with app.app_context():

        db.create_all()

        Review.query.delete()
        User.query.delete()
        DogHouse.query.delete()
        
        for _ in range(5):
            user = User(username=fake.user_name(), email=fake.email(), password_hash=fake.password())
            db.session.add(user)

        for i in range(10):
            description = random.choice(descriptions)
            dog_house = DogHouse(
                name=dog_house_names[i], 
                location=fake.address(), 
                description=description,
                image=dog_house_images[i]
                )
            
            db.session.add(dog_house)

        for _ in range(20):
            random_user = User.query.order_by(func.random()).first()
            random_dog_house = DogHouse.query.order_by(func.random()).first()
            
            rating = fake.random_int(min=1, max=5)
            if rating < 3:
                review_content = random.choice(bad_reviews)
            else:
                review_content = random.choice(good_reviews)
            
            review = Review(rating=rating, content=review_content, user=random_user, dog_house=random_dog_house)
            db.session.add(review)

        db.session.commit()
        

if __name__ == '__main__':
    seed_database()
    print("Database seeded successfully!")