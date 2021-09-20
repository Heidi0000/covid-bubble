import sys
import json

from flask_cors import CORS, cross_origin
from flask import Flask, request, session, redirect, render_template
from flask.helpers import send_from_directory
from flask_pymongo import pymongo
from functools import wraps
from bson.json_util import dumps,loads
class Graph:
    def __init__(self):
            #user_email: friend1Email, friend2Email, ...

        graph_dict = {}
            #user_email: node

        node_dict = {}

    

class Node:
    def __init__(self, db_data):
        #random... value from what to what? pixels?
        self.x=10
        self.y=10
        self.db_data = db_data

def getGraph(db, userEmail):
    visited = []
    graph = Graph()
    graph_dict = {}
    node_dict = {}
    recursiveFunct(visited, db, userEmail, graph_dict, node_dict)
    return graph_dict, node_dict


def recursiveFunct(visited,db, userEmail, graph_dict, node_dict):
    if userEmail not in visited and userEmail != "" :
        visited.append(userEmail)

        filter = {"email" : userEmail}
        db_data= json.loads(dumps(db.db.collection.find_one(filter)))
        userNode = Node(db_data)
        node_dict.update({userEmail : userNode} )

        if db_data:
            # print(userNode.db_data.get('name'), file=sys.stderr)
            userFriendsList = db_data.get('friends')
        else:
            userFriendsList = ""
        graph_dict.update({userEmail : userFriendsList})

        for friendEmail in userFriendsList:
            recursiveFunct(visited, db, friendEmail, graph_dict, node_dict)



'''
global graph?
recursive function(visited_array, db, userEmail)
{
    -if(useremail not in visited)
        - add useremail to visited

        - create node for user
        -add the node to node_list like {user: node}

        -get user's friends list from db
        - add {user: friends list} to graph
        for friend in friend_list
            recurse(visited_array, db, friendEmail)
}


'''