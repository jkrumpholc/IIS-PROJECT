import psycopg2


class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            host="ec2-52-208-145-55.eu-west-1.compute.amazonaws.com",
            database="d1ol7h4m4fa12e",
            user="tauerfmxyhknkp",
            password="b889ddcdadd24f94e7e0f3aceecd92da372334e5663bb7795598250fb860634b",
            sslmode='require')
        self.cur = self.conn.cursor()

    def send_request(self, request):
        sql = f'''{request}'''
        try:
            self.cur.execute(sql)
            return True
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            return False
