from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from better_profanity import profanity
from flask_cors import CORS
from route import Route

import validators
import base64
import json
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
    title = json_data["title"].strip()
    creator = json_data["creator"].strip()
    resources = []
    
    if profanity.contains_profanity(title):
        raise Exception("Title field cannot contain profanity (categorized by https://pypi.org/project/better-profanity/)")

    if profanity.contains_profanity(creator):
        raise Exception("Creator field cannot contain profanity (categorized by https://pypi.org/project/better-profanity/)")

    for resource_url in json_data["resources"]:
        resource_url = resource_url.strip()

        if validators.url(resource_url):
            resources.append(resource_url)

    if title == "":
        title = "untitled"

    if creator == "":
        creator = "anonymous"

    if len(resources) == 0:
        raise Exception("At least one valid URL is required in the resource list")

    return {
        "_id": _generate_id(),
        "title": title[:MAX_TITLE_LENGTH],
        "creator": creator[:MAX_CREATOR_LENGTH],
        "resources": resources[:MAX_RESOURCE_LENGTH],
        "views": 0,
    }

def _generate_id():
    return base64.b64encode(os.urandom(32))[:8].decode("utf-8")

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

MAX_TITLE_LENGTH = 100
MAX_CREATOR_LENGTH = 30
MAX_RESOURCE_LENGTH = 50
