from flask import Flask, jsonify, render_template, request
import os
## from flask.ext.heroku import Heroku

app = Flask(__name__)
## heroku = Heroku(app)

app.config["DEBUG"] = True  # Only include this while you are testing your app

@app.route("/")
def main():
    return render_template("index.html")


@app.route("/results", methods=['GET'])
def results():
    return render_template("results.html")

@app.errorhandler(404)
def page_not_found(error):
    return "Sorry, this page was not found.", 404

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
