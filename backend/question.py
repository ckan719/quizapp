class question:
    def __init__(
        self,
        idOfQuestion=None,
        content=None,
        ansA=None,
        ansB=None,
        ansC=None,
        ansD=None,
        ansCorrect=None,
        swapAns=None,
        idOfTest=None
    ):
        self.idOfQuestion = idOfQuestion
        self.content = content
        self.ansA = ansA
        self.ansB = ansB
        self.ansC = ansC
        self.ansD = ansD
        self.ansCorrect = ansCorrect
        self.swapAns = swapAns
        self.idOfTest = idOfTest

    def parseQuestion(self, data):
        self.idOfQuestion = data[0]
        self.idOfTest = data[1]
        self.content = data[2]
        self.ansA = data[3]
        self.ansB = data[4]
        self.ansC = data[5]
        self.ansD = data[6]
        self.ansCorrect = data[7]
        self.swapAns = data[8]
        

    def toJson(self):
        return {
            "idOfQuestion": self.idOfQuestion,
            "idOfTest": self.idOfTest,
            "content": self.content,
            "ansA": self.ansA,
            "ansB": self.ansB,
            "ansC": self.ansC,
            "ansD": self.ansD,
            "ansCorrect": self.ansCorrect,
            "swapAns": self.swapAns,
        }