from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, DogHouse, DogHouseForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dog_house_db_user:IpxSKYa5XsKJnHSqlrAnXPAvBeHPN0L4@dpg-ckdh6tkiibqc73cm9ot0-a.oregon-postgres.render.com/dog_house_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the SQLAlchemy instance
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# Route to get a list of dog houses
@app.route('/dog_houses', methods=['GET'])
def get_dog_houses():
    dog_houses = DogHouse.query.all()
    dog_houses_data = [dog_house.serialize() for dog_house in dog_houses]
    return jsonify(dog_houses_data)

# Route to create a new dog house
@app.route('/dog_houses', methods=['POST'])
def create_dog_house():
    form = DogHouseForm(request.form)
    if form.validate():
        new_dog_house = DogHouse(name=form.name.data, location=form.location.data, description=form.description.data)
        db.session.add(new_dog_house)
        db.session.commit()
        return jsonify({'message': 'Dog house created successfully'})
    else:
        return jsonify({'error': 'Invalid data'})

# Route to get a specific dog house by ID
@app.route('/dog_houses/<int:dog_house_id>', methods=['GET'])
def get_dog_house(dog_house_id):
    dog_house = DogHouse.query.get(dog_house_id)
    if dog_house:
        return jsonify(dog_house.serialize())
    else:
        return jsonify({'error': 'Dog house not found'})

# Add routes 

if __name__ == '__main__':
    app.run(debug=True)
