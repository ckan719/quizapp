import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar'
import CRUD from "../../services/crud";

let count = 1;

class App extends Component {
  state = {
    data: [],
    handleinsert: false,
    handleinsertquestion: false,
    id:{
      idOfUser: '',
    },
    form: {
      timeStart: '',
      timeFinish: '',
      status: '',
      nameTest: '',
      numOfQuestion: '',
      isEnable: 1,
      idOfUser: '',
      passwdOfTest: '',
      limitOfNumUser: '',
      idOfTest: '',
      numQ: '',
      ques: '',
      ansA: '',
      ansB: '',
      ansC: '',
      ansD: '',
      ansCorrect: '',
      swapAns: '',
      cc: ''
    }
  }



  handleget = () => {
    this.state.id.idOfUser = window.location.pathname.substr(12);
    console.log(this.state.id);
    axios.post(CRUD.getTestId, this.state.id).then(response => {
      this.setState({ data: response.data.data });
      console.log(response.data.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  handlepost = async () => {
    
    await axios.post(CRUD.addTest, this.state.form).then(response => {
      this.handleinsert();
      console.log(response.data.data.idOfTest);
      this.state.form.idOfTest = response.data.data.idOfTest;
      this.handleget();
      this.state.form.numQ = response.data.data.numOfQuestion;
    }).catch(error => {
      console.log(error.message);
    })

  }

  handlepostquestion = async () => {
    await axios.post(CRUD.addQuestion, this.state.form).then(response => {
      count += 1;
      console.log(count);
      //this.handleinsertquestion();
    }).catch(error => {
      console.log(error.message);
    })
  }

  handleinsert = () => {
    this.setState({ handleinsert: !this.state.handleinsert });
  }

  handleinsertquestion = () => {
    this.setState({ handleinsertquestion: !this.state.handleinsertquestion });
  }

  componentDidMount() {
    this.handleget();
  }


  handlenumquestion = () => {
    let num = this.state.form.numQ;
    console.log(num);
    if (count >= num) {
      this.handleinsertquestion();
      count = 0;
      alert('T???o b??i thi th??nh c??ng!');
    } else {
      //this.handleinsertquestion();
      document.getElementById('content').value = '';
      document.getElementById('ansA').value = '';
      document.getElementById('ansB').value = '';
      document.getElementById('ansC').value = '';
      document.getElementById('ansD').value = '';
      document.getElementById('ansCorrect').value = '';
      document.getElementById('swapAns').value = '';
    }
  }
  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }


  render() {
    const { form } = this.state;
    return (
      <div className="App" style={{position: 'fixed',width:'100%'}}>
        <div style={{ 'marginBottom' : '30px'}}>
          <Navbar />
        </div>
        
        <div style={{marginTop: '64px'}}>
        <button style={{ marginLeft: '45%', marginTop: '20px' }} className="btn btn-success" onClick={() => { this.setState({ form: null, cc: 'insert' }); this.handleinsert() }}>Th??m b??i thi m???i</button>
        <br /><br />
        <Container>
        <table className="table ">
          <thead>
            <tr>
              <th>T??n b??i thi</th>
              <th>Th???i gian b???t ?????u</th>
              <th>Th???i gian k???t th??c</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(item => {
              return (
                <tr>
                  <td>{item.nameTest}</td>
                  <td>{item.timeStart}</td>
                  <td>{item.timeFinish}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="btn btn-primary" ><Link style={{color: 'white', textDecoration: 'none'}} to={`/change-question/${item.idOfUser}/${item.idOfTest}`}>s???a</Link> </button>
                    
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </Container>
        
        <Modal isOpen={this.state.handleinsert} style={{ maxHeight: '100%' }}>
          <ModalHeader style={{ display: 'block' }}>
            {this.state.cc === 'insert' ?
              <span>Nh???p th??ng tin</span> :
              <span></span>
            }
            <span style={{ float: 'right' }} onClick={() => this.handleinsert()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div>
              <AvForm >
                <AvField name="timeStart" label="Th???i gian b???t ?????u" type="datetime-local" onChange={this.handleChange} value={form ? form.timeStart : ''} required />
                <AvField name="timeFinish" label="Th???i gian k???t th??c" type="datetime-local" onChange={this.handleChange} value={form ? form.timeFinish : ''} required />
                <AvField name="nameTest" label="T??n b??i thi" type="text" onChange={this.handleChange} value={form ? form.nameTest : ''} required />
                <AvField name="passwdOfTest" label="m???t kh???u" type="text" onChange={this.handleChange} value={form ? form.passwdOfTest : ''} required />
                <AvField name="limitOfNumUser" label="gi???i h???n l?????t l??m b??i" type="text" onChange={this.handleChange} value={form ? form.limitOfNumUser : ''} required />
                <AvField name="status" label="status" type="text" onChange={this.handleChange} value={form ? form.status : ''} required />
                <AvField name="idOfUser" type="hidden" onChange={this.handleChange} value={form ? form.idOfUser = this.state.id.idOfUser : ''} required />
                <AvField name="numOfQuestion" label="s??? c??u h???i" type="text" onChange={this.handleChange} value={form ? form.numOfQuestion : ''} required />
                <AvField name="isEnable" type="hidden" onChange={this.handleChange} value={form ? form.isEnable = '1' : ''} required />
              </AvForm>

            </div>

          </ModalBody>

          <ModalFooter>
            {this.state.cc === 'insert' ?
              <button className="btn btn-success" onClick={() => { this.handlepost(); this.handleinsertquestion() }}>
                Th??m
                  </button> : <button className="btn btn-primary">

              </button>
            }
            <button className="btn btn-danger" onClick={() => this.handleinsert()}>H???y</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.handleinsertquestion}>
          <ModalHeader style={{ display: 'block' }}>
            {this.state.cc === 'insert' ?
              <span>Nh???p th??ng tin</span> :
              <span></span>
            }
            <span style={{ float: 'right' }} onClick={() => this.handleinsertquestion()}>x</span>
          </ModalHeader>
          <ModalBody>

            <div>
              <AvForm >
                <AvField name="idOfTest" type="hidden" onChange={this.handleChange} value={form ? form.idOfTest = form.idOfTest : ''} required />
                <AvField name="content" id="content" label="N???i dung c??u h???i" type="text" onChange={this.handleChange} value={form ? form.ques : ''} required />
                <AvField name="ansA" id="ansA" label="????p ??n A" type="text" onChange={this.handleChange} value={form ? form.ansA : ''} required />
                <AvField name="ansB" id="ansB" label="????p ??n B" type="text" onChange={this.handleChange} value={form ? form.ansB : ''} required />
                <AvField name="ansC" id="ansC" label="????p ??n C" type="text" onChange={this.handleChange} value={form ? form.ansC : ''} required />
                <AvField name="ansD" id="ansD" label="????p ??n D" type="text" onChange={this.handleChange} value={form ? form.ansD : ''} required />
                <AvField name="ansCorrect" id="ansCorrect" label="????p ??n ????ng" type="text" onChange={this.handleChange} value={form ? form.ansCorrect : ''} required />
                <AvField name="swapAns" id="swapAns" label="X??o ????p ??n" type="text" onChange={this.handleChange} value={form ? form.swapAns : ''} required />
              </AvForm>
            </div>

          </ModalBody>

          <ModalFooter>
            {this.state.cc === 'insert' ?
              <button className="btn btn-success" onClick={() => { this.handlepostquestion(); this.handlenumquestion() }}>
                Next
                  </button> : <button className="btn btn-primary">
                Preview
                  </button>
            }
            <button className="btn btn-danger" onClick={() => this.handleinsertquestion()}>H???y</button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    );
  }
}
export default App;