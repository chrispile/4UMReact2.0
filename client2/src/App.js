import React, { Component } from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';

import Header from './components/Header';
import MainFeed from './components/MainFeed';
import Login from './components/Login'
import ForumList from './components/ForumList'

class App extends Component {

  componentDidMount() {
    fetch('/login')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
  }

  render() {
    // var mainFeedDummyData =
    // [
    //   {"pid":58,"username":"hellocuhris","sname":"GoT","title":"ok","text":null,"url":"http://hello","score":8,"timestamp":"2017-05-30T20:12:01.028Z"},
    //   {"pid":25,"username":"justeldrin","sname":"dafs","title":"adffd","text":null,"url":"http://eaferefa","score":4,"timestamp":"2017-08-23T06:59:32.787Z"},
    //   {"pid":23,"username":"theportal","sname":"Portal Exercises","title":"a","text":null,"url":null,"score":-1,"timestamp":"2017-08-23T04:35:35.492Z"},
    //   {"pid":40,"username":"test","sname":"cool","title":"a","text":null,"url":null,"score":6,"timestamp":"2017-08-25T07:17:06.966Z"},
    //   {"pid":43,"username":"testing","sname":"no","title":"cant view","text":null,"url":null,"score":0,"timestamp":"2017-08-25T07:45:31.076Z"},
    //   {"pid":44,"username":"testing","sname":"Portal Exercises","title":"asdfdsfa","text":null,"url":null,"score":2,"timestamp":"2017-08-25T07:50:43.762Z"}
    // ]
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
