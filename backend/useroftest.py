class useroftest:
    def __init__(self, id=None, idOfTest=None, idOfUser=None, scoreOfUser=None ):
        self.id = id
        self.idOfTest = idOfTest
        self.idOfUser = idOfUser
        self.scoreOfUser = scoreOfUser
    def parseData(self, data):
        self.id = data[0]
        self.idOfTest = data[1]
        self.idOfUser = data[2]
        self.scoreOfUser = data[3]
    def toJson(self):
        return {
            'id':self.id,
            'idOfTest':self.idOfTest,
            'idOfUser':self.idOfUser,
            'scoreOfUser':self.scoreOfUser,
        }