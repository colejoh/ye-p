from flask import Flask, jsonify, render_template

app = Flask(__name__)
app.config["DEBUG"] = True  # Only include this while you are testing your app

@app.route("/")
def hello():
    return render_template("ye-p/index.html")

@app.errorhandler(404)
def page_not_found(error):
    return "Sorry, this page was not found.", 404

if __name__ == "__main__":
    app.run(host="0.0.0.0")
