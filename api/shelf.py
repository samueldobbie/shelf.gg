from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

from better_profanity import profanity
from bson.json_util import dumps
from bookcover import draw
from route import Route

import validators
import base64
import json
import time
import os

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/loc"
mongo = PyMongo(app)
CORS(app)

@app.route(Route.CREATE_SHELF, methods=["POST"])
def create_shelf():
    try:
        data = _parse_shelf_data(request.json)
        shelf_id = mongo.db.shelf.insert(data)
        message = str(shelf_id)
        status_code = 200
    except Exception as e:
        message = str(e)
        status_code = 400

    return jsonify({
        "message": message,
        "statusCode": status_code,
    })

def _parse_shelf_data(json_data):
    shelf_id = _generate_id()
    title = json_data["title"].strip().lower()
    creator = json_data["creator"].strip().lower()
    resources = []
    
    if profanity.contains_profanity(title):
        raise Exception("Title field cannot contain profanity (categorized by https://pypi.org/project/better-profanity/)")

    if profanity.contains_profanity(creator):
        raise Exception("Creator field cannot contain profanity (categorized by https://pypi.org/project/better-profanity/)")

    for resource_url in json_data["resources"]:
        resource_url = resource_url.strip().lower()

        if validators.url(resource_url):
            resources.append(resource_url)

    if title == "":
        title = "untitled"

    if creator == "":
        creator = "anonymous"

    if len(resources) == 0:
        raise Exception("At least one valid URL is required in the resource list")

    encoded_cover_image = get_encoded_cover_image(title, creator, shelf_id)

    return {
        "_id": shelf_id,
        "created": time.time(),
        "title": title[:MAX_TITLE_LENGTH],
        "creator": creator[:MAX_CREATOR_LENGTH],
        "resources": resources[:MAX_RESOURCE_LENGTH],
        "coverImage": encoded_cover_image,
        "views": 1,
    }

def _generate_id():
    return base64.b64encode(os.urandom(32))[:8].decode("utf-8")

# TODO encode without saving locally
def get_encoded_cover_image(title, creator, shelf_id):
    filename = shelf_id + ".jpg"

    draw(title, title, creator).save(filename)

    with open(filename, "rb") as f:
        encoded_image = base64.b64encode(f.read())
    
    # os.remove(filename)
    
    return dumps(encoded_image)

@app.route(Route.FIND_SHELF, methods=["GET"])
def find_shelf(shelf_id):
    try:
        shelf = mongo.db.shelf.find_one_and_update({"_id": shelf_id}, {"$inc": {"views": 1}}, upsert = True)
        message = json.dumps(shelf)
        status_code = 200
    except Exception as e:
        message = str(e)
        status_code = 404

    return jsonify({
        "message": message,
        "statusCode": status_code,
    })


@app.route(Route.FIND_SHELVES, methods=["GET"])
def find_shelves(list_type):
    try:
        if list_type == "popular":
            shelves = mongo.db.shelf.find().sort("views", -1).limit(TABLE_LIMIT)
        elif list_type == "recent":
            shelves = mongo.db.shelf.find().sort("created", -1).limit(TABLE_LIMIT)
        else:
            raise Exception("Invalid table type")

        message = dumps(shelves)
        status_code = 200
    except Exception as e:
        message = str(e)
        status_code = 404

    return jsonify({
        "message": message,
        "statusCode": status_code,
    })

TABLE_LIMIT = 25
MAX_TITLE_LENGTH = 100
MAX_CREATOR_LENGTH = 30
MAX_RESOURCE_LENGTH = 50
