import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
  Button
} from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from 'react-router-dom';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    '&:hover': {
      color: `white`,
      textDecoration: `none`,
    },
  },
  user: {
    display: 'none'
  },
  login: {
    display: 'none'
  },
  login1: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    '&:hover': {
      color: `white`,
      textDecoration: `none`,
    },
    paddingTop: `20px`
  }
});


function Header(item) {
  let history = useHistory();
  const { idofuser } = useParams();

  const classes = useStyles();
  const linkToUser = () => {
    history.push("/infor-user/" + idofuser);
  }
  React.useEffect(() => {
  }, []);
  const logout = () => {
    history.push("/login/");
  }
  const classess = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // end profile


  const iconUser = (
    <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => linkToUser()}>Profile</MenuItem>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </Menu>
                </div>
  );
  const iconLogin = (

    <Link to={`/login`}><Button className={classes.login1} color="inherit">Login</Button></Link>
  );


  const handleClick = (title, path) => {

    if (typeof (idofuser) != "undefined") {
      return path;
    }
    history.push("/home");
  }
  // profile
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //   },
  //   title: {
  //     flexGrow: 1,
  //   },
  // }));

  

  return (
    <div style={{position:'absolute', width:'100%'}}>
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <CheckBoxIcon fontSize="large"
              padding="10px"
            />
            <a className={classes.linkText} href={typeof (idofuser) == "undefined" ? "/home" : "/home/" + idofuser}>QuizDau</a>

          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >

            <a href={typeof (idofuser) == "undefined" ? "/home" : "/home/" + idofuser} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="Trang chủ" />
              </ListItem>
            </a>
            <a href={typeof (idofuser) == "undefined" ? "/login" : "/choose-test/" + idofuser} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="Bài thi" />
              </ListItem>
            </a>
            <a href={typeof (idofuser) == "undefined" ? "/login" : "/createTest/" + idofuser} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="Tạo bài thi" />
              </ListItem>
            </a>
            <a href={typeof (idofuser) == "undefined" ? "/login" : "/scoreboard/" + idofuser} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="Xem điểm" />
              </ListItem>
            </a>
            <a href="https://www.facebook.com/" className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="contact" />
              </ListItem>
            </a>


          </List>

         
        </Container>
            {/* {auth && (
                
              )} */}
               {typeof (idofuser) != "undefined" ? iconUser : iconLogin}
      </Toolbar>
    </AppBar>
    </div>
  );
};
export default Header;
