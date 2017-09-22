import React, { Component } from 'react';
import './header.css';
import TimeAgo from 'react-timeago'
import './font-awesome.min.css'

class Post extends Component {
  constructor() {
    super();
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    var voted, type, value;
    if(this.props.voted === 'upvote') {
      value = -1;
      voted = 0;
      type = 'none';
    } else {
      voted = 1;
      type = 'upvote';
      if(this.props.voted === 'downvote') {
        value = 2;
      } else {
        value = 1;
      }
    }
    this.props.voteFunction(type, value, voted, this.props.pid);
  }

  downvote() {
    var voted, type, value
    if(this.props.voted === 'downvote') {
      voted = 0;
      value = 1;
      type = 'none';
    } else {
      voted = -1;
      type = 'downvote';
      if(this.props.voted === 'upvote') {
        value = -2;
      } else {
        value = -1;
      }
    }
    this.props.voteFunction(type, value, voted, this.props.pid);
  }


  render() {
    var upvoteColor, scoreColor, downvoteColor;
    if(this.props.voted === 'upvote') {
      upvoteColor = '#40798C';
      scoreColor = '#40798C';
    } else if(this.props.voted === 'downvote') {
      downvoteColor = '#A83434';
      scoreColor = '#A83434';
    } else {
      upvoteColor = '#000';
      scoreColor = '#000';
      downvoteColor = '#000'
    }

    if(this.props.showText) {
      var showText = <div className="text textDiv">{this.props.text}</div>
    }
    if(this.props.url !== '') {
      var url = this.props.url
    } else {
      url = "/s/" + this.props.sname + "/" + this.props.pid
    }

    if(this.props.isAdmin|| this.props.isMod || this.props.isUser === 'TRUE') {
      var deleteBtn = <li className="deleteBtn" onClick={() => this.props.deleteFunction(this.props.pid)}>delete</li>
    }
    return (
      <li className="post" key={this.props.pid}>
        <div className="postNum">{this.props.postNum}</div>
        <div className="scoreDiv">
          <i className="fa fa-arrow-up fa-lg upvote" aria-hidden="true" onClick={this.upvote} style={{color: upvoteColor}}></i>
          <div className="score" style={{color: scoreColor}}>{this.props.score}</div>
          <i className="fa fa-arrow-down fa-lg downvote" aria-hidden="true" onClick={this.downvote} style={{color: downvoteColor}}></i>
        </div>
        <div className="postInfo">
          <div className="title">
            <a href={url}>{this.props.title}</a>
          </div>
          <div className="tagline">
              submitted <TimeAgo date={(this.props.timestamp)} live={false}/> by&nbsp;
              <a href={"/u/" + this.props.username} className="author">{this.props.username}</a> to&nbsp;
              <a href={"/s/" + this.props.sname} className="forum">{this.props.sname}</a>
          </div>
          {showText}
          <ul className="postButtons">
            <li className="comments">
              <a href={"/s/" + this.props.sname + "/" + this.props.pid}>{this.props.commentCount} comments</a>
            </li>
            {deleteBtn}
          </ul>
        </div>
      </li>
    );
  }
}

export default Post;
