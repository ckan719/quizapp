// import React,{Component,Fragment} from 'react';
// import {Helmet} from 'react-helmet';
// import CRUD from '../../services/crud';
// import './test.scss';
// import { Container, Row, Col, Button } from 'reactstrap';
// import { makeStyles } from '@material-ui/core/styles';
// import Alert from '@material-ui/lab/Alert'; 
// function Test() {
//     const [listItems, setListItems] = React.useState([]);
//     const [activeNow, setActiveNow] = React.useState(0);
//     const dfvalue = [
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//         { 'idques' : '', 'ans' : ''},
//     ]
//     const [yourChoose, setYourChoose] = React.useState(dfvalue);
//     const notifyData = () => {
//         CRUD.getQuestion().then((res) => {
//             setListItems(res.data.data);
//             console.log(listItems);
//         });
//     }
//     const isActive = (index) => {
//         if (index === activeNow) {
//             return 'ques activee';
//         }
//         return 'ques';
//     }
//     const goPre = (index) => {
//         if (index > 0) {
//             setActiveNow(index - 1);
//         }
//         return;
//     }
//     const goNext = (index) => {
//         if (index < listItems.length - 1) setActiveNow(index + 1);
//         return;
//     }
//     const isChoose = (index ,idques, choose) => {
//         var data = { ...yourChoose };
//         data[index]['idques'] = idques;
//         data[index]['ans'] = choose;
//         setYourChoose(data);
//     }
//     // CHẤM ĐIỂM Ở ĐÂY , SỬ DỤNG PROPS NẾU MUỐN CHUYỂN ĐIỂM QUA TRANG KHÁC
//     const submitTest = () => {
//         console.log(yourChoose);
//         var point = 0;
//         listItems.map((item, index) => {
//             if (item.ansCorrect === yourChoose[index]['ans'] && item.idques === yourChoose[index]['idques']) point++;
//         });

//         CRUD.getScore(yourChoose).then(res =>{
//             console.log(res);
//             point = res.data;
//         });

//         alert("Point : " + point);
//     }
//     const isCAT = (index,idques, ans) => {
//         if (yourChoose[index]['idques'] === idques && yourChoose[index]['ans'] === ans) return 'option answer active';
//         return 'option answer'
//     }
//     React.useEffect(() => {
//         notifyData();
//     }, []);
//     return (
//             <div>
//                 <Alert severity="warning">Kiểm tra kỹ trước khi submit</Alert>
//                 {
//                 listItems?.map((item, index) => (
//                     <div>
//                         <Fragment>
//                             <Helmet><title>Trắc nghiệm</title></Helmet>
//                             <div className="questions" className={isActive(index)}>
//                                 <div className="timer-container">
//                                     <p>
//                                         <span className="left" style={{float:'left'}}><span className="mdi mdi-set-center mdi-24px lifeline-icon">{index + 1}/10</span></span>
//                                         <span className="right">2:15 <span className="mdi mdi-clock-outline mdi-24px"></span></span>
//                                     </p>
//                                 </div>
//                                 <h5>{"Question " + (index + 1) + " : " + item.ques}</h5>
//                                 <div className="options-container">
//                                     <p className = {isCAT(item.idques,item.ansA)}  onClick={() => isChoose(item.idques, item.ansA)}  >{"A. " + item.ansA} </p>
//                                     <p className = {isCAT(item.idques,item.ansB)}  onClick={() => isChoose(item.idques, item.ansB)}  >{"B. " + item.ansB} </p>
//                                 </div>
//                                 <div className="options-container">
//                                     <p className = {isCAT(item.idques,item.ansC)}  onClick={() => isChoose(item.idques, item.ansC)}  >{"C. " + item.ansC} </p>
//                                     <p className = {isCAT(item.idques,item.ansD)}  onClick={() => isChoose(item.idques, item.ansD)}  >{"D. " + item.ansD} </p>
//                                 </div>
//                                 <div className="button-container">
//                                     <button  id="previous-button" onClick={() => goPre(index)}>Previous</button>
//                                     <button  id="next-button" onClick={() => goNext(index)}>Next</button>
//                                 </div>
                                
//                             </div>
//                         </Fragment>
//                     </div>
// ))
//                     }
//                     <Button onClick={() => submitTest()}>Submit</Button>
//             </div>
//     );
// }
// export default Test;