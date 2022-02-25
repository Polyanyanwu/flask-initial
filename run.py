""" initial flast module"""

import os
from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def index():
    """ index page """
    return render_template("index.html")


@app.route("/about")
def about():
    """ about us page """
    return render_template("about.html", page_title="About", list_of_numbers=[1, 2, 3])


@app.route("/contact")
def contact():
    """ contact us """
    return render_template("contact.html", page_title="Contact Us")


@app.route("/careers")
def careers():
    """ careers us """
    return render_template("careers.html", page_title="Careers")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True)
