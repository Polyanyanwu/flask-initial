""" initial flast module"""

import os
import json
from flask import Flask, render_template, request, flash
if os.path.exists("env.py"):
    import env

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")


@app.route("/")
def index():
    """ index page """
    return render_template("index.html")


@app.route("/about")
def about():
    """about page"""
    data = []
    with open("data/company.json", "r", encoding="utf8") as json_data:
        data = json.load(json_data)
    return render_template("about.html", page_title="About", company=data)


@app.route("/about/<member_name>")
def about_member(member_name):
    """ return each member page automatically """
    member = {}
    with open("data/company.json", "r", encoding="utf8") as json_data:
        data = json.load(json_data)
        for obj in data:
            if obj["url"] == member_name:
                member = obj
    return render_template("member.html", member=member)
    # return "<h1>" + member["name"] + "</h1>"


@app.route("/contact", methods=["GET", "POST"])
def contact():
    """ contact us """
    if request.method == "POST":
        flash(f"Thanks, we have received your message! {request.form.get('name')}")
        # print(request.form["name"])
        # print(request.form.get("email"))
        # print(request.form.get("messag1e"))  # better to use the .get since if the key doesnt exist it will return None instead of crashing
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
