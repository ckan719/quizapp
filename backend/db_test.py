import psycopg2
from test import test as tes


class test:
    def __init__(self, conn):
        self.conn = conn

    def insert(self, data):
        con = None
        try:
            con = psycopg2.connect(
                user=self.conn["user"],
                password=self.conn["password"],
                host=self.conn["host"],
                port=self.conn["port"],
                database=self.conn["database"],
            )
            cur = con.cursor()
            sql = "INSERT INTO test (timeStart, timeFinish, status, nameTest, numOfQuestion, isEnable, idOfUser, passwdOfTest,limitOfNumUser) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) "
            result = (
                data.timeStart,
                data.timeFinish,
                data.status,
                data.nameTest,
                data.numOfQuestion,
                data.isEnable,
                data.idOfUser,
                data.passwdOfTest,
                data.limitOfNumUser,
            )
            cur.execute(sql, result)
            con.commit()
            sql1 = "SELECT * FROM test ORDER BY idOfTest DESC LIMIT 1"
            cur.execute(sql1)
            con.commit()
            row = cur.fetchone()
            if row:
                c = tes()
                c.parseTest(row)
                con.close()
                return c.toJson()
            con.close()
            return "Fail"
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()

    def getTestById(self, id):
        con = None
        try:
            con = psycopg2.connect(
                user=self.conn["user"],
                password=self.conn["password"],
                host=self.conn["host"],
                port=self.conn["port"],
                database=self.conn["database"],
            )
            cur = con.cursor()
            sql = "select * from test where idOfUser = %s"
            cur.execute(sql, (id,))
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = tes()
                r.parseTest(row)
                ans.append(r.toJson())
            con.close()
            return ans
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    def getTestByIdTest(self, id):
        con = None
        try:
            con = psycopg2.connect(
                user=self.conn["user"],
                password=self.conn["password"],
                host=self.conn["host"],
                port=self.conn["port"],
                database=self.conn["database"],
            )
            cur = con.cursor()
            sql = "select * from test where idOfTest = %s"
            cur.execute(sql, (id,))
            con.commit()
            row = cur.fetchone()
            if row :
                r = tes()
                r.parseTest(row)
                con.close()
                return r.toJson()
            con.close()
            return "Fail"
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    def getTestByName(self, name):
        con = None
        try:
            con = psycopg2.connect(
                user=self.conn["user"],
                password=self.conn["password"],
                host=self.conn["host"],
                port=self.conn["port"],
                database=self.conn["database"],
            )
            cur = con.cursor()
            sql = "select * from test where nameTest = %s"
            cur.execute(sql, (name,))
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = tes()
                r.parseTest(row)
                ans.append(r.toJson())
            con.close()
            return ans
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()

    def getTest(self):
        con = None
        try:
            con = psycopg2.connect(
                user=self.conn["user"],
                password=self.conn["password"],
                host=self.conn["host"],
                port=self.conn["port"],
                database=self.conn["database"],
            )
            cur = con.cursor()
            sql = "select * from test"
            cur.execute(sql)
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = tes()
                r.parseTest(row)
                ans.append(r.toJson())
            con.close()
            return ans
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    def update(self, data):
        con = None
        try:
            con = psycopg2.connect(
                user=self.conn["user"],
                password=self.conn["password"],
                host=self.conn["host"],
                port=self.conn["port"],
                database=self.conn["database"],
            )
            cur = con.cursor()
            sql = "UPDATE test SET timeStart = %s, timeFinish = %s, status = %s, nameTest = %s, numOfQuestion = %s, isEnable = %s, idOfUser = %s, passwdOfTest = %s, limitOfNumUser = %s WHERE idOfTest = %s"
            result = (
                data.timeStart,
                data.timeFinish,
                data.status,
                data.nameTest,
                data.numOfQuestion,
                data.isEnable,
                data.idOfUser,
                data.passwdOfTest,
                data.limitOfNumUser,
                data.idOfTest,
                
            )
            cur.execute(sql, result)
            con.commit()
            con.close()
            return "RE"

        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
