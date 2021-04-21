import psycopg2
from useroftest import useroftest as use

class useroftest:
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
            sql = "INSERT INTO listUserOfTest (idOfTest,idOfUser,scoreOfUser) VALUES (%s,%s,%s) "
            result = (
                data.idOfTest,
                data.idOfUser,
                data.scoreOfUser,
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

    def getScoreOfMe(self, idOfUser):
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
            sql = "select * from listUserOfTest where idOfUser = %s"
            cur.execute(sql, (idOfUser,))
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = use()
                r.parseData(row)
                ans.append(r.toJson())
            con.close()
            return ans
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    def getScoreOfTest(self, idOfTest):
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
            sql = "select * from listUserOfTest where idOfTest = %s"
            cur.execute(sql, (idOfTest,))
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = use()
                r.parseData(row)
                ans.append(r.toJson())
            con.close()
            return ans
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    
