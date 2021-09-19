from flask import Flask, jsonify, request, session, redirect
import json
import sys
from bson.json_util import dumps,loads

class User:
    def startSession(self,user, USER): 
        USER['logged_in'] = True
        USER['user'] = json.loads(dumps(user))
        print(f"{USER} here4 ", file=sys.stderr)
        return json.loads(dumps(user)), 200

    def signIn(self, db, USER):
        userData = json.loads(request.get_data().decode('utf-8'))
        
        result = db.db.collection.find_one({"email":userData["email"]})
        if result is None:
            return jsonify("failed user"), 201
        else:
            user = result
        print(user, file=sys.stderr)
        return self.startSession(user, USER)

    def signOut(self,USER):
        USER.clear()
        return redirect('/')
