import psycopg2
from werkzeug import exceptions
from flask import Flask, request
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

    def send_request(self, sql):
        ret = None
        try:
            self.cur.execute(sql)
            try:
                ret = self.cur.fetchall()
            except psycopg2.ProgrammingError:
                ret = ""
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            ret = ""
        except psycopg2.ProgrammingError:
            ret = f"Wrong SQL request: {sql}"
        except psycopg2.OperationalError:
            ret = "Cannot connect to database."
        finally:
            return ret



app = Flask(__name__)
data = Database()


@app.route('/login', methods=['GET', 'POST'])
def show_user():
    if request.method == 'GET':
        user_id = request.args.get('username', None)
        passwd = request.args.get('password', None)
    elif request.method == 'POST':
        user_id = request.form['username']
        passwd = request.form['password']
    else:
        user_id = None
        passwd = None
    data_pass = data.send_request(f"""SELECT password, id from public."User" where username = '{user_id}'""")
    if len(data_pass) > 0:
        data_pass = data_pass[0][0]
        data_id = data_pass[0][1]
        passwd_hash = (hashlib.md5(passwd.encode())).hexdigest()
        if data_pass == passwd_hash:
            ret = {"result": "Success", "id": data_id}
        else:
            ret = {"result": "Failure"}
    else:
        ret = {"result": "Failure"}
    return json.dumps(ret)


@app.errorhandler(exceptions.InternalServerError)
def handle_bad_request(e):
    print(e)
    return 'bad request! 500', 500


@app.errorhandler(exceptions.NotFound)
def handle_bad_request(e):
    print(e)
    return 'bad request! 404', 404


if __name__ == '__main__':
    app.run(debug=True, port=8000, host='localhost')
