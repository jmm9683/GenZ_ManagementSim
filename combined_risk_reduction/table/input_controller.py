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

@bp.route('/edit/<redfishid>', methods=['POST'])
def editdata(redfishid):
    if (request.data is not None) and request.method=='POST':
        db = get_db()
        data = json.loads(request.data)

        contexturl = data['contexturl']
        etag = data['etag']
        name = data['name']
        oem = data['oem']
        description = data['description']
        address = data['address']
        status = data['status']
        last_update = data['last_update']

        component_info = db.execute(
            ''' UPDATE components
                SET contexturl=?,
                  etag=?,
                  name=?,
                  oem=?,
                  description=?,
                  address=?,
                  status=?,
                  last_update=?
                WHERE redfishid =?
            ''',[contexturl,etag,name,oem,description,address,status,last_update,redfishid]
        )
        db.commit()
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@bp.route('/add', methods=['POST'])
def adddata():
    if (request.data is not None) and request.method=='POST':
        db = get_db()
        data = json.loads(request.data)


        contexturl = data['contexturl']
        etag = data['etag']
        redfishid = data['redfishid']
        name = data['name']
        oem = data['oem']
        description = data['description']
        address = data['address']
        status = data['status']
        last_update = data['last_update']

        db.execute(
            ''' INSERT INTO components
              (contexturl,
              etag,
              redfishid,
              name,
              oem,
              description,
              address,
              status,
              last_update)
           VALUES (?,?,?,?,?,?,?,?,?)
            ''',[contexturl,etag,redfishid,name,oem,description,address,status,last_update]
        )

        db.commit()

        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

    return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
