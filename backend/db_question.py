import psycopg2
from question import question as ques

class question:
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
            sql = "INSERT INTO listquestion (content, ansA, ansB, ansC, ansD, ansCorrect, swapAns, idOfTest) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) "
            result = (
                data.content,
                data.ansA,
                data.ansB,
                data.ansC,
                data.ansD,
                data.ansCorrect,
                data.swapAns,
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

    def getQuestion(self, idOfTest):
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
            sql = "select * from listQuestion where idOfTest = %s"
            cur.execute(sql, (idOfTest,))
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = ques()
                r.parseQuestion(row)
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
            sql = "UPDATE listQuestion  SET idOfTest = %s, content = %s, ansA = %s, ansB = %s, ansC = %s, ansD = %s, ansCorrect = %s, swapAns = %s WHERE idOfQuestion = %s"
            result = (data.idOfTest,data.content,data.ansA,data.ansB,data.ansC,data.ansD,data.ansCorrect,data.swapAns,data.idOfQuestion,)
            cur.execute(sql, result)
            con.commit()
            con.close()
            return "RE"

        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    def delete(self, id):
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
            sql = "DELETE FROM listQuestion where idOfQuestion = %s"
            cur.execute(sql, (id,))
            con.commit()
            con.close()
            return 'RE'
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()
    
