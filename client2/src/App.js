import React, { Component } from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';

import Header from './components/Header';
import MainFeed from './components/MainFeed';
import Login from './components/Login'
import ForumList from './components/ForumList'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" render={() => {
            return (
              <div>
                <Header/>
                <MainFeed/>
              </div>
            )}} />
          <Route path="/sub4um" render={() => {
            return (
              <div>
                <Header/>
                <ForumList/>
              </div>
            )
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
