import time
import sys
import json

from flask_cors import CORS, cross_origin
from flask import Flask, request, session, redirect, render_template
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
from functools import wraps

# Decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args,**kwargs)
        else:
            return redirect('/')
    return wrap

app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')
app.secret_key = b'9\x9e\x0e\xa34\x8d.Q\xec\x01\xaf\xaeLh\x9c\xe8' 
cors = CORS(app)

CONNECTION_STRING = 'mongodb+srv://Billy:billypassword@cluster0.d2o1j.mongodb.net/mydb?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING, connect=False)
db = client.get_database('mydb')
colll = pymongo.collection.Collection(db, 'people')

from user.models import User

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
    
@app.route('/api', methods = ['GET'])
@cross_origin()
def index():
    return {
        "tutorial": "Flask React"
    }

@app.route('/signup', methods = ['POST'])
@cross_origin()
def signUp():

    userData = json.loads(request.get_data().decode('utf-8'))
    db.db.collection.insert_one(userData)

    x =  '{ "name":"John", "age":30, "city":"New York"}'
    y = json.loads(x)
    return y

@app.route('/signin', methods = ['POST'])
@cross_origin()
def signIn():
    return User().signIn(db)

@app.route('/mainpage',methods=['GET'])
@cross_origin()
@login_required
def mainpage():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__=='__main__':
    app.run()