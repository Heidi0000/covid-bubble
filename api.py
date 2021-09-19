import time
import sys
import json

from flask_cors import CORS, cross_origin
from flask import Flask, request, session, redirect, render_template
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
from functools import wraps

# Decorator


app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')
app.secret_key = "nowayitsbecauseofthekey"
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
cors = CORS(app)

CONNECTION_STRING = 'mongodb+srv://Billy:billypassword@cluster0.d2o1j.mongodb.net/mydb?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING, connect=False)
db = client.get_database('mydb')
colll = pymongo.collection.Collection(db, 'people')
USER = {}

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in USER:
            return f(*args,**kwargs)
        else:
            return redirect('/')
    return wrap

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

    User().signIn(db)
    x =  '{ "name":"signup"}'
    y = json.loads(x)
    return y

@app.route('/signin', methods = ['POST'])
@cross_origin()
def signIn():
    save = User().signIn(db, USER)
    print(f"{session} here6 ", file=sys.stderr)
    return save


@app.route('/signout')
@cross_origin()
def signOut():
    return User().signOut(USER)


@app.route('/mainpage',methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def mainpage():
    return ('',204)

@app.route('/mainpage/session',methods=['GET'])
@cross_origin(supports_credentials=True)
def sessionReturn():
    print(f"{USER} here ", file=sys.stderr)
    return USER['user']

@app.route('/addfriend', methods = ['POST'])
@cross_origin()
def addFriend():

    #should be logged in
    if session.get('logged_in'):  
        print("loggedin", file=sys.stderr)
        

    else:
        print("not logged in :( ", file=sys.stderr)
        friends = json.loads(request.get_data().decode('utf-8'))
        db.db.collection.insert_one(friends)
    friends = json.loads(request.get_data().decode('utf-8'))
    print(type(friends), file=sys.stderr)    
    print(friends, file=sys.stderr)


    x =  '{ "name":"addfriend"}'
    y = json.loads(x)
    return y

@app.route('/setsession')
def setsession():
    session['Username'] = 'Test'
    return f"Session set!"

@app.route('/getsession')
def getsession():
    print(f"{session} here3 ", file=sys.stderr)
    return "session"


@app.route('/')
@cross_origin()
def serve():
    USER.clear()
    return send_from_directory(app.static_folder, 'index.html')




if __name__=='__main__':
    app.run()