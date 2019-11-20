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

@bp.route('/edit/<id>', methods=['POST'])
def editdata(id):
    if 'data' in request and request.method=='POST':
        try:
            db = get_db()
            values = list(request['data'].values())
            component_info = db.execute(
                ''' UPDATE components
                    SET contexturl=?,
                      etag=?,
                      redfishid=?,
                      name=?,
                      oem=?,
                      description=?,
                      address=?,
                      status=?,
                      last_update=?
                    WHERE id =?
                ''',values
            )

            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        except:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@bp.route('/add', methods=['POST'])
def adddata():
    if 'data' in request and request.method=='POST':
        try:
            db = get_db()
            values = list(request['data'].values())
            component_info = db.execute(
                ''' INSERT INTO components contexturl=?,
                  etag,
                  redfishid,
                  name,
                  oem,
                  description,
                  address,
                  status,
                  last_update)
               VALUES (?,?,?,?,?,?,?,?)"
                ''',values
            )

            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
        except:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
