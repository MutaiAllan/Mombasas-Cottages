from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, validators
from sqlalchemy.ext.hybrid import hybrid_property
#Added config.py to prevent circular imports
from config import db, bcrypt

#db = SQLAlchemy()

class User(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    #Changed `password` to `_password_hash` to store hashed passwords in the db.
    _password_hash = db.Column(db.String, nullable=False)#Removed 200
    
    # Define one-to-many relationship with reviews
    reviews = db.relationship('Review', backref='user', lazy=True)

    #Hashing the password
    @hybrid_property #Marks `password_hash` as hybrid; custom getter and setter methods
    def password_hash(self):
        return self._password_hash
    
    #Sets the hashed password
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    #Check if the password is correct when logging in
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class DogHouse(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String)
    
    # Define one-to-many relationship with reviews
    reviews = db.relationship('Review', backref='dog_house', lazy=True)

    def serialize(self):
            return {
                'id': self.id,
                'name': self.name,
                'location': self.location,
                'description': self.description,
                'image': self.image,
                'reviews': [review.serialize() for review in self.reviews]
            }

class Review(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    
    # Define many-to-one relationship with users
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Define many-to-one relationship with dog houses
    dog_house_id = db.Column(db.Integer, db.ForeignKey('dog_house.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'content': self.content,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'dog_house_id': self.dog_house_id
        }

# class UserForm(FlaskForm):
#     username = StringField('Username', [validators.Length(min=4, max=80), validators.DataRequired()])
#     email = StringField('Email', [validators.Email(), validators.DataRequired()])
#     password = StringField('Password', [validators.Length(min=6), validators.DataRequired()])

# class DogHouseForm(FlaskForm):
#     name = StringField('Name', [validators.Length(min=2, max=100), validators.DataRequired()])
#     location = StringField('Location', [validators.Length(min=1, max=200), validators.DataRequired()])
#     description = TextAreaField('Description', [validators.Length(max=200)])

# class ReviewForm(FlaskForm):
#     rating = IntegerField('Rating', [validators.NumberRange(min=1, max=5), validators.DataRequired()])
#     content = TextAreaField('Content', [validators.Length(max=1000)])
