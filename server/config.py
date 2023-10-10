from dotenv import load_dotenv

load_dotenv()

from flask import Flask, render_template
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
    )

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
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
#

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

api = Api(app)
