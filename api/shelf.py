from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from better_profanity import profanity
from flask_cors import CORS

from route import Route

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/loc"
mongo = PyMongo(app)
CORS(app)

@app.route(Route.CREATE_SHELF, methods=["POST"])
def create_shelf():
    try:
        data = parse_shelf_data(request.json)
        shelf_id = mongo.db.shelf.insert(data)
        message = "xyz"
        status_code = 200
    except Exception as e:
        message = str(e)
        status_code = 400

    return message, status_code

def parse_shelf_data(json_data):
    title = json_data["title"]
    creator = json_data["creator"]
    resources = json_data["resources"]
    
    if profanity.contains_profanity(title):
        raise Exception("Title cannot contain profanity")

    if profanity.contains_profanity(creator):
        raise Exception("Creator cannot contain profanity")

    # TODO validate resource list

    return {
        "title": title,
        "creator": creator,
        "resources": resources,
    }
