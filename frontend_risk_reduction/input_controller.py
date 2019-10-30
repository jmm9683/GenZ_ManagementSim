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
