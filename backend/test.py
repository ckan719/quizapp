class test:
    def __init__(
        self,
        idOfTest=None,
        timeStart=None,
        timeFinish=None,
        status=None,
        nameTest=None,
        numOfQuestion=None,
        isEnable=None,
        idOfUser=None,
        passwdOfTest=None,
        limitOfNumUser=None,
    ):
        self.idOfTest = idOfTest
        self.timeStart = timeStart
        self.timeFinish = timeFinish
        self.status = status
        self.nameTest = nameTest
        self.numOfQuestion = numOfQuestion
        self.isEnable = isEnable
        self.idOfUser = idOfUser
        self.passwdOfTest = passwdOfTest
        self.limitOfNumUser = limitOfNumUser
    def parseTest(self,data):
        self.idOfTest = data[0]
        self.timeStart = data[1]
        self.timeFinish = data[2]
        self.status = data[3]
        self.nameTest = data[4]
        self.numOfQuestion = data[5]
        self.isEnable = data[6]
        self.idOfUser = data[7]
        self.passwdOfTest = data[8]
        self.limitOfNumUser = data[9]
    def toJson(self):
        return {
            'idOfTest':self.idOfTest,
            'timeStart':self.timeStart,
            'timeFinish':self.timeFinish,
            'status':self.status,
            'nameTest':self.nameTest,
            'numOfQuestion':self.numOfQuestion,
            'isEnable':self.isEnable,
            'idOfUser':self.idOfUser,
            'passwdOfTest':self.passwdOfTest,
            'limitOfNumUser':self.limitOfNumUser,
        }