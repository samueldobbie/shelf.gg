from flask import Flask, request
from flask_pymongo import PyMongo

from route import Route

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/loc"
mongo = PyMongo(app)

@app.route(Route.CREATE_SHELF, methods=["POST"])
def create_shelf():
    try:
        mongo.db.shelf.insert(request.json)
        message = "created"
        status_code = 200
    except Exception as e:
        message = str(e)
        status_code = 400

    return message, status_code
