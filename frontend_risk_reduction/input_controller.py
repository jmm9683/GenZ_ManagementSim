from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, send_from_directory
)
from werkzeug.exceptions import abort
import json
from db import get_db
from flask import request

# from flaskr.auth_controller import login_required
# from flaskr.db import get_db

bp = Blueprint('input', __name__)

@bp.route('/edit/<id>/<status>', methods=['POST'])
def editdata(id):
    return


@bp.route('/edit/description/<id>', methods=['POST'])
def editdata_description(id):
    db = get_db()
    newDescription = request.form['newDescription']
    executeString = 'UPDATE components SET description=\'' + newDescription + '\' WHERE id =' + id
    component_info = db.execute(
        executeString
    )
    db.commit()
    return "Succesfully Updated the Description for ID = " + id


    # find component in database and return it in json format

