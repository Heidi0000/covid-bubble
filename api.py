import time
import sys
import json
import redis

from flask_cors import CORS, cross_origin
from flask import Flask, request, session, redirect, jsonify
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
from flask_session import Session

from pymongo.server_api import ServerApi
from functools import wraps
from bson.json_util import dumps
from graph.graph import getD3Links, getD3Nodes, getGraph

# REACT Login fix
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# Decorator

app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')
CORS(app)
redis_url = 'redis://redistogo:ba08d61dfac2c0829497d77aa6bc3788@crestfish.redistogo.com:10285/'
app.secret_key = "zxcvjklasdkljsadfjknwehjk"
cors = CORS(app)
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_REDIS'] = redis.from_url(redis_url)
# so we need to actually run this but then it does everything so do we rlly need to..
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')

Session(app)


app.config["JWT_SECRET_KEY"] = "asdfnwpowppwpqpasdfasdfasewqhgqhq"
jwt = JWTManager(app)

CONNECTION_STRING = 'mongodb+srv://Billy:billypassword@cluster0.d2o1j.mongodb.net/mydb?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING, server_api=ServerApi('1'))
db = client.get_database('mydb')

#how check for connection
try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

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
    CONNECTION_STRING = 'mongodb+srv://Billy:billypassword@cluster0.d2o1j.mongodb.net/mydb?retryWrites=true&w=majority'
    client = pymongo.MongoClient(CONNECTION_STRING, server_api=ServerApi('1'))
    db = client.get_database('mydb')
    try:
        db.db.collection.insert_one(userData)
    except:
        print("insert_one error")
    data = {}
    data["token"] =  User().signIn(db)
    data["testotherfield"] = "testing"
    return data

@app.route('/signin', methods = ['POST'])
@cross_origin()
def signIn():
    save = User().signIn(db)
    return jsonify(access_token=save)

@app.route('/loadAddFriend',methods=['GET'])
@cross_origin()
@jwt_required()
def loadAddFriend():    
    userEmail = get_jwt_identity()
    print("USEREMAIL",userEmail, file=sys.stderr)
    data = {}
    data["emails"] = check_for_user_friends(userEmail)
    return data

def check_for_user_friends(userEmail):
    filter = {"friends": {"$in": [userEmail]}}
    col = db.db.collection

    find_result = col.find(filter)
    ret = [] #list of of friends emails
    if find_result:
        
        for i in find_result:
            print(i.get("email"), file=sys.stderr)
            ret.append(i.get("email"))
        # somee=find_result.get("email")
    else:
        somee = ":((("
        print(somee, file=sys.stderr)
    print("RET IN API.PY", ret, file=sys.stderr)

    return ret
'''
Here add:
- New endpoint for Addfriend to run when entering the page
- add @cross_origin(), @jwt_required() decorator
- Use the token recieved from frontend to get email of the user
- Use the email to identify the accounts that have already added you
- Return the email in either array or seperate fields
'''

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
    print("EMAIL", email, file=sys.stderr)

    gr, nd = getGraph(db, email)
    filter = {"email" : email}
    db_data= json.loads(dumps(db.db.collection.find_one(filter)))
    if (db_data):
        userName = db_data.get('name')
        data = {}
        data["nodes"] = getD3Nodes(nd, userName=userName, db=db, email=email)
        data["links"] = getD3Links(gr)
        data["user"] = userName
        with open('data.txt', 'w') as json_file:
            json.dump(data,json_file)
        return data
    else:
        return ('',403)

@app.route('/addfriend', methods = ['POST'])
@cross_origin(supports_credentials=True)
@jwt_required()
def addFriend():
    friends = json.loads(request.get_data().decode('utf-8'))
    print(friends, file=sys.stderr)
    friend_arr = []
    for key, friendname in friends.items():
        if friendname != '':
            friend_arr.append(friendname)
            print(friendname, file=sys.stderr)
        else:
            print("NO FRIENDS its fine", file=sys.stderr)
    print(type(friends), file=sys.stderr)    
    print(friend_arr, file=sys.stderr)

    filter = {"email" : get_jwt_identity()}
    friends_to_add = {"$set": { 'friends' : friend_arr}}
    try:
        print("updating db")
        db.db.collection.update_one(filter, friends_to_add)
    except:
        print("update_one error")
    print("done updating db")
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
    app.run(host="0.0.0.0", port=5000)
