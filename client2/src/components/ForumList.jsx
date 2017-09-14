import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';

import './header.css';
import './forumlist.css';

import SideMenu from './SideMenu'
import ForumListModal from './ForumListModal'

class PublicList extends Component {
  createLi (sname, sid) {
    return (
      <li key={sid}>
        <Link to={'/s/' + sname}>{sname}</Link>
        <button className="subscribe" data-sid={sid} data-sname={sname} onClick={this.props.subscribeFunction}>subscribe</button>
      </li>
    )
  }

  render() {
    return (
      <div id="public4UMs">
        <h3>PUBLIC</h3>
        <ul>
          {this.props.publicList.map((item, index) => (
            this.createLi(item.sname, item.sid)
          ))}
        </ul>
      </div>
    )
  }
}

class ProtectedList extends Component {
  createLi (sname, sid, uid) {
    if(uid != null) {
      var type = 'pending'
    } else {
      type = 'request'
      var funct = this.props.requestFunction
    }
    return (
      <li key={sid}>
        <Link to="/home" >{sname}</Link>
        <button className={type} data-sid={sid} data-sname={sname} onClick={funct}>{type}</button>
      </li>
    )
  }

  render() {
    return (
      <div id="protected4UMs">
        <h3>PROTECTED</h3>
        <ul>
          {this.props.protectedList.map((item, index) => (
            this.createLi(item.sname, item.sid, item.uid)
          ))}
        </ul>
      </div>
    )
  }
}

class SubscribedList extends Component {
  createLi (sname, sid, type, admin, mod) {
    var icon;
    if(admin != null) {
      icon = <i className="fa fa-key icon" aria-hidden="true"></i>
    } else if (mod != null) {
      icon = <i className="fa fa-shield icon" aria-hidden="true"></i>
    }
    return (
      <li key={sid}>
        <Link to={'/s/' + sname}>
          {sname}
          {icon}
        </Link>
        <button className="unsubscribe" data-sid={sid} data-sname={sname} data-type={type} onClick={this.props.unsubscribeFunction}>unsubscibe</button>
      </li>
    )
  }
  render() {
    return (
      <div id="subscribed4UMs">
        <h3>SUBSCRIBED</h3>
        <ul>
          {this.props.subscribedList.map((item, index) => (
            this.createLi(item.sname, item.sid, item.type, item.admin, item.mod)
          ))}
        </ul>
      </div>
    )
  }
}

class ForumList extends Component {
  constructor() {
    super();
    this.state = {
      public: [],
      protected: [],
      subscribed: [],
      createForm: {
        name: '',
        title: '',
        description: '',
        type: ''
      },
      failCreateForm: false,
      closeCreateFormModal: false
    }

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.request = this.request.bind(this);
    this.resetForms = this.resetForms.bind(this);
    this.onChangeCreateForm = this.onChangeCreateForm.bind(this);
    this.submitCreateForm = this.submitCreateForm.bind(this);
  }

  componentDidMount() {
    fetch('/sub4ums/subscribelist', {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        subscribed: responseJson
      })
    });

    fetch('/sub4ums/publiclist', {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        public: responseJson
      })
    });

    fetch('/sub4ums/protectedlist', {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        protected: responseJson
      })
    });
  }

  subscribe(event) {
    var sid = parseInt(event.target.getAttribute('data-sid'), 10);
    var sname = event.target.getAttribute('data-sname');
    fetch('/sub4ums/subscribe', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid: sid,
        sname: sname
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var index = this.state.public.findIndex(sub4um => sub4um.sid === sid);
      responseJson.type = 'public';
      this.setState({
        public: update(this.state.public, {$splice: [[index, 1]]}),
        subscribed: update(this.state.subscribed, {$push: [responseJson]})
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  unsubscribe(event) {
    var sid = parseInt(event.target.getAttribute('data-sid'), 10);
    var sname = event.target.getAttribute('data-sname');
    var type = event.target.getAttribute('data-type');
    fetch('/sub4ums/subscribe', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid: sid,
      })
    })
    .then(() => {
      var index = this.state.subscribed.findIndex(sub4um => sub4um.sid === sid);
      this.setState({
        subscribed: update(this.state.subscribed, {$splice: [[index, 1]]}),
      })
      if(type === 'public') {
        this.setState({
          public: update(this.state.public, {$push: [{sid: sid, sname: sname}]})
        })
      } else if(type === 'protected') {
        this.setState({
          protected: update(this.state.protected, {$push: [{sid: sid, sname: sname, uid: null}]})
        })
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  request(event) {
    var sid = parseInt(event.target.getAttribute('data-sid'), 10);
    var sname = event.target.getAttribute('data-sname');
    fetch('/sub4ums/request', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid: sid,
        sname: sname
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var index = this.state.protected.findIndex(sub4um => sub4um.sid === sid);
      this.setState({
        protected: update(this.state.protected, {[index]: {uid: {$set: responseJson.uid}}}),
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  resetForms() {
    this.setState({
      createForm: {
        name: '',
        title: '',
        description: '',
        type: ''
      }
    });
  }

  onChangeCreateForm(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      createForm: update(this.state.createForm, {[name]: {$set: value}}),
      closeCreateFormModal: false
    })
  }

  submitCreateForm() {
    fetch("/sub4ums", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: this.state.createForm.type,
        sname: this.state.createForm.name,
        title: this.state.createForm.title,
        description: this.state.createForm.description
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.error) {
        this.setState({
          failCreateForm: true
        })
      } else {
        this.resetForms();
        this.setState({
          subscribed: update(this.state.subscribed, {$push: [responseJson]}),
          closeCreateFormModal: true,
          failCreateForm: false,
        })
      }

    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container">
        <SideMenu title="SUB4UMs">
          <h4>Welcome to the SUB4UM list.</h4>
          <p>Any user is open to join public SUB4UMS.</p>
          <p>Protected SUB4UMs must be requested to join and approved by an Admin<i className="fa fa-key icon" aria-hidden="true"></i> or Moderator<i className="fa fa-shield icon" aria-hidden="true"></i>.</p>
          <p>Private SUB4UMs are not visible on this page. To join, you must receive a unique access code or direct invite from your inbox.</p>
          <p>Users can even start their own SUB4UM and become the Admin<i className="fa fa-key icon" aria-hidden="true"></i>.</p>
          <ForumListModal
            fail={this.state.failCreateForm}
            closeCreateFormModal={this.state.closeCreateFormModal}
            onChangeCreateForm={this.onChangeCreateForm}
            submitCreateForm={this.submitCreateForm}
            resetForms={this.resetForms}
          />
        </SideMenu>
        <div className="container4UMs">
          <PublicList publicList={this.state.public} subscribeFunction={this.subscribe}/>
          <ProtectedList protectedList={this.state.protected} requestFunction={this.request}/>
          <SubscribedList subscribedList={this.state.subscribed} unsubscribeFunction={this.unsubscribe}/>
        </div>
      </div>
    )
  }
}

export default ForumList
