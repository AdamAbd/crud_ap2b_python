import mysql.connector


def connect_to_database():
    # Connect to the MySQL database
    cnx = mysql.connector.connect(user='root', password='',
                                  host='localhost',
                                  database='registration')
    return cnx


def create_cursor(connection):
    # Create a cursor object to execute SQL queries
    cursor = connection.cursor()
    return cursor
