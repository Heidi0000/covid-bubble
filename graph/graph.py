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

    # def get(self, field):
    #     return self.db_data.get(field)

def getGraph(db, userEmail):
    visited = []
    graph = Graph()
    graph_dict = {}
    node_dict = {}
    recursiveFunct(visited, db, userEmail, graph_dict, node_dict)
    print("COMEE", graph_dict, file=sys.stderr)
    # print("COMEON", node_dict['heidi'].db_data.get('friends'), file=sys.stderr)
    # print("COMEON", node_dict['heidi'].db_data.get('email'), file=sys.stderr)

    getD3Nodes(node_dict)
    getD3Links(graph_dict, node_dict)
    return graph_dict, node_dict


def recursiveFunct(visited,db, userEmail, graph_dict, node_dict):
    if userEmail not in visited and userEmail != "" :
        visited.append(userEmail)

        filter = {"email" : userEmail}
        db_data= json.loads(dumps(db.db.collection.find_one(filter)))
        userNode = Node(db_data)
        node_dict.update({userEmail : userNode} )

        if db_data:
            print("FFF", userNode.db_data.get('name'), file=sys.stderr)
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

def getD3Nodes(node_dict):
    print("sdf")
    nodes = []
    for node in node_dict:
        name = node
        if node_dict[node].db_data is None:
            email = name + "NOEMAIL"
        else:
            email = node_dict[node].db_data.get('email')

        nodes.append({'name':name, 'email':email})
    return nodes


def create_link(source, target, links):
    links.append({"source": source, "target":target})

def getD3Links(graph_dict, node_dict):

    link_dict = {}
    links = []
    for user in graph_dict:
        for friend in graph_dict[user]:
            if user in link_dict:
                if(friend in link_dict[user] ):
                    continue
                else:
                    if friend in link_dict:
                        somelist = link_dict[friend]
                        somelist.append(user)
                        
                        link_dict[friend] = somelist
                        create_link(user, friend, links)
                    else:
                        link_dict[friend] = [user]
                        create_link(user, friend, links)
            else:
                create_link(user, friend,links)
                link_dict[friend] = [user]
    print(links, file=sys.stderr)
    return links