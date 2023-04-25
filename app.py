#!/usr/bin/python3

from flask import Flask#, request, session
from flask import render_template


import Db


#FLASK INIT
app = Flask(__name__)
app.secret_key = b'Je3enbFx30r8p8yhpGK+ujZMW0Q' #for cookie




@app.route('/')
def index():
 return render_template('index.html')





@app.route('/checkDB')
def checkDB():
 html = []
 
 conn, c = Db.connect()
 html.append("c: ")
 html.append(str(c))
 html.append("<br />\nconn: ")
 html.append(str(conn))
 
 Db.close(conn)
 
 return "".join(html)

@app.route('/create')
def create():
 return "Welcome"

