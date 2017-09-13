import React, { Component } from 'react';
import './header.css';
import './mainfeed.css';

import SideMenu from './SideMenu'
import Post from './Post'
import MainFeedModal from './MainFeedModal'

class MainFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortedByScore: true,
      posts: [],
      textForm: {
        title: '',
        text: '',
        sname: ''
      },
      urlForm: {
        url: '',
        title: '',
        sname: ''
      }
    }
    this.resetForms = this.resetForms.bind(this);
    this.sortScore = this.sortScore.bind(this);
    this.sortDate = this.sortDate.bind(this);
    this.submitTextForm = this.submitTextForm.bind(this);
    this.onChangeTextForm = this.onChangeTextForm.bind(this);
    this.submitUrlForm = this.submitUrlForm.bind(this);
    this.onChangeUrlForm = this.onChangeUrlForm.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    fetch('/posts', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(posts => this.setState({posts}))
  }

  componentWillMount() {
    this.sortScore();
  }

  resetForms() {
    this.setState({
      textForm: {
        title: '',
        text: '',
        sname: ''
      },
      urlForm: {
        url: '',
        title: '',
        sname: ''
      }
    });
  }

  submitTextForm() {
    fetch("/posts/" + this.state.textForm.sname, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.textForm.title,
        text: this.state.textForm.text,
        url: ''
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState((prevState) => {
        prevState.posts.push(responseJson)
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onChangeTextForm(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      textForm: Object.assign(
        {},
        this.state.textForm,
        {[name]: value}
      )
    })
  }

  submitUrlForm() {
    fetch("/posts/" + this.state.urlForm.sname, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.urlForm.title,
        text: '',
        url: this.state.urlForm.url
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState((prevState) => {
        prevState.posts.push(responseJson)
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onChangeUrlForm(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      urlForm: Object.assign(
        {},
        this.state.urlForm,
        {[name]: value}
      )
    })
  }

  sortScore() {
    this.setState(prevState => ({
      sortedByScore: true,
      posts:
        prevState.posts.sort(function(a,b){
        var scoreDiff = b.score - a.score;
          if(scoreDiff !== 0) {
              return scoreDiff;
          }
          return new Date(a.timestamp) - new Date(b.timestamp);
        })
    }))
  }

  sortDate() {
    this.setState(prevState => ({
      sortedByScore: false,
      posts:
        prevState.posts.sort(function(a,b){
            return new Date(b.timestamp) - new Date(a.timestamp);
        })
    }))
  }

  vote(type, value, voted, pid) {
    fetch('/posts/voted/' + pid, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        value: value
      })
    })
    var index = this.state.posts.findIndex(post => post.pid === pid);
    var newScore = this.state.posts[index].score + value
    this.setState({
      posts: [
        ...this.state.posts.slice(0, index),
        Object.assign({}, this.state.posts[index], {score: newScore, voted: type}),
        ...this.state.posts.slice(index+1)
      ]
    })
  }

  render() {
    if(this.state.posts.length === 0) {
      var noPosts = <div id="noPosts">There are no posts to display. Subscribe to more SUB4UMs or create your own post!</div>
    }
    var selectedStyle = {
      background: '#59A7C1',
      color: '#F6F7F9'
    }
    var unselectedStyle = {
      background: 'none',
      color: '#000'
    }
    var scoreStyle, dateStyle
    if(this.state.sortedByScore) {
      scoreStyle = selectedStyle;
      dateStyle = unselectedStyle;
    } else {
      scoreStyle = unselectedStyle;
      dateStyle = selectedStyle;
    }
    return (
      <div className="container">
        <SideMenu title="Welcome to 4UM">
          <MainFeedModal
            resetForms={this.resetForms}
            onTextSubmit={this.submitTextForm}
            onChangeTextForm={this.onChangeTextForm}
            onUrlSubmit={this.submitUrlForm}
            onChangeUrlForm={this.onChangeUrlForm}
          />
        </SideMenu>

        <div className="feed">
          <div id="sort">
            <button className="sortBtn" id="topBtn" onClick={this.sortScore} style={scoreStyle}>Top</button>
            <button className="sortBtn" id="recentBtn" onClick={this.sortDate} style={dateStyle}>Recent</button>
          </div>
          {noPosts}
          <ol className="postList">
            {this.state.posts.map((item, index) => (
              <Post
                key={item.pid}
                pid={item.pid}
                postNum={index + 1}
                title={item.title}
                score={item.score}
                url={item.url}
                username={item.username}
                sname={item.sname}
                timestamp={item.timestamp}
                commentCount={item.commentcount}
                voteFunction={this.vote}
                voted={item.voted}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default MainFeed;
