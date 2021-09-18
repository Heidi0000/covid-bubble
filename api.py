import time
import sys
import json

from flask_cors import CORS, cross_origin
from flask import Flask, request
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')
cors = CORS(app)

CONNECTION_STRING = 'mongodb+srv://Billy:billypassword@cluster0.d2o1j.mongodb.net/mydb?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING, connect=False)
db = client.get_database('mydb')
colll = pymongo.collection.Collection(db, 'people')

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


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__=='__main__':
    app.run()