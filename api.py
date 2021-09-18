import time
import sys
import json
from flask_cors import CORS, cross_origin
from flask import Flask, request
from flask.helpers import send_from_directory
app = Flask(__name__, static_folder ='react-flask-app/build', static_url_path='')
cors = CORS(app)

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
    #app.logger.debug('Body: %s', request.get_data())
    print(request.get_data(),file=sys.stderr)
    x =  '{ "name":"John", "age":30, "city":"New York"}'
    y = json.loads(x)
    return y

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__=='__main__':
    app.run()