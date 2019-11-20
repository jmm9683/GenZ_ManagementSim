from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, send_from_directory
)
from werkzeug.exceptions import abort
from flask import request
import json
import pickle
import os.path
from flask import current_app

# from flaskr.auth_controller import login_required
from db import get_db

bp = Blueprint('home', __name__)

@bp.route('/', methods=['GET'])
def index():
    db = get_db()
    components = db.execute(
        'SELECT * FROM components'
    ).fetchall()
    return render_template('index.html', components=components,number=len(components))

@bp.route('/component/<id>', methods=['GET'])
def component(id):
    db = get_db()
    component_info = db.execute(
        'SELECT * FROM components WHERE id =?',[id]
    ).fetchone()

    component_info = dict(component_info)

    # add a 

    return json.dumps(component_info)


    # find component in database and return it in json format

@bp.route('/components', methods=['GET'])
def components_status():
    db = get_db()
    component_info = db.execute(
        'SELECT * FROM components'
    ).fetchall()

    component_info = [dict(i) for i in component_info]

    return json.dumps(component_info)


    # find component in database and return it in json format