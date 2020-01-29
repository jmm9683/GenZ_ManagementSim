import os

from flask import Flask
# Import controllers
import input_controller, display_controller

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
    )

    # import db and initialize it
    import db
    db.init_app(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # app.register_blueprint(auth.bp)
    app.register_blueprint(input_controller.bp)
    app.register_blueprint(display_controller.bp)
    app.add_url_rule("/", endpoint="home")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(threaded=True,port=8080,host='0.0.0.0')
