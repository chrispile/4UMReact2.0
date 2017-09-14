import React, { Component } from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';

import Header from './components/Header';
import MainFeed from './components/MainFeed';
import Login from './components/Login'
import ForumList from './components/ForumList'
import Sub4um from './components/Sub4um'
import PostPage from './components/PostPage'


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
          <Route path="/s/:sname/:pid" render={(props) => {
            return (
              <div>
                <Header/>
                <PostPage sname={props.match.params.sname} pid={props.match.params.pid} />
              </div>
            )
          }} />
          <Route path="/s/:sname" render={(props) => {
            return (
              <div>
                <Header/>
                <Sub4um sname={props.match.params.sname}/>
              </div>
            )
          }} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
