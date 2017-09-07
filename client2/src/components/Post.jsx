import React, { Component } from 'react';
import './header.css';
import TimeAgo from 'react-timeago'
import './font-awesome.min.css'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: 0,
      score: this.props.score,
    }
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    if(this.state.voted !== 1) {
      var newVoted = this.state.voted;
      if(this.state.voted === 0) {
        newVoted = 1;
      } else if(this.state.voted === -1) {
        newVoted = 2;
      }
      this.setState(prevState => ({
        voted: 1,
        score: prevState.score += newVoted
      }))
    } else {
      this.setState(prevState => ({
        voted: 0,
        score: prevState.score -= 1
      }))
    }
  }

  downvote() {
    if(this.state.voted !== -1) {
      var newVoted = this.state.voted;
      if(this.state.voted === 0) {
        newVoted = -1;
      } else if(this.state.voted === 1) {
        newVoted = -2;
      }
      this.setState(prevState => ({
        voted: -1,
        score: prevState.score += newVoted
      }))
    } else {
      this.setState(prevState =>({
        voted: 0,
        score: prevState.score += 1
      }))
    }
  }

  render() {
    var upvoteColor, scoreColor, downvoteColor;
    if(this.state.voted === 1) {
      upvoteColor = '#40798C';
      scoreColor = '#40798C';
    } else if(this.state.voted === -1) {
      downvoteColor = '#A83434';
      scoreColor = '#A83434';
    } else {
      upvoteColor = '#000';
      scoreColor = '#000';
      downvoteColor = '#000'
    }

    return (
      <li className="post" key={this.props.pid}>
        <div className="postNum">{this.props.postNum}</div>
        <div className="scoreDiv">
          <i className="fa fa-arrow-up fa-lg upvote" aria-hidden="true" onClick={this.upvote} style={{color: upvoteColor}}></i>
          <div className="score" style={{color: scoreColor}}>{this.state.score}</div>
          <i className="fa fa-arrow-down fa-lg downvote" aria-hidden="true" onClick={this.downvote} style={{color: downvoteColor}}></i>
        </div>
        <div className="postInfo">
          <div className="title">
            <a href={this.props.url}>{this.props.title}</a>
          </div>
          <div className="tagline">
              submitted <TimeAgo date={(this.props.timestamp)}/> by
              <a href={"/u/" + this.props.username} className="author"> {this.props.username}</a> to
              <a href={"/s/" + this.props.sname} className="forum"> {this.props.sname}</a>
          </div>
          <ul className="postButtons">
            <li className="comments">
              <a href={"/s/" + this.props.sname + "/" + this.props.pid}>{this.props.commentCount} comments</a>
            </li>
            <li className="deleteBtn">delete</li>
          </ul>
        </div>
      </li>
    );
  }
}

export default Post;
