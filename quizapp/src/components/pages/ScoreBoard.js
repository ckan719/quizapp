import React from 'react';
import Navbar from '../Navbar'
import CRUD from '../../services/crud';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { Container } from 'reactstrap';
function ScoreBoard() {
  let { idofuser } = useParams();
  let idUser = {
    'idOfUser': idofuser
  }
  const [listScoreOfMe, setListScoreOfMe] = React.useState([]);
  const [listScoreOfTest, setListScoreOfTest] = React.useState([]);
  const [scoreBoard, setScoreBoard] = React.useState([]);
  const [nameTest, setNameTest] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const showScoreBoard = (idOfTest) => {
    CRUD.getScoreOfTest({ 'idOfTest': idOfTest }).then(res => {
      console.log(res);
      setScoreBoard(res.data.data);
      setModal(!modal);
    });
  }

  const [a, setA] = React.useState([]);

  React.useEffect(() => {
    CRUD.getScoreOfMe(idUser).then(res => {
      setListScoreOfMe(res.data.data);
    });
    CRUD.getTestById(idUser).then(res => {
      setListScoreOfTest(res.data.data);
    });
  }, []);
  

    
    
  return (
    
    <>
    <div style={{position: "fixed", width:"100%"}}><Navbar /></div>
    
      
      <Container>
        <div style={{marginTop:'70px'}}>
        <h1>Điểm của bạn</h1>
        <div>
          <Table dark >
            <thead>
              <tr>
                <th>#</th>
                <th>Name Test</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {/* {nameTest.map((data) => ( */}
                {listScoreOfMe.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.idOfTest}</td>
                    <td>{item.scoreOfUser}</td>
                  </tr>
                ))}
              {/* ))} */}
              
            </tbody>
          </Table>
        </div>
      </div>
        <div>
          <h1>Contest của bạn</h1>
          <div>
            <Table dark>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID Test</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
              {/* {nameTest.map((data) => ( */}
                {listScoreOfTest.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.idOfUser}</td>
                    <td><Button onClick={() => showScoreBoard(item.idOfTest)}>Xem</Button></td>
                  </tr>
                ))}
                {/* ))} */}
              </tbody>
            </Table>
          </div>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Bảng điểm</ModalHeader>
            <ModalBody>
              <Table dark>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                {nameTest.map((data) => (
                  scoreBoard.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data.nameTest}</td>
                      <td>{item.scoreOfUser}</td>
                    </tr>
                  ))
                  ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        </Container>
    </>
  );
}

export default ScoreBoard;