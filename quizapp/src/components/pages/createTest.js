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
      alert('Tạo bài thi thành công!');
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
        <button style={{ marginLeft: '45%', marginTop: '20px' }} className="btn btn-success" onClick={() => { this.setState({ form: null, cc: 'insert' }); this.handleinsert() }}>Thêm bài thi mới</button>
        <br /><br />
        <Container>
        <table className="table ">
          <thead>
            <tr>
              <th>Tên bài thi</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
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
                    <button className="btn btn-primary" ><Link style={{color: 'white', textDecoration: 'none'}} to={`/change-question/${item.idOfUser}/${item.idOfTest}`}>sửa</Link> </button>
                    
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
              <span>Nhập thông tin</span> :
              <span></span>
            }
            <span style={{ float: 'right' }} onClick={() => this.handleinsert()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div>
              <AvForm >
                <AvField name="timeStart" label="Thời gian bắt đầu" type="datetime-local" onChange={this.handleChange} value={form ? form.timeStart : ''} required />
                <AvField name="timeFinish" label="Thời gian kết thúc" type="datetime-local" onChange={this.handleChange} value={form ? form.timeFinish : ''} required />
                <AvField name="nameTest" label="Tên bài thi" type="text" onChange={this.handleChange} value={form ? form.nameTest : ''} required />
                <AvField name="passwdOfTest" label="mật khẩu" type="text" onChange={this.handleChange} value={form ? form.passwdOfTest : ''} required />
                <AvField name="limitOfNumUser" label="giới hạn lượt làm bài" type="text" onChange={this.handleChange} value={form ? form.limitOfNumUser : ''} required />
                <AvField name="status" label="status" type="text" onChange={this.handleChange} value={form ? form.status : ''} required />
                <AvField name="idOfUser" type="hidden" onChange={this.handleChange} value={form ? form.idOfUser = this.state.id.idOfUser : ''} required />
                <AvField name="numOfQuestion" label="số câu hỏi" type="text" onChange={this.handleChange} value={form ? form.numOfQuestion : ''} required />
                <AvField name="isEnable" type="hidden" onChange={this.handleChange} value={form ? form.isEnable = '1' : ''} required />
              </AvForm>

            </div>

          </ModalBody>

          <ModalFooter>
            {this.state.cc === 'insert' ?
              <button className="btn btn-success" onClick={() => { this.handlepost(); this.handleinsertquestion() }}>
                Thêm
                  </button> : <button className="btn btn-primary">

              </button>
            }
            <button className="btn btn-danger" onClick={() => this.handleinsert()}>Hủy</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.handleinsertquestion}>
          <ModalHeader style={{ display: 'block' }}>
            {this.state.cc === 'insert' ?
              <span>Nhập thông tin</span> :
              <span></span>
            }
            <span style={{ float: 'right' }} onClick={() => this.handleinsertquestion()}>x</span>
          </ModalHeader>
          <ModalBody>

            <div>
              <AvForm >
                <AvField name="idOfTest" type="hidden" onChange={this.handleChange} value={form ? form.idOfTest = form.idOfTest : ''} required />
                <AvField name="content" id="content" label="Nội dung câu hỏi" type="text" onChange={this.handleChange} value={form ? form.ques : ''} required />
                <AvField name="ansA" id="ansA" label="Đáp án A" type="text" onChange={this.handleChange} value={form ? form.ansA : ''} required />
                <AvField name="ansB" id="ansB" label="Đáp án B" type="text" onChange={this.handleChange} value={form ? form.ansB : ''} required />
                <AvField name="ansC" id="ansC" label="Đáp án C" type="text" onChange={this.handleChange} value={form ? form.ansC : ''} required />
                <AvField name="ansD" id="ansD" label="Đáp án D" type="text" onChange={this.handleChange} value={form ? form.ansD : ''} required />
                <AvField name="ansCorrect" id="ansCorrect" label="Đáp án đúng" type="text" onChange={this.handleChange} value={form ? form.ansCorrect : ''} required />
                <AvField name="swapAns" id="swapAns" label="Xáo đáp án" type="text" onChange={this.handleChange} value={form ? form.swapAns : ''} required />
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
            <button className="btn btn-danger" onClick={() => this.handleinsertquestion()}>Hủy</button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    );
  }
}
export default App;