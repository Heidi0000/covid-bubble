from flask import Flask, jsonify, request, session, redirect
import json
import sys
from bson.json_util import dumps,loads

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class User:
    def startSession(self,user): 
        session['logged_in'] = True
        session['user'] = json.loads(dumps(user))
        return json.loads(dumps(user)), 200

    def signIn(self, db):
        userData = json.loads(request.get_data().decode('utf-8'))
        print(userData, file=sys.stderr)
        result = db.db.collection.find_one({"email":userData["email"]})
        print(result, file=sys.stderr)
        if result is None:
            print("signin failed", file=sys.stderr)
            return jsonify("failed user"), 201
        else:
            if((userData["password"] != result["password"])):
                print("signin failed", file=sys.stderr)
                return jsonify("failed user"), 201
        access_token = create_access_token(identity=userData["email"])
        return access_token

    def signOut(self):
        session.clear()
        print("CLEARED SESSIONS", file=sys.stderr)
        return redirect('/')
