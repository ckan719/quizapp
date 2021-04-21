create table listQuestion (
    idOfQuestion SERIAL PRIMARY KEY,
    idOfTest smallint,
    content text,
    ansA text,
    ansB text,
    ansC text,
    ansD text,
    ansCorrect text,
    swapAns int
);

create table test (
    idOfTest SERIAL PRIMARY KEY,
    timeStart text,
    timeFinish text,
    status text,
    nameTest text,
    numOfQuestion smallint,
    isEnable smallint,
    idOfUser smallint,
    passwdOfTest text,
    limitOfNumUser int
);

create table account (
    idOfUser SERIAL PRIMARY KEY,
    email text,
    password text,
    nameUser text,
    dateOfBirth text,
    adress text,
    company text
);

create table listUserOfTest (
    id  SERIAL PRIMARY KEY,
    idOfTest smallint,
    idOfUser smallint,
    scoreOfUser text
);


select * from listquestion order by random() limit 10;
