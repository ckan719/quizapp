class account:
    def __init__(self, idOfUser=None, email=None, password=None, nameUser=None, dateOfBirth=None, adress=None, company=None):
        self.idOfUser = idOfUser
        self.email = email
        self.password = password
        self.nameUser = nameUser
        self.dateOfBirth = dateOfBirth
        self.adress = adress
        self.company = company
    def parseAccount(self, data):
        self.idOfUser = data[0]
        self.email = data[1]
        self.password = data[2]
        self.nameUser = data[3]
        self.dateOfBirth = data[4]
        self.adress = data[5]
        self.company = data[6]
    def toJson(self):
        return {
            'idOfUser': self.idOfUser,
            'email': self.email,
            'password': self.password,
            'nameUser': self.nameUser,
            'dateOfBirth': self.dateOfBirth,
            'adress': self.adress,
            'company': self.company,
        }
        