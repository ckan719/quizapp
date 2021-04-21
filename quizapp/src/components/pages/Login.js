// import React, { useState } from 'react';
// import { AvForm, AvField } from 'availity-reactstrap-validation';
// import axios from "axios";
// import { useHistory } from 'react-router-dom';
// import CRUD from "../../services/crud";
// import { useParams } from "react-router";

// function Login(props) {
//   const [postData, setPostData] = React.useState({
//     email: "",
//     password: "",

//   });

//   let history = useHistory();

//   function handleChangeEmail(e) {
//     e.preventDefault();
//     setPostData({ ...postData, email: e.target.value }); //Only change customer name in postData
//   }
//   function handleChangePass(e) {
//     e.preventDefault();
//     setPostData({ ...postData, password: e.target.value }); //Only change contact name in postData
//   }
//   let { idofuser } = useParams();
//   function handleOnClickSubmit(e) {
//     e.preventDefault();
//     CRUD.login(postData)
//       .then((response) => {

//         if (response.data.data == 'Fail') {
//           alert('Đăng nhập thất bại');
//         } else {
//           response.data.data.map(item => (
//             idofuser = item.idOfUser,
//             console.log(idofuser),
//             history.push("/"+idofuser+"/choose-test")
//           ));
//           //history.push("/login");
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//     console.log("Send data : " + JSON.stringify(postData));

//   }


//   const [form, setForm] = useState(0);

//   return (
//     <div className="App">
//       <h1>Trang đăng nhập</h1>
//       <div className="col-sm-6 offset-sm-3">
//         <AvForm >
//           <AvField name="email" label="email" type="text" onChange={handleChangeEmail} value={postData.email} required />
//           <AvField name="password" label="password" type="password" onChange={handleChangePass} value={postData.password} required />
//         </AvForm>
//         <button className="btn btn-success" onClick={handleOnClickSubmit}>Đăng nhập
//             </button>
//       </div>
//     </div>
//   );

// }
// export default Login;
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import CRUD from "../../services/crud";
import { useParams } from "react-router";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  //function Login(props) {
  const [postData, setPostData] = React.useState({
    email: "",
    password: "",

  });

  let history = useHistory();

  function handleChangeEmail(e) {
    e.preventDefault();
    setPostData({ ...postData, email: e.target.value }); //Only change customer name in postData
  }
  function handleChangePass(e) {
    e.preventDefault();
    setPostData({ ...postData, password: e.target.value }); //Only change contact name in postData
  }
  let { idofuser } = useParams();
  function handleOnClickSubmit(e) {
    e.preventDefault();
    CRUD.login(postData)
      .then((response) => {

        if (response.data.data == 'Fail') {
          alert('Đăng nhập thất bại');
        } else {
          response.data.data.map(item => (
            idofuser = item.idOfUser,
            console.log(idofuser),
            history.push("/choose-test" + "/"+idofuser)
          ));
          //history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log("Send data : " + JSON.stringify(postData));

  }
  const register = ()=>{
    history.push("/register");
  }

  const [form, setForm] = useState(0);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={handleChangeEmail} value={postData.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChangePass} value={postData.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={handleOnClickSubmit}
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
  //}
}
