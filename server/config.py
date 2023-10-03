from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dog_house_db_user:IpxSKYa5XsKJnHSqlrAnXPAvBeHPN0L4@dpg-ckdh6tkiibqc73cm9ot0-a.oregon-postgres.render.com/dog_house_db'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
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
