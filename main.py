import psycopg2
from werkzeug import exceptions
from flask.helpers import send_from_directory
from flask import Flask, request
from flask_cors import CORS, cross_origin
import hashlib
import json
import datetime


class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            host="ec2-52-208-145-55.eu-west-1.compute.amazonaws.com",
            database="d1ol7h4m4fa12e",
            user="tauerfmxyhknkp",
            password="b889ddcdadd24f94e7e0f3aceecd92da372334e5663bb7795598250fb860634b",
            sslmode='require')
        self.cur = self.conn.cursor()

    def send_request(self, sql, read=True):
        ret = None
        try:
            self.cur.execute(sql)
        except (Exception, psycopg2.DatabaseError) as error:
            ret = False, error
        except psycopg2.ProgrammingError:
            ret = False, f"Wrong SQL request: {sql}"
        except psycopg2.OperationalError:
            ret = False, "Cannot connect to database."
        else:
            if read:
                try:
                    ret = True, self.cur.fetchall()
                except psycopg2.ProgrammingError:
                    ret = False, "Cannot fetch data"
            else:
                ret = True
        finally:
            self.conn.commit()
            return ret


app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
data = Database()
link_prezentation = None


@app.route('/loginUser', methods=['GET', 'POST'])
@cross_origin()
def login_user():
    if request.method == 'GET' or request.method == 'POST':
        username = request.args.get('username') if request.method == 'GET' else request.json['username']
        password = request.args.get('password') if request.method == 'GET' else request.json['password']
    else:
        username = password = None
    if None in (username, password):
        ret = {"result": "Failure", "reason": "Data not provided"}
        return json.dumps(ret)
    result, database_data = data.send_request(f'''SELECT password from public."User" where username = '{username}' ''', True)
    if result:
        if len(database_data) > 0:
            data_pass = database_data[0][0]
            passwd_hash = (hashlib.md5(password.encode())).hexdigest()
            if data_pass == passwd_hash:
                ret = {"result": "Success", "id": username}
            else:
                ret = {"result": "Failure", "reason": "Wrong password"}
        else:
            ret = {"result": "Failure", "reason": "Username not found"}
    else:
        ret = {"result": "Failure", "reason": database_data}
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
        ret = {"result": "Failure", "reason": "Data not provided"}
        return json.dumps(ret)
    result, unique = data.send_request(f'''SELECT * FROM public."User" where username = {username} ''')
    if result and len(unique) > 1:
        ret = {"result": "Failure", "reason": "Username exists"}
        return json.dumps(ret)
    passwd_hash = (hashlib.md5(password.encode())).hexdigest()
    result = data.send_request(f'''INSERT INTO public."User"(username, name, surname, gender, password)  VALUES ('{username}', '{name}', '{surname}', '{gender}', '{passwd_hash}' )''', False)
    if result and type(result) == bool:
        ret = {"result": "Success", "id": username}
        return json.dumps(ret)
    else:
        ret = {"result": "Failure", "reason": str(result[1])}
        return json.dumps(ret)


@app.route('/addConference', methods=['GET', 'POST'])
@cross_origin()
def create_conference():
    if request.method == 'GET' or request.method == 'POST':
        organizer = request.args.get('organizer') if request.method == 'GET' else request.json['organizer']
        description = request.args.get('description') if request.method == 'GET' else request.json['description']
        date = request.args.get('date') if request.method == 'GET' else request.json['date']
        genre = request.args.get('genre') if request.method == 'GET' else request.json['genre']
        address = request.args.get('address') if request.method == 'GET' else request.json['address']
        rooms = request.args.get('rooms') if request.method == 'GET' else request.json['rooms']
        capacity = request.args.get('capacity') if request.method == 'GET' else request.json['capacity']
        timeTo = request.args.get('timeTo') if request.method == 'GET' else request.json['timeTo']
        timeFrom = request.args.get('timeFrom') if request.method == 'GET' else request.json['timeFrom']
        price = request.args.get('price') if request.method == "GET" else request.json['price']
    else:
        organizer = description = date = genre = address = rooms = capacity = timeTo = timeFrom = price = None
    if None in (organizer, description, date, genre, address, rooms, capacity, timeTo, timeFrom, price):
        ret = {"result": "Failure", "reason": "Data not provided"}
        return json.dumps(ret)
    date = datetime.datetime.strptime(date, "%Y-%m-%d")
    result, conference_id = data.send_request('''SELECT MAX(id) FROM public."Conference"''')
    if not result:
        ret = {"result": "Failure", "reason": "Cannot get ConferenceID"}
        return json.dumps(ret)
    if conference_id[0][0] is None:
        conference_id = 0
    else:
        conference_id = conference_id[0][0]
    conference_id += 1
    result = data.send_request(f'''INSERT INTO public."Conference"(id,capacity,description,date,address,genre,organizer,begin_time,end_time,price) VALUES ({conference_id},{capacity},'{description}','{date}','{address}','{genre}','{organizer}','{timeFrom}','{timeTo}',{price}) ''',False)
    if result and type(result) == bool:
        building = data.send_request(f'''SELECT id FROM public."Building" where name = '{address}' ''')[1][0][0]
        for i in rooms:
            if rooms[i]:
                room_id = data.send_request('''SELECT MAX(id) FROM public."Room"''')[1][0][0]
                if room_id is None:
                    room_id = 0
                room_id += 1
                result = data.send_request(
                    f'''INSERT INTO public."Room"(id, name, building, conferention) VALUES ({room_id}, '{i}', {building}, {conference_id}) ''',False)
                if result and type(result) == bool:
                    continue
                else:
                    ret = {"result": "Failure", "reason": "Cannot insert into rooms"}
                    return json.dumps(ret)
        ret = {"result": "Success", "id": conference_id}
        return json.dumps(ret)


def parse_profile_data(temp_data, fields):
    user_data = []
    for n, i in enumerate(temp_data, 0):
        user_data.insert(n, {})
        for j, k in zip(i, fields):
            if type(j) == datetime.time:
                j = datetime.time.strftime(j, "%H:%M")
            elif type(j) == datetime.date:
                j = datetime.date.strftime(j, "%Y-%m-%d")
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
    result, database_data = data.send_request(
        f'''SELECT T.id, T.price, description, status FROM public."Ticket" T, "Conference" C where T.conference = C.id and T."owner" = '{username}' ORDER BY id DESC ''')
    if result:
        user_tickets = parse_profile_data(database_data, ticket_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get tickets"}
        return json.dumps(ret)
    conference_fields = \
        ['id', 'capacity', 'date', 'description', 'address', 'participants', 'begin_time', 'end_time', 'price']
    result, database_data = data.send_request(
        f'''SELECT id,capacity,date,description,address,participants,begin_time,end_time, price FROM public."Conference" WHERE organizer = '{username}' ORDER BY id DESC ''')
    if result:
        user_conferencies = parse_profile_data(database_data, conference_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get conferencies"}
        return json.dumps(ret)
    presentations_fields = ['id', 'name', 'conference_name', 'room_name', 'begin_time', 'end_time', 'confirmed']
    result, database_data = data.send_request(
        f'''SELECT P.id,P.name,C.description,R.name,P.begin_time,P.end_time,P.confirmed FROM public."Presentation" P, "Conference" C, "Room" R where conference=C.id and room=R.id and lecturer='{username}' ORDER BY id DESC ''')
    if result:
        user_presentations = parse_profile_data(database_data, presentations_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get presentations"}
        return json.dumps(ret)
    ret = {"result": "Success", "tickets": user_tickets, "conferencies": user_conferencies,
           "prezentations": user_presentations}
    return json.dumps(ret)


@app.route('/reserveTicket', methods=['GET', 'POST'])
@cross_origin()
def create_ticket(send_mail=False):
    if request.method == 'GET' or request.method == 'POST':
        try:
            username = request.args.get('username') if request.method == 'GET' else request.json['username']
        except KeyError:
            send_mail = True
            email = request.args.get('email') if request.method == 'GET' else request.json['email']
        conference = request.args.get('konf_id') if request.method == 'GET' else request.json['konf_id']
        quantity = request.args.get('quantity') if request.method == 'GET' else request.json['quantity']
    else:
        username = conference = quantity = None
    if None in (conference, quantity):
        ret = {"result": "Failure", "reason": "Data not provided"}
        return json.dumps(ret)
    result, ticket_id = data.send_request(f'''SELECT MAX(id) FROM public."Ticket"''')
    if ticket_id[0][0] is None:
        ticket_id = 0
    else:
        ticket_id = ticket_id[0][0]
    ticket_id += 1
    price = (data.send_request(f'''SELECT price FROM public."Conference" where id={conference} ''')[1][0][0])
    if send_mail:
        result, database_data = data.send_request(f'''INSERT INTO public."User"(username) VALUES ('{email}') ''')
        if not result:
            ret = {"result": "Failure", "reason": database_data}
            return json.dumps(ret)
        for i in range(int(quantity)):
            result = data.send_request(
                f'''INSERT INTO public."Ticket" (id, price, conference, status, owner) VALUES ('{ticket_id}','{price}','{conference}','{"Reserved"}','{email}')''',False)
            if result and len(result) == 1:
                ticket_id += 1
                continue
        ret = {"result": "Success"}
    else:
        result, database_data = data.send_request(f'''SELECT * FROM public."User" where username = '{username}' ''')
        if result:
            if len(database_data) > 0:
                for i in range(int(quantity)):
                    result = data.send_request(
                        f'''INSERT INTO public."Ticket" (id, price, conference, status, owner) VALUES ('{ticket_id}','{price}','{conference}','{"Reserved"}','{username}')''',False)
                    if result and type(result) == bool:
                        ticket_id += 1
                        continue
                    else:
                        ret = {"result": "Failure", "reason": result[1]}
                ret = {"result": "Success"}
            else:
                ret = {"result": "Failure", "reason": "User not found"}
        else:
            ret = {"result": "Failure", "reason": database_data}
    return json.dumps(ret)


@app.route('/availableConferences', methods=['GET', 'POST'])
@cross_origin()
def get_conferencies():
    conferencies_fields = ['id', 'capacity', 'description', 'address', 'genre', 'participants', 'begin_time',
                           'end_time', 'organizer', 'price', 'date', 'rooms']
    room_fields = ['id', 'name']
    result, database_data = data.send_request('''SELECT * FROM public."Conference" C ''')
    if result:
        conferencies = []
        for i in database_data:
            result, room_id = data.send_request(f'''SELECT id, name FROM public."Room" WHERE conferention = {i[0]}''')
            if result:
                for n in range(len(room_id)):
                    room_id[n] = dict(zip(room_fields, room_id[n]))
                i = list(i)
                for n, j in enumerate(i):
                    if type(j) == datetime.time:
                        i[n] = datetime.time.strftime(j, "%H:%M")
                    elif type(j) == datetime.date:
                        i[n] = datetime.date.strftime(j, "%Y-%m-%d")
                i.append(room_id)
                conferencies.append(dict(zip(conferencies_fields, i)))
        ret = {"result": "Success", "conferencies": conferencies}
        return json.dumps(ret)
    else:
        ret = {"result": "Failure", "reason": database_data}
        return json.dumps(ret)


@app.route('/getAdmin', methods=['GET', 'POST'])
@cross_origin()
def get_admin():
    result, database_data = data.send_request('''SELECT * FROM public."Conference"''')
    if result:
        conference_fields = ['id', 'capacity', 'description', 'address', 'genre', 'participants', 'begin_time',
                             'end_time', 'organizer', 'price', 'date']
        conferencies = parse_profile_data(database_data, conference_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get conferencies"}
        return json.dumps(ret)
    result, database_data = data.send_request('''SELECT * FROM public."User"''')
    if result:
        user_fields = ['username', 'name', 'surname', 'gender', 'password', 'marked_prezentation']
        users = parse_profile_data(database_data, user_fields)
    else:
        ret = {"result": "Failure", "reason": "Cannot get users"}
        return json.dumps(ret)
    result, database_data = data.send_request('''SELECT * FROM public."Presentation"''')
    if result:
        presentation_field = ['id', 'name', 'description', 'tags', 'conference', 'begin_time', 'end_time', 'confirmed',
                              'lecturer', 'data', 'room']
        presentations = parse_profile_data(database_data, presentation_field)
    else:
        ret = {"result": "Failure", "reason": "Cannot get presentations"}
        return json.dumps(ret)
    result, database_data = data.send_request('''SELECT * FROM public."Ticket"''')
    if result:
        ticket_field = ['id', 'price', 'conference', 'status']
        tickets = parse_profile_data(database_data, ticket_field)
    else:
        ret = {"result": "Failure", "reason": "Cannot get tickets"}
        return json.dumps(ret)
    ret = {"result": "Success", "users": users, "conferencies": conferencies,
           "presentations": presentations, "tickets": tickets}
    return ret


@app.route('/registerPresentation', methods=['GET', 'POST'])
@cross_origin()
def create_presentation():
    global link_prezentation
    if request.method == 'GET' or request.method == 'POST':
        name = request.args.get('presName') if request.method == 'GET' else request.json['presName']
        tags = request.args.get('presTags') if request.method == 'GET' else request.json['presTags']
        description = request.args.get('description') if request.method == 'GET' else request.json['description']
        room = request.args.get('room_id') if request.method == 'GET' else request.json['room_id']
        start_time = request.args.get('timeFrom') if request.method == 'GET' else request.json['timeFrom']
        end_time = request.args.get('timeTo') if request.method == 'GET' else request.json['timeTo']
        user = request.args.get('username') if request.method == 'GET' else request.json['username']
        conferencion = request.args.get('conf_id') if request.method == 'GET' else request.json['conf_id']
    else:
        name = tags = description = room = start_time = end_time = user = conferencion = None
    if None in (name, tags, description, room, start_time, end_time, user, conferencion):
        ret = {"result": "Failure", "reason": "Data not provided"}
        return json.dumps(ret)
    result, prezentation_id = data.send_request('''SELECT MAX(id) FROM public."Presentation"''')
    if result and type(result) == bool:
        if prezentation_id[0][0] is None:
            prezentation_id = 0
        else:
            prezentation_id = prezentation_id[0][0]
    else:
        ret = {"result": "Failure", "reason": "Unvalid prezentationID"}
        return json.dumps(ret)
    prezentation_id += 1
    result = data.send_request(f'''INSERT INTO public."Presentation"(id, name, description, tags, conference, begin_time, end_time, confirmed, lecturer,room) VALUES ({prezentation_id},'{name}','{description}','{tags}',{conferencion},'{start_time}','{end_time}',FALSE,'{user}',{room})''', False)
    if result and type(result) == bool:
        ret = {"result": "Success"}
        link_prezentation = prezentation_id
    else:
        ret = {"result": "Failure", "reason": "Failed insert of prezentation"}
    return json.dumps(ret)


@app.route('/registerPresentationFile', methods=['GET', 'POST'])
@cross_origin()
def create_presentation_file():
    global link_prezentation
    file_data = request.files['file'].read()
    file_data = file_data.decode("UTF-8")
    if link_prezentation is not None:
        result = data.send_request(f'''UPDATE public."Presentation" SET data = '{file_data}' WHERE id = {link_prezentation}''', False)
        if result and type(result) == bool:
            link_prezentation = None
            ret = {"result": "Success"}
        else:
            ret = {"result": "Failure", "reason": result[1]}
    else:
        ret = {"result": "Failure", "reason": "Lost linked prezentation"}
    return json.dumps(ret)


@app.route('/myDelete', methods=['GET', 'POST'])
@cross_origin()
def delete():
    if request.method == 'GET' or request.method == 'POST':
        to_delete = request.args.get('todelete') if request.method == 'GET' else request.json['todelete']
        id_ = request.args.get('id') if request.method == 'GET' else request.json['id']
    else:
        to_delete = id_ = None
    if None in (to_delete, id_):
        ret = {"result": "Failure", "reason": "Data not provided"}
        return json.dumps(ret)
    result = data.send_request(f'''DELETE FROM public."{to_delete}" WHERE id = {id_}''', False)
    if result and type(result) == bool:
        ret = {"result": "Success"}
    else:
        ret = {"result": "Failure", "reason": result[1]}
    return json.dumps(ret)


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
@app.route('/admin')
@app.route('/clicked_konf')
@app.route('/clicked_ticket')
@app.route('/myConference')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, port=8000)
