import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './header.css';
import './forumlist.css';

import SideMenu from './SideMenu'
import ForumListModal from './ForumListModal'

var publicdummydata = [
  {name: 'GoT', sid: 2},
  {name: 'Gaming',sid: 4},
  {name: 'News', sid: 6}
]

var protecteddummydata = [
  {name: 'idk', sid: 14, type: 'pending'},
  {name: 'LoL', sid: 34, type: 'request'}
]

var subscribeddummydata = [
  {name: 'modlife', sid: 221, permissions: 'mod'},
  {name: 'hearthstone', sid: 1},
  {name: 'spop', sid: 10, permissions: 'admin'}
]

class PublicList extends Component {
  createLi (name, sid) {
    return (
      <li key={sid}>
        <Link to={'/s/' + name}>{name}</Link>
        <button className="subscribe">subscribe</button>
      </li>
    )
  }

  render() {
    var publicList = this.props.publicdummydata
    return (
      <div id="public4UMs">
        <h3>PUBLIC</h3>
        <ul>
          {publicList.map((item, index) => (
            this.createLi(item.name, item.sid)
          ))}
        </ul>
      </div>
    )
  }
}

class ProtectedList extends Component {
  createLi (name, sid, type) {
    return (
      <li key={sid}>
        <Link to={'/s/' + name}>{name}</Link>
        <button className={type}>{type}</button>
      </li>
    )
  }

  render() {
    var protectedList = this.props.protecteddummydata
    return (
      <div id="protected4UMs">
        <h3>PROTECTED</h3>
        <ul>
          {protectedList.map((item, index) => (
            this.createLi(item.name, item.sid, item.type)
          ))}
        </ul>
      </div>
    )
  }
}

class SubscribedList extends Component {
  createLi (name, sid, permissions) {
    var icon;
    if(permissions === 'admin') {
      icon = <i className="fa fa-key icon" aria-hidden="true"></i>
    } else if (permissions === 'mod') {
      icon = <i className="fa fa-shield icon" aria-hidden="true"></i>
    }
    return (
      <li key={sid}>
        <Link to={'/s/' + name}>
          {name}
          {icon}
        </Link>
        <button className="unsubscribe">unsubscibe</button>
      </li>
    )
  }
  render() {
    var subscribedList = this.props.subscribeddummydata
    return (
      <div id="subscribed4UMs">
        <h3>SUBSCRIBED</h3>
        <ul>
          {subscribedList.map((item, index) => (
            this.createLi(item.name, item.sid, item.permissions)
          ))}
        </ul>
      </div>
    )
  }
}

class ForumList extends Component {
  render() {
    return (
      <div className="container">
        <SideMenu title="SUB4UMs">
          <h4>Welcome to the SUB4UM list.</h4>
          <p>Any user is open to join public SUB4UMS.</p>
          <p>Protected SUB4UMs must be requested to join and approved by an Admin<i className="fa fa-key icon" aria-hidden="true"></i> or Moderator<i className="fa fa-shield icon" aria-hidden="true"></i>.</p>
          <p>Private SUB4UMs are not visible on this page. To join, you must receive a unique access code or direct invite from your inbox.</p>
          <p>Users can even start their own SUB4UM and become the Admin<i className="fa fa-key icon" aria-hidden="true"></i>.</p>
          <ForumListModal/>
        </SideMenu>
        <div className="container4UMs">
          <PublicList publicdummydata={publicdummydata}/>
          <ProtectedList protecteddummydata={protecteddummydata}/>
          <SubscribedList subscribeddummydata={subscribeddummydata}/>
        </div>
      </div>
    )
  }
}

export default ForumList
