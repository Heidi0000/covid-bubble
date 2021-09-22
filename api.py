import time
import sys
import json
import redis

from flask_cors import CORS, cross_origin
from flask import Flask, request, session, redirect, render_template
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
from functools import wraps
from bson.json_util import dumps,loads
from graph.graph import getD3Links, getD3Nodes, getGraph

# Decorator


app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')

app.secret_key = "zxcvjklasdkljsadfjknwehjk"
cors = CORS(app)

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

    User().signIn(db)
    return session["user"]

@app.route('/signin', methods = ['POST'])
@cross_origin()
def signIn():
    save = User().signIn(db)
    print(f"{session} here6 ", file=sys.stderr)
    return save


@app.route('/signout')
@cross_origin()
def signOut():
    return User().signOut()


@app.route('/mainpage',methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def mainpage():
    return ('',204)

@app.route('/mainpage/session',methods=['GET'])
@cross_origin(supports_credentials=True)
def sessionReturn():
    print(f"{session} here ", file=sys.stderr)

    gr, nd = getGraph(db, session['user']["email"])
   
    data = {}
    data["nodes"] = getD3Nodes(nd)
    data["links"] = getD3Links(gr)
    data["user"] = session["user"]["name"]
    with open('data.txt', 'w') as json_file:
        json.dump(data,json_file)
    return data

@app.route('/addfriend', methods = ['POST'])
@cross_origin()
@login_required
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
    return send_from_directory(app.static_folder, 'index.html')




if __name__=='__main__':
    app.run()