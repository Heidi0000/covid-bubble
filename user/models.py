from flask import Flask, jsonify, request, session, redirect
import json
import sys
from bson.json_util import dumps,loads

class User:
    def startSession(self,user): 
        session['logged_in'] = True
        session['user'] = json.loads(dumps(user))
        return json.loads(dumps(user)), 200

    def signIn(self, db):
        userData = json.loads(request.get_data().decode('utf-8'))
        
        result = db.db.collection.find_one({"email":userData["email"]})
        if result is None:
            print("signin failed", file=sys.stderr)
            return jsonify("failed user"), 201
        else:
            user = result
        print("sign yay", file=sys.stderr)

        print(user, file=sys.stderr)
        return self.startSession(user)

    def signOut(self):
        session.clear()
        return redirect('/')
