from flask import Flask, jsonify, request

app = Flask(__name__)

# Inisialisasi data peserta kursus
course_registrations = []
id_counter = 1


@app.route('/registrations', methods=['GET'])
def get_registrations():
    return jsonify(course_registrations)


@app.route('/registrations', methods=['POST'])
def create_registration():
    global id_counter

    # Ambil data dari permintaan
    registration_data = request.json

    # Buat objek peserta kursus baru
    registration = {
        'id': id_counter,
        'registration_date': registration_data['registration_date'],
        'name': registration_data['name'],
        'address': registration_data['address'],
        'phone': registration_data['phone'],
        'gender': registration_data['gender'],
        'course_type': registration_data['course_type']
    }

    # Tambahkan peserta kursus ke data kursus_registrations
    course_registrations.append(registration)
    id_counter += 1

    return jsonify(registration), 201


@app.route('/registrations/<int:registration_id>', methods=['GET'])
def get_registration(registration_id):
    # Cari peserta kursus berdasarkan ID
    registration = next(
        (reg for reg in course_registrations if reg['id'] == registration_id), None)

    if registration:
        return jsonify(registration)
    else:
        return jsonify({'message': 'Registration not found'}), 404


@app.route('/registrations/<int:registration_id>', methods=['PUT'])
def update_registration(registration_id):
    # Cari peserta kursus berdasarkan ID
    registration = next(
        (reg for reg in course_registrations if reg['id'] == registration_id), None)

    if registration:
        # Perbarui data peserta kursus
        registration_data = request.json
        registration.update(registration_data)
        return jsonify(registration)
    else:
        return jsonify({'message': 'Registration not found'}), 404


@app.route('/registrations/<int:registration_id>', methods=['DELETE'])
def delete_registration(registration_id):
    # Cari peserta kursus berdasarkan ID
    registration = next(
        (reg for reg in course_registrations if reg['id'] == registration_id), None)

    if registration:
        # Hapus peserta kursus dari data kursus_registrations
        course_registrations.remove(registration)
        return jsonify({'message': 'Registration deleted'})
    else:
        return jsonify({'message': 'Registration not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
