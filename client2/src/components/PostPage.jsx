import React, { Component } from 'react';
import update from 'immutability-helper';
import TimeAgo from 'react-timeago'

import './header.css';
import './mainfeed.css';

import SideMenu from './SideMenu'
import Post from './Post'

class CommentForm extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if(event.target.children[1].value !== '') {
      this.props.onSubmitCommentForm();
      event.target.children[1].value = ''
    }
  }

  render() {
    return (
      <form id="commentForm" onSubmit={this.onSubmit}>
          <div >Comment</div>
          <textarea type="text" id="commentTextArea" name="comment" maxLength="40000" onChange={this.props.onChangeCommentForm}></textarea><br/>
          <input id="submitCommentBtn" type="submit" value="save"/>
          {/* <div id="postNotFound">Failed to comment. This post no longer exists.</div> */}
      </form>
    )
  }
}

class CommentFeed extends Component {
  constructor() {
    super();
    this.createComment = this.createComment.bind(this);
  }

  createComment(comment) {
    var link = "/u/" + comment.username
    return (
      <li className="textDiv" key={comment.cid}>
        <div className="commentHeader">
          <a href= {link} className="author">{comment.username}</a> commented <TimeAgo date={(comment.timestamp)} live={false}/>
        </div>
        <div className="text">
          {comment.text}
        </div>
      </li>
    )
  }

  render() {
    return (
      <ul id="commentList">
        {this.props.comments.map((comment, index) => (
          this.createComment(comment)
        ))}
      </ul>
    )
  }
}

class PostPage extends Component {
  constructor() {
    super();

    this.state = {
      forum: {},
      post: {},
      commentForm: '',
      comments: []
    }
    this.vote = this.vote.bind(this);
    this.onChangeCommentForm = this.onChangeCommentForm.bind(this);
    this.onSubmitCommentForm = this.onSubmitCommentForm.bind(this);
    this.deletePost = this.deletePost.bind(this);

  }

  componentDidMount() {
    fetch('/sub4ums/sname/' + this.props.sname, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(forum => this.setState({forum}))

    fetch('/posts/pid/' + this.props.pid, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(post => this.setState({post}))


    fetch('/posts/comments/' + this.props.pid, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(comments => this.setState({comments}))
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
    var newScore = this.state.post.score + value
    this.setState({
      post: update(this.state.post, {'score': {$set: newScore}, 'voted': {$set: type}})
    })
  }

  onChangeCommentForm(event) {
    this.setState({
      commentForm: event.target.value
    })
  }

  onSubmitCommentForm() {
    fetch('/posts/comments/' + this.props.pid, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: this.state.commentForm
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        comments: [responseJson].concat(this.state.comments)
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deletePost(pid) {
    fetch('/posts/' + pid, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(() => {
      window.location.href ="/home"
    })
  }

  render() {
    if(this.state.post.text !== '') {
      var showText = true;
    }
    return (
      <div className="container">
        <SideMenu title={this.props.sname}>
          <h6>{this.state.forum.title}</h6>
          <p>{this.state.forum.description}</p>
        </SideMenu>
        <div className="feed">
          <ol className="postList">
            <Post
              key={this.props.pid}
              pid={this.props.pid}
              title={this.state.post.title}
              score={this.state.post.score}
              url={this.state.post.url}
              username={this.state.post.username}
              sname={this.props.sname}
              timestamp={this.state.post.timestamp}
              commentCount={this.state.post.commentcount}
              voteFunction={this.vote}
              voted={this.state.post.voted}
              showText={showText}
              text={this.state.post.text}
              isAdmin={this.state.forum.isadmin}
              isMod={this.state.forum.ismod}
              deleteFunction={this.deletePost}

            />
          </ol>
          <div id="commentDiv">
              <CommentForm onChangeCommentForm={this.onChangeCommentForm} onSubmitCommentForm={this.onSubmitCommentForm}/>
              <CommentFeed comments={this.state.comments} />
          </div>
        </div>
      </div>
    )
  }
}

export default PostPage;
