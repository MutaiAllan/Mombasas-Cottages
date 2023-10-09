from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kuzzi:K19T804jfy1prp9baIZGKXWc0ZzZi7uV@dpg-ckeefd5tj22c73dl0lqg-a.oregon-postgres.render.com/doghouse_gn5h'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.jsonify_prettify = False  # Adjusted from app.json.compact
app.secret_key = b'#^yiu{/}]`poier343ufe`'

# Initialize the SQLAlchemy instance
app.json.compact = False

db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)
