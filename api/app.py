from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

import urllib.request
import tldextract

app = Flask(__name__)
CORS(app)

@app.route("/public/v1/extract-meta", methods=["POST"])
def extract_meta():
    data = request.get_json(force=True)
    urls = data["urls"]
    meta = []

    for url in urls:
        title = get_title(url)
        domain = tldextract.extract(url).domain
        meta.append({
            "title":title,
            "domain": domain,
        })

    return jsonify({ "result": meta })

def get_title(url):
    try:
        headers = { "User-Agent": user_agent.random }
        req = urllib.request.Request(url=url, headers=headers)
        soup = BeautifulSoup(urllib.request.urlopen(req))
        return soup.title.string
    except:
        return url

user_agent = UserAgent()
