import os
from definitions import ROOT_DIR, ASSETS_DIR
from flask_assets import Environment, Bundle

assets = Environment()


def _register_assets(app):

    assets.init_app(app)

    with app.app_context():
        assets.config["POSTCSS_BIN"] = os.path.join(
            ROOT_DIR, "node_modules", ".bin", "postcss"
        )

    css = Bundle(
        os.path.join(ASSETS_DIR, "css", "main.css"),
        filters="postcss",
        output="gen/main.%(version)s.css",
    )
    assets.register("css", css)


def register_extensions(app):
    _register_assets(app)
    # other extensions
