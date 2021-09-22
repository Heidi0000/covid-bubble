import time
import sys
import json
from flask_jwt_extended.jwt_manager import JWTManager
import redis

from flask_cors import CORS, cross_origin
from flask import Flask, request, session, redirect, render_template, jsonify
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
from functools import wraps
from bson.json_util import dumps,loads
from graph.graph import getD3Links, getD3Nodes, getGraph
from flask_session import Session

# REACT Login fix
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


# Decorator


app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')

redis_url = 'redis://redistogo:ba08d61dfac2c0829497d77aa6bc3788@crestfish.redistogo.com:10285/'
app.secret_key = "zxcvjklasdkljsadfjknwehjk"
cors = CORS(app)
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url(redis_url)
Session(app)


app.config["JWT_SECRET_KEY"] = "asdfnwpowppwpqpasdfasdfasewqhgqhq"
jwt = JWTManager(app)


CONNECTION_STRING = 'mongodb+srv://Billy:billypassword@cluster0.d2o1j.mongodb.net/mydb?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING, connect=False)
db = client.get_database('mydb')
colll = pymongo.collection.Collection(db, 'people')

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
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
    userData['friends'] = []
    db.db.collection.insert_one(userData)
    data = {}
    data["token"] =  User().signIn(db)
    data["testotherfield"] = "testing"
    return data

@app.route('/signin', methods = ['POST'])
@cross_origin()
def signIn():
    save = User().signIn(db)
    print(f"{save} here6 ", file=sys.stderr)
    return jsonify(access_token=save)


@app.route('/signout')
@cross_origin()
def signOut():
    return User().signOut()


@app.route('/mainpage',methods=['GET'])
@cross_origin(supports_credentials=True)
def mainpage():
    return ('',204)

@app.route('/mainpage/session',methods=['GET'])
@cross_origin(supports_credentials=True)
@jwt_required()
def sessionReturn():

    email = get_jwt_identity()
    gr, nd = getGraph(db, email)

    filter = {"email" : email}
    db_data= json.loads(dumps(db.db.collection.find_one(filter)))
    if (db_data):
        userName = db_data.get('name')
        data = {}
        data["nodes"] = getD3Nodes(nd, userName)
        data["links"] = getD3Links(gr)
        data["user"] = userName
        with open('data.txt', 'w') as json_file:
            json.dump(data,json_file)
        return data
    else:
        return ('',403)

@app.route('/addfriend', methods = ['POST'])
@cross_origin()
def addFriend():
    friends = json.loads(request.get_data().decode('utf-8'))
    friend_arr = []
    for friend in friends:
        if friends[friend] != '':
            friend_arr.append(friends[friend])
        else:
            print("NO FRIENDS LOL", file=sys.stderr)
    print(type(friends), file=sys.stderr)    
    print(friend_arr, file=sys.stderr)
    
    filter = {"email" : session['user']["email"]}
    friends_to_add = {"$set": { 'friends' : friend_arr}}
    db.db.collection.update_one(filter, friends_to_add)
    # result = db.db.collection.find_one({"email":USER['user']["email"]})
    session['user'] = json.loads(dumps(db.db.collection.find_one(filter)))
    x =  '{ "name":"addfriend"}'
    y = json.loads(x)
    return y

# @app.route('/setsession')
# def setsession():
#     session['Username'] = 'Test'
#     return f"Session set!"

@app.route('/getsession')
def getsession():
    print(f"{session} here3 ", file=sys.stderr)
    return "session"


@app.route('/')
@cross_origin()
def serve():
    session.clear()
    print("CLEARED SESSIONS", file=sys.stderr)
    return send_from_directory(app.static_folder, 'index.html')


if __name__=='__main__':
    app.run()