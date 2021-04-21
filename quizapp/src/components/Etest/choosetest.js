
import React from 'react';
import Navbar from '../Navbar'
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from 'react-router-dom';
import CRUD from '../../services/crud'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Search from "../Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
  },
  media: {
    height: 300,
  },
});



function PaginationComponent() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [chooseNow, setChooseNow] = React.useState([]);

  const [currentPage, setcurrentPage] = React.useState(1);
  const [itemsPerPage, setitemsPerPage] = React.useState(3);

  const [pageNumberLimit, setpageNumberLimit] = React.useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = React.useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = React.useState(0);
  const [posData, setPosData] = React.useState([]);

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  function onChangedata(e) {
    e.preventDefault();

    var data = { ...posData, }
    data['pdata'] = e.target.value;
    setPosData(data);
  }

  const [isChange, setIsChange] = React.useState(false);

  let history = useHistory();
  const { idofuser } = useParams();
  function handleOk(item) {
    console.log(data);
    console.log(item);
    if (item.passwdOfTest == posData.pdata) {
      history.push('/play-test/' + idofuser + "/" + item.idOfTest);
    }

  }
  const renderData = (data) => {
    const vaothi = (item) => {
      setOpen(true);
      setChooseNow(item);
    }
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>Chọn bài thi</h2>
        {data.map((todo) => (
          <div>
            <Container>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h2"
                align="center"
              >
              </Typography>
              <Grid >
                <Card >
                  <CardContent>
                    <Typography color="primary" variant="h5">
                      {todo.nameTest}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2">
                      {todo.status}
                    </Typography>
                    <Button onClick={() => vaothi(todo)} size="small" color="primary">
                      Vào Làm
                     </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Container>
          </div>
        ))}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nhập mã vào thi</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Mã của bạn:
                    </DialogContentText>
            <TextField
              onChange={onChangedata}
              autoFocus
              margin="dense"
              id="name"
              label="code"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
                    </Button>
            <Button onClick={() => handleOk(chooseNow)} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  React.useEffect(() => {
    if(isChange == false){
      CRUD.getTest().then(res => {
        //console.log(data);
        setData(res.data.data);
        setIsChange(true);
      });
    }
  }, [data]);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }


  return (
    <>
    <div style={{position: 'fixed',width:'100%'}}>
      {/* <div  > */}
        <Navbar />
      {/* </div> */}
      <div className="search" style={{ 'width': '500px', 'margin': 'auto','marginTop':'73px'}}>
        <Search  setData = {setData} />
      </div>
      {renderData(currentItems)}

      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
            </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
            </button>
        </li>
      </ul>
      </div>
    </>
  );
}

export default PaginationComponent;