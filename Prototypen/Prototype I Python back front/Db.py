import mysql.connector
import db_config

def connect():
 conn = mysql.connector.connect(user=db_config.user, password=db_config.pw, database=db_config.name, unix_socket=db_config.socket)

 c = conn.cursor()
 return [conn, c]

def close(conn):
 conn.close()


