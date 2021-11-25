import psycopg2
from werkzeug import exceptions
from flask import Flask, request


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
        try:
            self.cur.execute(sql)
            return True
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            return False



app = Flask(__name__)


@app.route('/users', methods=['GET'])
def show_user():
    user_id = request.args.get('username', None)
    passwd = request.args.get('password', None)
    print("Reacted - user")
    print(f'Username: {user_id}')
    print(f'Password: {passwd}')
    return "Hello"


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
