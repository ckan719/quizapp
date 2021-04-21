import React, { useState } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import CRUD from "../../services/crud";


 

function Register(props) {
  const [postData, setPostData] = React.useState({
    email: "",
    password: "",
    nameUser: "",
    dateOfBirth: "",
    adress: "",
    company: "",
  });

 let history = useHistory();

  function onChangeData(e) {
    e.preventDefault();
    var name = e.target.name;
    var data = { ...postData, }
    data[name] = e.target.value;
    setPostData(data);
}

  function handleOnClickSubmit(e) {
    e.preventDefault();
    CRUD.register(postData)
      .then((response) => {
        console.log(response);
        if(response.data.data.nameUser != ''){
          history.push('/login');
        }else{
          alert('đăng ký thất bại');
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log("Send data : " + JSON.stringify(postData));

  }

  return (
    <div className="App">
      <h1>Trang đăng ký</h1>
      <div className="col-sm-6 offset-sm-3">
        <AvForm >
          <AvField name="email" label="email" type="text" onChange={onChangeData} value={postData.email} required />
          <AvField name="password" label="password" type="password" onChange={onChangeData} value={postData.password} required />
          <AvField name="nameUser" label="nameUser" type="text" onChange={onChangeData} value={postData.nameUser} required />
          <AvField name="dateOfBirth" label="dateOfBirth" type="date" onChange={onChangeData} value={postData.dateOfBirth} required />
          <AvField name="adress" label="adress" type="text" onChange={onChangeData} value={postData.adress} required />
          <AvField name="company" label="company" type="text" onChange={onChangeData} value={postData.company} required />
        </AvForm>
        <button className="btn btn-success" onClick={handleOnClickSubmit}>Đăng ký </button>
        <Link to={"/Login"}>   Đăng nhập ngay</Link>
      </div>
    </div>
  );

}
export default Register;

// function Login() {
//   const state = {
//       data: [],
//       form: {
//         email: '',
//         password: '',
//         }
//     }
    // const handlepost = async () => {
    //     await axios.post(url, this.state.form).then(response => {
    //       //console.log(response.data.data);
    //         if(response.data.data == 'Fail'){
    //             alert('Đăng nhập thất bại');
    //         }else{
    //           alert('trang chủ');
    //         }
    //     }).catch(error => {
    //       console.log(error.message);
    //     })

    //   }

    // const [email, setEmail]= useState("");
    // const [pass, setPass]= useState("");
    // const history = useHistory();
    // useEffect(() => {
    //     if(localStorage.getItem('user-info')){
    //         history.push("/add");
    //     }
    // }, [])
    // function Login(){
    //     console.warn(email,pass);
    //     let item={email,pass};
    //     let rs = await fetch("http://192.168.1.4:5000/get-account",{
    //         method: "POST",
    //         headers:{
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body:JSON.stringify(item)
    //     });
    //     rs = await rs.json();
    //     localStorage.setItem("user-info",JSON.stringify(rs));
    //     history.push("add")
    // }


