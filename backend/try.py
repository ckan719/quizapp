import requests

data = {}
# data['idOfQuestion'] = '6'
# data['idOfTest'] = '11'
# data['content'] = "This is the question NNNNNNNNN ?"
# data['ansA'] = "Answer A"
# data['ansB'] = "Answer B"
# data['ansC'] = "Answer C"
# data['ansD'] = "Answer D"
# data['ansCorrect'] = "Answer A"
# data['swapAns'] = '2'
# data['idOfTest'] = '11'

# data['idOfUser'] = '2'
# data['email'] = 'nhat_1751220074@dau.edu.vn'
# data['password'] = '123456789'
# data["nameUser"] = "Nguyen Cong Nhat"
# data["dateOfBirth"] = "21/08/1999"
# data["adress"] = 'Da Nang'
# data["company"] = "DAUer"

# data['timeStart'] = '07:30'
# data['timeFinish'] = "07:50"
# data['status'] = "Chua bat dau"
# data['nameTest'] = "TOLEICA"
# data['numOfQuestion'] = "30"
# data['isEnable'] = "0"
# data['idOfUser'] = "2"
# data['passwdOfTest'] = '12345678'
# data['limitOfNumUser'] = '20'

data['idOfUser'] = '1'
# data['idOfTest'] = '1'
# data['scoreOfUser'] = '9.9'

# data['email'] = 'nhat_1751220075@dau.edu.vn'
# data['password'] = '123456789'

# data['idOfUser'] = '1'

report = requests.post('http://localhost:5000/get-account-by-id', json=data)
print(report.text)
