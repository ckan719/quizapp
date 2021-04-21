import psycopg2
from account import account as acc


class account:
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
            sql1 = "SELECT * from account where email = %s"
            cur.execute(sql1, (data.email,))
            con.commit()
            arr = cur.fetchall()
            if len(arr) > 0:
                con.close()
                return "Exists"
            sql = "INSERT INTO account (email, password, nameUser, dateOfBirth, adress, company) VALUES (%s,%s,%s,%s,%s,%s) "
            result = (
                data.email,
                data.password,
                data.nameUser,
                data.dateOfBirth,
                data.adress,
                data.company,
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

    def getAccount(self):
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
            sql = "select * from account"
            cur.execute(sql)
            con.commit()
            rows = cur.fetchall()
            ans = []
            for row in rows:
                r = acc()
                r.parseAccount(row)
                ans.append(r.toJson())
            con.close()
            return ans
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()

    def getLogin(self, email, password):
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
            sql1 = "SELECT * from account where (email = %s and password = %s)"
            cur.execute(
                sql1,
                (
                    email,
                    password,
                ),
            )
            con.commit()
            rows = cur.fetchall()
            if len(rows) > 0:
                con.close()
                ans = []
                for row in rows:
                    r = acc()
                    r.parseAccount(row)
                    ans.append(r.toJson())
                return ans
            con.close()
            return "Fail"
        except (Exception, psycopg2.DatabaseError) as error:
            return str(error)
        finally:
            if con is not None:
                con.close()

    def getAccById(self, id):
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
            sql1 = "SELECT * from account where idOfUser = %s"
            cur.execute(
                sql1,
                (
                    id,
                ),
            )
            con.commit()
            row = cur.fetchone()
            if row:
                r = acc()
                r.parseAccount(row)
                con.close()
                return r.toJson()
            con.close()
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
            sql = "UPDATE account SET password = %s, nameUser = %s, dateOfBirth = %s, adress = %s, company = %s WHERE idOfUser = %s"
            result = (
                data.password,
                data.nameUser,
                data.dateOfBirth,
                data.adress,
                data.company,
                data.idOfUser,
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