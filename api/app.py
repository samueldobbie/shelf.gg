from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

import urllib.request
import tldextract

app = Flask(__name__)
CORS(app)

@app.route("/public/v1/extract-meta", methods=["GET"])
def extract_meta():
    data = request.get_json(force=True)
    url = data["url"]

    title = get_title(url)
    domain = tldextract.extract(url).domain

    return jsonify({ "title": title, "domain": domain })

def get_title(url):
    try:
        headers = { "User-Agent": user_agent.random }
        req = urllib.request.Request(url=url, headers=headers)
        soup = BeautifulSoup(urllib.request.urlopen(req))
        return soup.title.string
    except:
        return url

user_agent = UserAgent()
