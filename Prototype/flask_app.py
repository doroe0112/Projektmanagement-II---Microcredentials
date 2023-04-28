#!/usr/bin/python3

from flask import Flask#, request, session
from flask import render_template


import Db
import v

#FLASK INIT
app = Flask(__name__)
app.secret_key = b'Je3enbFx30r8p8yhpGK+ujZMW0Q' #for cookie


@app.route('/')
def index():
 return render_template('start.html')

@app.route('/semester/<int:number>')
def semester(number):

 if (number < 1 or number > 6):
  return "Semester doesn't exist."

 conn, c = Db.connect() 
 sql = "select * from mc order by 2"
 c.execute(sql)
 
 result = []
 counter = 0;
 for row in c.fetchall():
  if ( (row[2] >> (number-1)) & 1 ):
   result.append( [row[0], row[1], counter] )
   counter += 1
 Db.close(conn)

 return render_template('sem.html', semester=number, skills=result)

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
 conn, c = Db.connect()
 c.execute("DROP TABLE IF EXISTS mc")
 c.execute(v.mc_table)
 conn.commit()

 sql = "insert into mc(skillname, semester) values(%s, %s)"
 c.executemany(sql, v.skills)
 conn.commit()

 Db.close(conn)

 return "Table deleted and created."


@app.route('/insert')
def insert():
 conn, c = Db.connect()
 Db.close(conn)

 return "Tables filled."
