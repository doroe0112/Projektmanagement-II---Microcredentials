import mysql.connector
import db

def connect():
 conn = mysql.connector.connect(user=db.user, password=db.pw, database=db.name, unix_socket='/run/mysqld/mysqld.sock')
 c = conn.cursor()
 return [conn, c]

def close(conn):
 conn.close()


