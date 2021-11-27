import psycopg2
from werkzeug import exceptions
from flask import Flask, request
from flask_cors import CORS, cross_origin
import hashlib
import json


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
            ret = error
        except psycopg2.ProgrammingError:
            ret = f"Wrong SQL request: {sql}"
        except psycopg2.OperationalError:
            ret = "Cannot connect to database."
        else:
            if read:
                try:
                    ret = (True, self.cur.fetchall()[0])
                except psycopg2.ProgrammingError:
                    ret = False
            else:
                ret = True
        finally:
            if not read:
                self.conn.commit()
            return ret



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
data = Database()


@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def show_user():
    if request.method == 'GET':
        username = request.args.get('username', None)
        password = request.args.get('password', None)
    elif request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
    else:
        username = None
        password = None
    if None in (username, password):
        ret = {"result": "Failure"}
        return json.dumps(ret)
    database_data = data.send_request(f"""SELECT password, id from public."User" where username = '{username}'""", True)
    if database_data[0]:
        data_pass = database_data[1][0]
        data_id = database_data[1][1]
        passwd_hash = (hashlib.md5(password.encode())).hexdigest()
        if data_pass == passwd_hash:
            ret = {"result": "Success", "id": data_id}
        else:
            ret = {"result": "Failure"}
    else:
        ret = {"result": "Failure"}
    return json.dumps(ret)


@app.route('/addUser', methods=['GET', 'POST'])
@cross_origin()
def register():
    if request.method == 'GET':
        username = request.args.get('username', None)
        password = request.args.get('password', None)
        name = request.args.get('name', None)
        surname = request.args.get('surname', None)
        gender = request.args.get('gender', None)
    elif request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        name = request.json['name']
        surname = request.json['surname']
        gender = request.json['gender']
    else:
        username = None
        password = None
        name = None
        surname = None
        gender = None
    if None in (username, password, name, surname, gender):
        ret = {"result": "Failure"}
        return json.dumps(ret)
    user_id = (data.send_request('''SELECT MAX(id) FROM public."User"''', True)[1][0])+1
    passwd_hash = (hashlib.md5(password.encode())).hexdigest()
    if data.send_request(f'''INSERT INTO public."User"(id, username, name, surname, gender, password)  VALUES
                     ('{user_id}', '{username}', '{name}', '{surname}', '{gender}', '{passwd_hash}' )''', False):
        ret = {"result": "Success", "id": user_id}
        return ret


@app.errorhandler(exceptions.InternalServerError)
def handle_bad_request(e):
    print(e)
    return 'bad request! 500', 500


@app.errorhandler(exceptions.NotFound)
def handle_bad_request(e):
    print(e)
    return 'bad request! 404', 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
