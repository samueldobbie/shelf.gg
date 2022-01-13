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
    result = []

    # TODO run in parallel
    for url in urls:
        site_name = tldextract.extract(url).domain
        soup = get_soup(url)

        if soup is None:
            data = get_default_data(
                url=url,
                site_name=site_name,
            )
        else:
            data = parse_soup_data(
                soup=soup,
                url=url,
                site_name=site_name,
            )

        result.append(data)

    return jsonify({ "result": result })

def get_soup(url):
    try:
        headers = { "User-Agent": user_agent.random }
        http_request = urllib.request.Request(url, headers=headers)
        http_response = urllib.request.urlopen(http_request, timeout=5)
        return BeautifulSoup(http_response)
    except:
        return None

def get_default_data(url, site_name):
    site_type = "website"
    site_description = ""
    site_image = ""

    return {
        "url": url,
        "siteTitle": url,
        "siteName": site_name,
        "siteType": site_type,
        "siteDescription": site_description,
        "siteImage": site_image,
    }

def parse_soup_data(soup, url, site_name):
    site_title = soup.title.string

    site_name = get_meta_or_default(
        soup=soup,
        property="og:site_name",
        default=site_name,
    )

    site_type = get_meta_or_default(
        soup=soup,
        property="og:type",
        default="website",
    )

    site_description = get_meta_or_default(
        soup=soup,
        property="og:description",
        default="",
    )
    
    site_image = get_meta_or_default(
        soup=soup,
        property="og:image",
        default="",
    )

    return {
        "url": url,
        "siteTitle": site_title,
        "siteName": site_name,
        "siteType": site_type,
        "siteDescription": site_description,
        "siteImage": site_image,
    }

def get_meta_or_default(soup, property, default):
    meta = soup.find("meta", property=property)

    if meta is not None and meta != "":
        return meta["content"]
    else:
        return default

user_agent = UserAgent()
