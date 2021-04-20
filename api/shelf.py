from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

from better_profanity import profanity
from fake_useragent import UserAgent
from bson.json_util import dumps
from cachetools import TTLCache
from bs4 import BeautifulSoup
from bookcover import draw
from waitress import serve
from route import Route

import urllib.request
import validators
import tldextract
import base64
import json
import time
import os

explore_cache = TTLCache(maxsize=100, ttl=360)
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://db/prd"
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
    seen_resource_urls = set()
    
    if profanity.contains_profanity(title):
        raise Exception("Title field cannot contain profanity (categorized by https://pypi.org/project/better-profanity/)")

    if profanity.contains_profanity(creator):
        raise Exception("Creator field cannot contain profanity (categorized by https://pypi.org/project/better-profanity/)")

    for resource_url in json_data["resources"]:
        resource_url = resource_url.strip().lower()

        if resource_url != "" and validators.url(resource_url) and resource_url not in seen_resource_urls:
            cover_creator = tldextract.extract(resource_url).domain
            cover_filename = shelf_id + ".jpg"
            cover_subtitle = ""

            try:
                req = urllib.request.Request(
                    url=resource_url, 
                    headers={"User-Agent": user_agent.random}
                )
                soup = BeautifulSoup(urllib.request.urlopen(req))
                cover_title = soup.title.string
            except:
                cover_title = resource_url

            resource_image = get_encoded_cover_image(
                title=cover_title,
                subtitle=cover_subtitle,
                creator=cover_creator,
                filename=cover_filename,
            )

            seen_resource_urls.add(resource_url)

            resources.append({
                "url": resource_url,
                "image": resource_image,
            })

        if len(resources) == MAX_RESOURCE_LENGTH:
            break

    if title == "":
        title = "untitled"

    if creator == "":
        creator = "anonymous"

    if len(resources) == 0:
        raise Exception("At least one valid URL is required in the resource list")

    return {
        "_id": shelf_id,
        "created": time.time(),
        "title": title[:MAX_TITLE_LENGTH],
        "creator": creator[:MAX_CREATOR_LENGTH],
        "resources": resources[:MAX_RESOURCE_LENGTH],
        "views": 0,
    }


def _generate_id():
    random_string = base64.b64encode(os.urandom(32))[:8].decode("utf-8")
    cleaned_string = "".join(c for c in random_string if c.isalnum())
    return cleaned_string


# TODO encode without saving locally
def get_encoded_cover_image(title, subtitle, creator, filename):
    try:
        draw(title, subtitle, creator).save(filename)

        with open(filename, "rb") as f:
            encoded_image = base64.b64encode(f.read())

        os.remove(os.getcwd() + "/" + filename)
    except:
        encoded_image = default_image

    return dumps(encoded_image)


@app.route(Route.FIND_SHELF, methods=["GET"])
def find_shelf(shelf_id, count_view):
    count_view = count_view == "true"

    try:
        if count_view:
            shelf = mongo.db.shelf.find_one_and_update({"_id": shelf_id}, {"$inc": {"views": 1}}, upsert = False)
        else:
            shelf = mongo.db.shelf.find_one({"_id": shelf_id})

        if shelf == None:
            raise Exception("Invalid shelf id")

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
def find_shelves():
    try:
        # if EXPLORE_CACHE_KEY in explore_cache:
        #     return explore_cache[EXPLORE_CACHE_KEY]

        projection = {
            "created": 1,
            "views": 1,
            "title": 1,
            "resources_size": {
                "$size": "$resources",
            },
        }
        shelves = mongo.db.shelf.find({}, projection).limit(EXPLORE_TABLE_LIMIT)
        message = dumps(shelves)
        status_code = 200
    except Exception as e:
        message = str(e)
        status_code = 404

    # explore_cache[EXPLORE_CACHE_KEY] = jsonify({
    #     "message": message,
    #     "statusCode": status_code,
    # })

    # return explore_cache[EXPLORE_CACHE_KEY]
    
    return jsonify({
        "message": message,
        "statusCode": status_code,
    })

EXPLORE_TABLE_LIMIT = 250
EXPLORE_CACHE_KEY = "explore"
MAX_TITLE_LENGTH = 100
MAX_CREATOR_LENGTH = 30
MAX_RESOURCE_LENGTH = 50

user_agent = UserAgent()
default_image = open('default_image').read()

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5001)
