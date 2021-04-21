import React, { Component, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import quiz from '../../assets/img/quiz.png'
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>

    <Container maxWidth="lg" className="intructions">
      
      <h2>Hướng dẫn sử dụng trước khi dùng</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Thời gian làm bài</Typography>
          {/* <Typography className={classes.secondaryHeading}>I am an accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Bài thi có thời gian làm bài theo mỗi cẫu tương ứng với 1 phút.
            Hết thời gian sẽ tự động nộp bài.
              </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Câu hỏi và đáp án</Typography>
          {/* <Typography className={classes.secondaryHeading}>
                You are currently not an owner
              </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>
                Mỗi câu hỏi sẽ có 4 đáp án. Trong đó chỉ có một đáp án đúng. Click vào đáp án muốn chọn và bấm "Next" để chuyển câu.
              </Typography>
            </Grid>
            <Grid item xs={12}>
                <img src={quiz} alt="Quiz app options example" height="400px" width="900px" ></img>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Chuyển câu</Typography>
            {/* <Typography className={classes.secondaryHeading}>
             
            </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>
                Bạn có thể chọn đáp án và nhấn "Next" để sang câu kế tiếp.Quay lại câu trước đó bằng cách nhất nút "Previous"
              </Typography>
            </Grid>
            <Grid item xs={12}>
                <img src={quiz} alt="Quiz app options example" height="400px" width="900px" ></img>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Nộp bài</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>
                Sau khi chọn xong đáp án tất cả các câu nhấn "Submit" để nộp bài. Hoặc để đến hết thời gian hệ thống sẽ tự động nộp
              </Typography>
            </Grid>
            <Grid item xs={12}>
                <img src={quiz} alt="Quiz app options example" height="400px" width="900px" ></img>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
        <Container maxWidth="xs">
          <Grid container spacing={3}>
            <Grid item xs>
              <Button variant="contained" style={{marginTop:"10px"}}><Link to="/">Quay lại</Link></Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" style={{visibility:"hidden"}}>Default</Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" style={{marginTop:"10px"}}><Link to="/test">Bắt đầu</Link></Button>
            </Grid>
          </Grid>
        </Container>
      
    </Container>
    </div>
  );
}
