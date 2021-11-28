import psycopg2
from werkzeug import exceptions
from flask.helpers import send_from_directory
from flask import Flask, request
from flask_cors import CORS, cross_origin
import hashlib
import json
import datetime


def send_request(sql, read=True):
    conn = psycopg2.connect(
        host="ec2-52-208-145-55.eu-west-1.compute.amazonaws.com",
        database="d1ol7h4m4fa12e",
        user="tauerfmxyhknkp",
        password="b889ddcdadd24f94e7e0f3aceecd92da372334e5663bb7795598250fb860634b",
        sslmode='require')
    cur = conn.cursor()
    ret = None
    try:
        cur.execute(sql)
    except (Exception, psycopg2.DatabaseError) as error:
        ret = error
    except psycopg2.ProgrammingError:
        ret = f"Wrong SQL request: {sql}"
    except psycopg2.OperationalError:
        ret = "Cannot connect to database."
    else:
        if read:
            try:
                ret = (True, cur.fetchall())
            except psycopg2.ProgrammingError:
                ret = False
        else:
            ret = True
    finally:
        if not read:
            conn.commit()
        conn.close()
        return ret


app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/loginUser', methods=['GET', 'POST'])
@cross_origin()
def login_user():
    if request.method == 'GET' or request.method == 'POST':
        username = request.args.get('username') if request.method == 'GET' else request.json['username']
        password = request.args.get('password') if request.method == 'GET' else request.json['password']
    else:
        username = password = None
    if None in (username, password):
        ret = {"result": "Failure"}
        return json.dumps(ret)
    database_data = send_request(f'''SELECT password from public."User" where username = '{username}' ''', True)
    if database_data[0]:
        data_pass = database_data[1][0][0]
        passwd_hash = (hashlib.md5(password.encode())).hexdigest()
        if data_pass == passwd_hash:
            ret = {"result": "Success", "id": username}
        else:
            ret = {"result": "Failure"}
    else:
        ret = {"result": "Failure"}
    return json.dumps(ret)


@app.route('/addUser', methods=['GET', 'POST'])
@cross_origin()
def register():
    if request.method == 'GET' or request.method == 'POST':
        username = request.args.get('username') if request.method == 'GET' else request.json['username']
        password = request.args.get('password') if request.method == 'GET' else request.json['password']
        name = request.args.get('name') if request.method == 'GET' else request.json['name']
        surname = request.args.get('surname') if request.method == 'GET' else request.json['surname']
        gender = request.args.get('gender') if request.method == 'GET' else request.json['gender']
    else:
        username = password = name = surname = gender = None
    if None in (username, password, name, surname, gender):
        ret = {"result": "Failure"}
        return json.dumps(ret)
    unique = send_request(f'''SELECT * FROM public."User" where username = {username} ''')
    if len(unique[1]) > 1:
        ret = {"result": "Failure", "reason": "Username exists"}
        return json.dumps(ret)
    passwd_hash = (hashlib.md5(password.encode())).hexdigest()
    if send_request(f'''INSERT INTO public."User"(username, name, surname, gender, password)  VALUES
                     ('{username}', '{name}', '{surname}', '{gender}', '{passwd_hash}' )''', False):
        ret = {"result": "Success", "id": username}
        return ret


@app.route('/addConference', methods=['GET', 'POST'])
@cross_origin()
def create_conference():
    if request.method == 'GET' or request.method == 'POST':
        organizer = request.args.get('organizer') if request.method == 'GET' else request.json['organizer']
        description = request.args.get('description') if request.method == 'GET' else request.json['description']
        genre = request.args.get('genre') if request.method == 'GET' else request.json['genre']
        address = request.args.get('address') if request.method == 'GET' else request.json['address']
        rooms = request.args.get('rooms') if request.method == 'GET' else request.json['rooms']
        capacity = request.args.get('capacity') if request.method == 'GET' else request.json['capacity']
        timeTo = request.args.get('timeTo') if request.method == 'GET' else request.json['timeTo']
        timeFrom = request.args.get('timeFrom') if request.method == 'GET' else request.json['timeFrom']
        price = request.args.get('price') if request.method == "GET" else request.json['price']
    else:
        organizer = description = genre = address = rooms = capacity = timeTo = timeFrom = price = None
    if None in (organizer, description, genre, address, rooms, capacity, timeTo, timeFrom, price):
        ret = {"result": "Failure"}
        return json.dumps(ret)
    conference_id = (send_request('''SELECT MAX(id) FROM public."Conference"''')[1][0][0]) + 1
    if send_request(f'''INSERT INTO public."Conference"(id, capacity, description, address, genre, organizer,
    rooms, begin_time, end_time, price) VALUES ('{conference_id}','{capacity}','{description}','{address}','{genre}',
    '{organizer}','{rooms}','{timeFrom}','{timeTo}','{price}') ''', False):
        ret = {"result": "Success", "id": conference_id}
        return ret


def parse_profile_data(temp_data, fields):
    user_data = []
    if len(temp_data) > 5:
        temp_data = temp_data[:5]
    for n, i in enumerate(temp_data, 0):
        user_data.insert(n, {})
        for j, k in zip(i, fields):
            if type(j) == datetime.time:
                j = datetime.time.strftime(j, "%H:%M")
            user_data[n][k] = j
    return user_data


@app.route('/profile', methods=['GET', 'POST'])
@cross_origin()
def profile():
    if request.method == 'GET' or request.method == 'POST':
        username = request.args.get('id') if request.method == 'GET' else request.json['id']
    else:
        username = None
    if username is None:
        ret = {"result": "Failure", "reason": "No username provided"}
        return json.dumps(ret)
    ticket_fields = ['id', 'price', 'conference', 'status']
    database_data = send_request(
        f'''SELECT T.id, T.price, description, status FROM public."Ticket" T natural join "Conference" C where T.conference = C.id and T."owner" = '{username}' ORDER BY id DESC ''')
    if database_data[0]:
        user_tickets = parse_profile_data(database_data[1], ticket_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get tickets"}
        return json.dumps(ret)
    conference_fields = ['id', 'capacity', 'description', 'address', 'participants', 'begin_time', 'end_time', 'price']
    database_data = send_request(
        f'''SELECT id,capacity,description,address,participants,begin_time,end_time, price FROM public."Conference" WHERE organizer = '{username}' ORDER BY id DESC ''')
    if database_data[0]:
        user_conferencies = parse_profile_data(database_data[1], conference_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get conferencies"}
        return json.dumps(ret)
    prezentations_fields = ['id', 'name', 'conference_name', 'room_name', 'begin_time', 'end_time', 'confirmed']
    database_data = send_request(f'''
            SELECT P.id,P.name,C.description,R.name,P.begin_time,P.end_time,P.confirmed FROM public."Presentation" P, 
            "Conference" C, "Room" R where conference=C.id and room=R.id and lecturer='{username}' ORDER BY id DESC ''')
    if database_data[0]:
        user_prezentations = parse_profile_data(database_data[1], prezentations_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get presentations"}
        return json.dumps(ret)
    ret = {"result": "Success", "tickets": user_tickets, "conferencies": user_conferencies,
           "prezentations": user_prezentations}
    return json.dumps(ret)


@app.route('/reserveTicket', methods=['GET', 'POST'])
@cross_origin()
def create_ticket(send_mail=False):
    if request.method == 'GET' or request.method == 'POST':
        try:
            username = request.args.get('username') if request.method == 'GET' else request.json['username']
        except IndexError:
            send_mail = True
            mail = request.args.get('mail') if request.method == 'GET' else request.json['mail']
        conference = request.args.get('conference') if request.method == 'GET' else request.json['conference']
        quantity = request.args.get('quantity') if request.method == 'GET' else request.json['quantity']
    else:
        username = conference = quantity = None
    if None in (conference, quantity):
        ret = {"result": "Failure"}
        return json.dumps(ret)
    ticket_id = (send_request(f'''SELECT MAX(id) FROM public."Ticket"''')[1][0][0]) + 1
    price = (send_request(f'''SELECT price FROM public."Conference" where id={conference} ''')[1][0][0]) * quantity
    if send_mail:
        pass
    else:
        check_username = send_request(f'''SELECT * FROM public."User" where username = '{username}' ''')
        if check_username[0] and len(check_username[1]) > 1:
            if send_request(f'''INSERT INTO public."Ticket" (id, price, conference, status, owner) VALUES ('{ticket_id}','{price}','{conference}','{"Reserved"}','{username}')''', False):
                ret = {"result": "Success"}
                return json.dumps(ret)
        else:
            ret = {"result": "Failure", "reason": "User not found"}
            return ret


@app.route('/availableConferences', methods=['GET', 'POST'])
@cross_origin()
def get_conferencies():
    conferencies_fileds = ['id', 'capacity','description','address','genre','participants','rooms','begin_time','end_time', 'organizer', 'price']
    database_data = send_request('''SELECT * FROM public."Conference"''')
    if database_data[0]:
        conferencies = parse_profile_data(database_data[1],conferencies_fileds)
        ret = {"result": "Success", "conferencies": conferencies}
        return ret
    else:
        ret = {"result": "Failure"}
        return ret


@app.errorhandler(exceptions.InternalServerError)
def handle_bad_request(e):
    print(e)
    return 'bad request! 500', 500, e


@app.errorhandler(exceptions.NotFound)
def handle_bad_request(e):
    print(e)
    return 'bad request! 404', 404


@app.route('/')
@app.route('/konference')
@app.route('/login')
@app.route('/user')
@app.route('/clicked_konf')
@app.route('/clicked_ticket')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, port=8000)
