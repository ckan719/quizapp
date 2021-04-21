import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,Table } from 'reactstrap';
import Navbar from '../Navbar';
import CRUD from "../../services/crud";
import FormLabel from '@material-ui/core/FormLabel';

class App extends Component {
    state = {
        data: [],
        handleinsert: false,
        handledelete: false,
        id: {
            idOfUser: ''
        },
        form: {
            idOfUser: '',
            email: '',
            password: '',
            nameUser: '',
            dateOfBirth: '',
            adress: '',
            company: '',
            cc: ''
        }
    }


    handleget = () => {
        // var a = parseInt(idOfTest);
        //console.log(window.location.pathname.substr(12));
        this.state.id.idOfUser = window.location.pathname.substr(12);
        console.log(this.state.id);
        axios.post(CRUD.getUser, this.state.id).then(response => {
            this.setState({ data: [response.data.data] });
            console.log(response.data.data);
        }).catch(error => {
        console.log(error.message);
        })
    }

    
      handleput = () => {
        // this.state.id2.idOfQuestion = this.state.form.idOfQuestion;
        // console.log(this.state.id2);
        axios.put(CRUD.updateUser, this.state.form).then(response => {
          this.handleinsert();
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
            idOfUser: item.idOfUser,
            email: item.email,
            password: item.password,
            nameUser: item.nameUser,
            dateOfBirth: item.dateOfBirth,
            adress: item.adress,
            company: item.company
    
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
            <Navbar />
              <div style={{marginTop: '90px'}}>
                {this.state.data.map(item => {
                  return (
                          <div className="container" >
                            <div className="main-body">
                              <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                  <div className="card">
                                    <div className="card-body">
                                      <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/117770934_1207267669672121_7134104150954454109_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=JEefvoFUhasAX-lWCWh&_nc_ht=scontent.fdad2-1.fna&oh=be249c45a810b40ef3017a300459c7e7&oe=609603CA" alt="Admin" className="rounded-circle" width={150} />
                                        {/* https://bootdey.com/img/Content/avatar/avatar7.png */}
                                        <div className="mt-3">
                                          <h4>{item.nameUser}</h4>
                                          <p className="text-secondary mb-1">Full Stack Developer</p>
                                          <p className="text-muted font-size-sm">Da Nang - Viet Nam</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                </div>
                                <div className="col-md-8">
                                  <div className="card mb-3">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                          {item.nameUser}
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                          {item.email}
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <h6 className="mb-0">Birthday</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                          {item.dateOfBirth}
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <h6 className="mb-0">Company</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                          {item.company}
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                          {item.adress}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                            <div style={{width: '100%',textAlign:'center'}}>
                             <button style={{width: '15%'}} className="btn btn-primary" onClick={() => { this.selectedItem(item); this.handleinsert() }}>Thay đổi</button>
                            </div> 
                          </div>
                        
                     
                  )
                })}
                </div>
    
            <Modal isOpen={this.state.handleinsert}>
          <ModalHeader style={{  }}>
            {this.state.cc === 'insert' ?
              <span>Nhập thông tin</span> :
              <span>Sửa thông tin</span>
            }
            <span style={{ marginLeft:'330px' }} onClick={() => this.handleinsert()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div>
              <AvForm >
                <AvField name="email" label="" type="hidden" onChange={this.handleChange} value={form ? form.email : ''}  required />
                <AvField name="password" label="Password" type="text" onChange={this.handleChange} value={form ? form.password : ''} required />
                <AvField name="nameUser" label="Name" type="text" onChange={this.handleChange} value={form ? form.nameUser : ''} required />
                <AvField name="dateOfBirth" label="Birth Day" type="date" onChange={this.handleChange} value={form ? form.dateOfBirth : ''} required />
                <AvField name="adress" label="Adress" type="text" onChange={this.handleChange} value={form ? form.adress : ''} required />
                <AvField name="company" label="Company" type="text" onChange={this.handleChange} value={form ? form.company : ''} required />
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

          </div>
        );
      }
    }
    export default App;
