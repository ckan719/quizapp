import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import CRUD from '../../services/crud';
import './playtest.scss';
import { Container, Row, Col, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function PlayTest() {
    const history = useHistory()
    const { idoftest } = useParams();
    const { idofuser } = useParams();
    
    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        CRUD.getScore(mjson).then((res) => {
            console.log(res);
        })
        setOpen(false);
        history.push('/choose-test' + '/' + idofuser);
        console.log(mjson);
    };
    //enddialog
    
    let idTest = {
        "idOfTest": idoftest
    }
    let idUser = {
        "idOfUser": idofuser
    }
    
    const [score, setScore] = React.useState([]);
    const [mjson, setMjson] = React.useState([]);
    const [listDataQues, setListDataQues] = React.useState([]);

    const [time, setTime] = React.useState([]);
    const [times, setTimes] = React.useState({ minutes: 0, seconds: 0 });

    const [activeNow, setActiveNow] = React.useState(0);
    const [yourChoose, setYourChoose] = React.useState([]);


    const notifyData = () => {
        console.log(idTest);

        CRUD.getQuestion(idTest).then((res) => {
            setListDataQues(res.data.data);
            console.log(res.data.data);
        });
        CRUD.getTestByIdTest(idTest).then((res) => {
            setTime(res.data.data);
            console.log(res.data.data);
            //startTimer(res.data.data.timeStart, res.data.data.timeFinish);

            const start = new Date(res.data.data.timeStart);
            const finish = new Date(res.data.data.timeFinish);

            const distance = finish.getTime() - start.getTime();
            const minute = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            const second = Math.floor(distance % (1000 * 60) / (1000));
                console.log(minute);
            setTimes({
                minutes: minute,
                seconds: second
            });

        });
    }
    React.useEffect(() => {
        notifyData();
    }, []);
    const handlsubmit = (idTest, idUser) => {
        
        var temp = 0;
        listDataQues.map((item, index) => {
            if (item.ansCorrect == yourChoose[index]) {
                temp++;
            }
        });
        var dt = { ...score, }
        dt['point'] = temp;
        console.log("diem temp " + dt.point);
        setScore(dt);
        var mmjson = {
            'idOfTest': idTest.idOfTest,
            'idOfUser': idUser.idOfUser,
            'scoreOfUser': dt.point,
        }
        setMjson(mmjson);
       

        setOpen(true);
    }
    const isActive = (index) => {
        if (index === activeNow) {
            return 'ques activee';
        }
        return 'ques';
    }
    // const goPre = (index) => {
    //     if (index > 0) {
    //         setActiveNow(index - 1);
    //     }
    //     return;
    // }
    // const goNext = (index) => {
    //     if (index < listDataQues.length - 1) setActiveNow(index + 1);
    //     return;
    // }
    const isChoose = (index, item, choose) => {
        var data = { ...yourChoose };
        data[index] = choose;
        setYourChoose(data);
    }
    const isActive1 = (choose, index) => {
        if (choose == yourChoose[index]) return "option active";
        return 'option';
    }
    const startTimer = () => {

        if (times.minutes === 0 && times.seconds === 0) {
            handlsubmit(idTest, idUser);
        } else if (times.seconds === 0) {
            setTimes({
                minutes: times.minutes - 1,
                seconds: 59
            });
        } else {
            setTimes({
                minutes: times.minutes,
                seconds: times.seconds - 1
            });
        }
    }

    React.useEffect(() => {
        let timer = setInterval(() => startTimer(), 1000);
        return () => clearInterval(timer);
    });

    return (
        <div>
            <Alert severity="warning">Kiểm tra kỹ trước khi submit</Alert>
            {
                listDataQues?.map((item, index) => (
                    <div>
                        <Fragment>
                            <Helmet><title>Trắc nghiệm</title></Helmet>
                            <div className="questions" className={isActive(index)}>
                                <div className="timer-container">
                                    <p>
                                        {/* <span className="left" style={{float:'left'}}><span className="mdi mdi-set-center mdi-24px lifeline-icon">{index + 1}/10</span></span> */}

                                    </p>
                                </div>
                                <h5>{"Question " + (index + 1) + " : " + item.content}</h5>
                                {item.swapAns == 4 ?
                                    <>
                                        <div className="options-container">
                                            <p className={isActive1(item.ansC, index)} onClick={() => isChoose(index, item, item.ansC)}>{"A." + item.ansC} </p>
                                            <p className={isActive1(item.ansA, index)} onClick={() => isChoose(index, item, item.ansA)}>{"C." + item.ansA} </p>
                                        </div>
                                        <div className="options-container">
                                            <p className={isActive1(item.ansD, index)} onClick={() => isChoose(index, item, item.ansD)}>{"B." + item.ansD} </p>
                                            <p className={isActive1(item.ansB, index)} onClick={() => isChoose(index, item, item.ansB)}>{"D." + item.ansB} </p>

                                        </div>
                                    </> : item.swapAns == 3 ?
                                        <>
                                            <div className="options-container">
                                                <p className={isActive1(item.ansA, index)} onClick={() => isChoose(index, item, item.ansA)}>{"A." + item.ansA} </p>
                                                <p className={isActive1(item.ansC, index)} onClick={() => isChoose(index, item, item.ansC)}>{"C." + item.ansC} </p>
                                            </div>
                                            <div className="options-container">
                                                <p className={isActive1(item.ansB, index)} onClick={() => isChoose(index, item, item.ansB)}>{"B." + item.ansB} </p>
                                                <p className={isActive1(item.ansD, index)} onClick={() => isChoose(index, item, item.ansD)}>{"D." + item.ansD} </p>
                                            </div>
                                        </> :
                                        <>
                                            <div className="options-container">
                                                <p className={isActive1(item.ansB, index)} onClick={() => isChoose(index, item, item.ansB)}>{"A." + item.ansB} </p>
                                                <p className={isActive1(item.ansA, index)} onClick={() => isChoose(index, item, item.ansA)}>{"C." + item.ansA} </p>
                                            </div>
                                            <div className="options-container">
                                                <p className={isActive1(item.ansC, index)} onClick={() => isChoose(index, item, item.ansC)}>{"B." + item.ansC} </p>
                                                <p className={isActive1(item.ansD, index)} onClick={() => isChoose(index, item, item.ansD)}>{"D." + item.ansD} </p>
                                            </div>
                                        </>


                                }

                                {/* <div className="button-container">
                                    <button id="previous-button" onClick={() => goPre(index)}>Previous</button>
                                    <button id="next-button" onClick={() => goNext(index)}>Next</button>
                                </div> */}

                            </div>
                        </Fragment>
                    </div>
                ))
            }

            <div className="btnsubmit">
                <Button className="submit" onClick={() => handlsubmit(idTest, idUser)}>Hoàn thành { } </Button>
            </div>
            <div style={{height:"50px"}} ></div>
            <span className="right">{times.minutes}:{times.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Thông báo!!!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Điểm của bạn là: {score.point}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose} color="primary" autoFocus>
                            OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
export default PlayTest;
