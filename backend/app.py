from flask import Flask, jsonify, request, redirect
import os
import json
import db_question as db_ques
import question as ques
import account as acc
import db_account as db_acc
import test as tes
import db_test as db_tes
import useroftest as use
import db_useroftest as db_use
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


dp_ip = os.getenv("dp_ip")
con_db = {}
con_db["user"] = "postgres"
con_db["password"] = "postgres"
con_db["host"] = str(dp_ip)
con_db["port"] = "5432"
con_db["database"] = "my_db"


@app.route("/")
def hello_world():
    return "Hello World ! :D"


# ------------------------------------------------------------------------------------------

# Lay danh sach cau hoi
@app.route("/play-test", methods=["POST"])
def getQuestionByIdTest():
    data = request.json
    result = db_ques.question(con_db).getQuestion(data["idOfTest"])
    return jsonify({"data": result}), 200


# Them cau hoi
@app.route("/create-question", methods=["POST"])
def insertQuestion():
    conn = db_ques.question(con_db)
    data = request.json
    sheet = ques.question(
        1,
        data["content"],
        data["ansA"],
        data["ansB"],
        data["ansC"],
        data["ansD"],
        data["ansCorrect"],
        data["swapAns"],
        data["idOfTest"],
    )
    result = conn.insert(sheet)
    return jsonify({"data": result}), 200

@app.route("/update-question", methods=["POST"])
def updateQuestion():
    conn = db_ques.question(con_db)
    data = request.json
    sheet = ques.question(
        data['idOfQuestion'],
        data["content"],
        data["ansA"],
        data["ansB"],
        data["ansC"],
        data["ansD"],
        data["ansCorrect"],
        data["swapAns"],
        data["idOfTest"],
    )
    result = conn.update(sheet)
    return jsonify({"data": result}), 200

@app.route("/delete-question", methods=["POST"])
def deleteQuestion():
    conn = db_ques.question(con_db)
    data = request.json
    result = conn.delete(data['idOfQuestion'])
    return jsonify({"data": result}), 200

# -----------------------------------------------------------------------------


@app.route("/register", methods=["POST"])
def register():
    conn = db_acc.account(con_db)
    data = request.json
    sheet = acc.account(
        1,
        data["email"],
        data["password"],
        data["nameUser"],
        data["dateOfBirth"],
        data["adress"],
        data["company"],
    )
    result = conn.insert(sheet)
    return jsonify({"data": result}), 200


@app.route("/login", methods=["POST"])
def login():
    conn = db_acc.account(con_db)
    data = request.json
    result = conn.getLogin(data["email"], data["password"])
    return jsonify({"data": result}), 200


@app.route("/update-info", methods=["PUT"])
def updateInfo():
    conn = db_acc.account(con_db)
    data = request.json
    sheet = acc.account(
        data["idOfUser"],
        data["email"],
        data["password"],
        data["nameUser"],
        data["dateOfBirth"],
        data["adress"],
        data["company"],
    )
    result = conn.update(sheet)
    return jsonify({"data": result}), 200

@app.route("/get-account-by-id", methods = ["POST"])
def getAccById():
    data = request.json
    result = db_acc.account(con_db).getAccById(data["idOfUser"])
    return jsonify({"data": result}), 200

@app.route("/get-account")
def getAccount():
    result = db_acc.account(con_db).getAccount()
    return jsonify({"data": result}), 200


# ------------------------------------------------------------------------------------------------

@app.route("/update-test", methods=["PUT"])
def updateTest():
    conn = db_tes.test(con_db)
    data = request.json
    sheet = acc.test(
        data["timeStart"],
        data["timeFinish"],
        data["status"],
        data["nameTest"],
        data["numOfQuestion"],
        data["isEnable"],
        data["idOfUser"],
        data["passwdOfTest"],
        data["limitOfNumUser"],
        data["idOfTest"],
    )
    result = conn.update(sheet)
    return jsonify({"data": result}), 200

@app.route("/get-test")
def getTest():
    result = db_tes.test(con_db).getTest()
    return jsonify({"data": result}), 200

@app.route("/get-test-by-id", methods=["POST"] )
def getTestById():
    data = request.json
    result = db_tes.test(con_db).getTestById(data['idOfUser'])
    return jsonify({"data": result}), 200

@app.route("/get-test-by-id-test", methods=["POST"] )
def getTestByIdTest():
    data = request.json
    result = db_tes.test(con_db).getTestByIdTest(data['idOfTest'])
    return jsonify({"data": result}), 200

@app.route("/get-test-by-name", methods=["POST"] )
def getTestByName():
    data = request.json
    result = db_tes.test(con_db).getTestByName(data['nameTest'])
    return jsonify({"data": result}), 200

@app.route("/create-test", methods=["POST"])
def makeTest():
    conn = db_tes.test(con_db)
    data = request.json
    sheet = tes.test(
        1,
        data["timeStart"],
        data["timeFinish"],
        data["status"],
        data["nameTest"],
        data["numOfQuestion"],
        data["isEnable"],
        data["idOfUser"],
        data["passwdOfTest"],
        data["limitOfNumUser"],
    )
    result = conn.insert(sheet)
    return jsonify({"data": result}), 200

# ------------------------------------------------------------------------------------------------
@app.route("/score-of-me", methods=["POST"])
def scoreOfMe():
    conn = db_use.useroftest(con_db)
    data = request.json
    result = conn.getScoreOfMe(data['idOfUser'])
    return jsonify({"data": result}), 200

@app.route("/score-of-test", methods=["POST"])
def scoreOfTest():
    conn = db_use.useroftest(con_db)
    data = request.json
    result = conn.getScoreOfTest(data['idOfTest'])
    return jsonify({"data": result}), 200

@app.route("/get-score", methods=["POST"])
def makeScore():
    conn = db_use.useroftest(con_db)
    data = request.json
    sheet = use.useroftest(1,data['idOfTest'],data['idOfUser'],data['scoreOfUser'])
    result = conn.insert(sheet)
    return jsonify({"data": result}), 200


# ------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
