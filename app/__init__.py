from flask import Flask, render_template
from .extensions import register_extensions


def create_app():
    app = Flask(__name__)

    register_extensions(app)

    @app.route("/")
    def index():
        return render_template("index.html")

    return app
