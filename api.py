from flask import Flask, request, jsonify
from database import connect_to_database, create_cursor
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to the database and create a cursor
cnx = connect_to_database()
cursor = create_cursor(cnx)


@app.route('/registrations', methods=['GET'])
def get_registrations():
    # Execute SELECT query to get all registration records
    query = "SELECT * FROM users"
    cursor.execute(query)

    # Fetch all records and convert to a list of dictionaries
    records = cursor.fetchall()
    result = []
    for record in records:
        result.append({
            'No': record[0],
            'Tgl_Pendaftaran': record[1],
            'Nama': record[2],
            'Alamat': record[3],
            'Telp': record[4],
            'Jenis_Kelamin': record[5],
            'Jenis_Kursus': record[6]
        })

    # Return the list of records as JSON
    return jsonify(result)


@app.route('/registrations', methods=['POST'])
def create_registration():
    # Get the data from the request
    registration_data = request.get_json()
    No = registration_data.get('No')
    Tgl_Pendaftaran = registration_data.get('Tgl_Pendaftaran')
    Nama = registration_data.get('Nama')
    Alamat = registration_data.get('Alamat')
    Telp = registration_data.get('Telp')
    Jenis_Kelamin = registration_data.get('Jenis_Kelamin')
    Jenis_Kursus = registration_data.get('Jenis_Kursus')

    # Insert the new registration record into the database
    query = """
    INSERT INTO users (No, Tgl_Pendaftaran, Nama, Alamat, Telp, Jenis_Kelamin, Jenis_Kursus)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (No, Tgl_Pendaftaran, Nama, Alamat,
                   Telp, Jenis_Kelamin, Jenis_Kursus))
    cnx.commit()

    # Return the created registration record as JSON
    return jsonify({
        'No': No,
        'Tgl_Pendaftaran': Tgl_Pendaftaran,
        'Nama': Nama,
        'Alamat': Alamat,
        'Telp': Telp,
        'Jenis_Kelamin': Jenis_Kelamin,
        'Jenis_Kursus': Jenis_Kursus
    })


@app.route('/registrations/<int:id>', methods=['PUT'])
def update_registration(id):
    # Get the data from the request
    registration_data = request.get_json()
    No = registration_data.get('No')
    Tgl_Pendaftaran = registration_data.get('Tgl_Pendaftaran')
    Nama = registration_data.get('Nama')
    Alamat = registration_data.get('Alamat')
    Telp = registration_data.get('Telp')
    Jenis_Kelamin = registration_data.get('Jenis_Kelamin')
    Jenis_Kursus = registration_data.get('Jenis_Kursus')

    # Update the registration record in the database
    query = """
    UPDATE users
    SET No = %s, Tgl_Pendaftaran = %s, Nama = %s, Alamat = %s, Telp = %s, Jenis_Kelamin = %s, Jenis_Kursus = %s
    WHERE No = %s
    """
    cursor.execute(query, (No, Tgl_Pendaftaran, Nama, Alamat,
                   Telp, Jenis_Kelamin, Jenis_Kursus, id))
    cnx.commit()

    # Return the updated registration record as JSON
    return jsonify({
        'No': No,
        'Tgl_Pendaftaran': Tgl_Pendaftaran,
        'Nama': Nama,
        'Alamat': Alamat,
        'Telp': Telp,
        'Jenis_Kelamin': Jenis_Kelamin,
        'Jenis_Kursus': Jenis_Kursus
    })


@app.route('/registrations/<int:id>', methods=['DELETE'])
def delete_registration(id):
    # Delete the registration record from the database
    query = "DELETE FROM users WHERE No = %s"
    cursor.execute(query, (id,))
    cnx.commit()

    # Return a message indicating the deletion was successful
    return "Registration record with ID: {} deleted successfully.".format(id)
