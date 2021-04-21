import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Navbar from '../Navbar';
import CRUD from "../../services/crud";

class App extends Component {
  state = {
    data: [],
    handleinsert: false,
    handledelete: false,
    id: {
      idOfTest: ''
    },
    id2: {
      idOfQuestion: ''
    },
    form: {
      idOfQuestion: '',
      idOfTest: '',
      content: '',
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
    // var a = parseInt(idOfTest);
    this.state.id.idOfTest = window.location.pathname.substr(19);
    console.log(this.state.id.idOfTest);
    axios.post(CRUD.getQuestions, this.state.id).then(response => {
      this.setState({ data: response.data.data });
      console.log(response.data.data);
    }).catch(error => {
      console.log(error.message);
    })

    // CRUD.getQuestions(a).then(response=>{
    //   this.setState({data: response.data.data});
    //   //console.log(window.location.pathname.substr(-1));
    // }).catch(error=>{
    //   console.log(error.message);
    // })
  }

  handlepost = async () => {
    //delete this.state.form.idOfQuestion;
    await axios.post(CRUD.addQuestion, this.state.form).then(response => {
      this.handleinsert();
      this.handleget();
    }).catch(error => {
      console.log(error.message);
    })
  }

  handleput = () => {
    // this.state.id2.idOfQuestion = this.state.form.idOfQuestion;
    // console.log(this.state.id2);
    axios.post(CRUD.updateQuestion, this.state.form).then(response => {
      this.handleinsert();
      this.handleget();
    })
  }

  handledelete = () => {
    this.state.id2.idOfQuestion = this.state.form.idOfQuestion;
    console.log(this.state.id2);
    axios.post(CRUD.deleteQuestion, this.state.id2).then(response => {
      this.setState({ handledelete: false });
      this.handleget();
    })
  }

  handleinsert = () => {
    this.setState({ handleinsert: !this.state.handleinsert });
  }

  selectedItem = (item) => {
    this.setState({
      cc: 'update',
      form: {
        idOfQuestion: item.idOfQuestion,
        idOfTest: item.idOfTest,
        content: item.content,
        ansA: item.ansB,
        ansB: item.ansB,
        ansC: item.ansC,
        ansD: item.ansD,
        ansCorrect: item.ansCorrect,
        swapAns: item.swapAns

      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    //console.log(e.target.value);
  }


  componentDidMount() {
    this.handleget();
  }


  render() {
    const { form } = this.state;
    return (
      <div className="App" style={{position: 'fixed',width:'100%'}} >
        <div style={{ 'marginBottom' : '30px'}}>
          <Navbar />
        </div>
        <br /><br /><br />
        <button className="btn btn-success" style={{ marginLeft: '600px', marginTop: '20px' }} onClick={() => { this.setState({ form: null, cc: 'insert' }); this.handleinsert() }}>Thêm</button>
        <br /><br />

        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>content</th>
              <th>ansA</th>
              <th>ansB</th>
              <th>ansC</th>
              <th>ansD</th>
              <th>ansCorrect</th>
              <th>swapAns</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item,index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{item.content}</td>
                  <td>{item.ansA}</td>
                  <td>{item.ansB}</td>
                  <td>{item.ansC}</td>
                  <td>{item.ansD}</td>
                  <td>{item.ansCorrect}</td>
                  <td>{item.swapAns}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.selectedItem(item); this.handleinsert() }}><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => { this.selectedItem(item); this.setState({ handledelete: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.handleinsert}>
          <ModalHeader style={{ display: 'block' }}>
            {this.state.cc === 'insert' ?
              <span>Nhập thông tin</span> :
              <span>Sửa thông tin</span>
            }
            <span style={{ float: 'right' }} onClick={() => this.handleinsert()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div>
              <AvForm >
                <AvField name="idOfTest" type="hidden" onChange={this.handleChange} value={form ? form.idOfTest = this.state.id.idOfTest : ''} required />
                <AvField name="content" label="content" type="text" onChange={this.handleChange} value={form ? form.content : ''} required />
                <AvField name="ansA" label="ansA" type="text" onChange={this.handleChange} value={form ? form.ansA : ''} required />
                <AvField name="ansB" label="ansB" type="text" onChange={this.handleChange} value={form ? form.ansB : ''} required />
                <AvField name="ansC" label="ansC" type="text" onChange={this.handleChange} value={form ? form.ansC : ''} required />
                <AvField name="ansD" label="ansD" type="text" onChange={this.handleChange} value={form ? form.ansD : ''} required />
                <AvField name="ansCorrect" label="ansCorrect" type="text" onChange={this.handleChange} value={form ? form.ansCorrect : ''} required />
                <AvField name="swapAns" label="swapAns" type="text" onChange={this.handleChange} value={form ? form.swapAns : ''} required />
              </AvForm>

            </div>

          </ModalBody>

          <ModalFooter>
            {this.state.cc === 'insert' ?
              <button className="btn btn-success" onClick={() => this.handlepost()}>
                Thêm
                  </button> : <button className="btn btn-primary" onClick={() => this.handleput()}>
                Sửa
                  </button>
            }
            <button className="btn btn-danger" onClick={() => this.handleinsert()}>Hủy</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.handledelete}>
          <ModalBody>
            Bạn có muốn xóa dòng này {form && form.a}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.handledelete()}>Đồng ý</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ handledelete: false })}>Hủy</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default App;