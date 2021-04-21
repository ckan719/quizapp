import React from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';
import Home from './components/Home.js';
import quizInstructions from './components/Quiz/intructions';
import Play from './components/Quiz/Play';
import QuizSummary from './components/Quiz/QuizSummary';
import Login from './components/pages/Login.js';
import Test from './components/Etest/test';
import ChooseTest from './components/Etest/choosetest';
import PlayTest from './components/Etest/playtest';
import makeTest from './components/pages/createTest';
import ScoreBoard from './components/pages/ScoreBoard';
import changeQ from './components/pages/changeQuestion';
import User from './components/pages/User';
import Regis from './components/pages/register';

function App() {
  return (
    <div>
      
    <Router>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home" exact component = {Home}/>
        <Route path="/home/:idofuser" exact component = {Home}/>
        <Route path="/choose-test/:idofuser" exact component = {ChooseTest}/>
        <Route path="/play-test/:idofuser/:idoftest" exact component = {PlayTest}/>
        <Route path = '/login' exact component = {Login} />
        <Route path = '/createTest/:idofuser' exact component = {makeTest} />
        <Route path= '/scoreboard/:idofuser' exact component = {ScoreBoard}/>
        <Route path= '/infor-user/:idofuser' exact component= {User} />
        <Route path="/change-question/:idofuser/:idoftest" exact component={changeQ} />
        <Route path="/register/" exact component={Regis} />
    </Router>
    </div>
  );
}

export default App;
