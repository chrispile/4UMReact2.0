import React, { Component } from 'react';
import update from 'immutability-helper';
import TimeAgo from 'react-timeago'

import './header.css';
import './inbox.css';

import SideMenu from './SideMenu'
import ReadMessageModal from './ReadMessageModal'

class Message extends Component {
  constructor(props) {
    super(props)
    this.state ={
      hasRead: this.props.message.hasread,
    }
  }

  render() {
    if(!this.state.hasRead) {
      var unReadStyle = {
        fontWeight: 'bold',
        color: 'black'
      }
    }

    return(
      <li className="message" onClick={(event) => this.props.onClick(event)} data-mid={this.props.message.mid}>
        <div className="fromUserDiv">
          {this.props.message.fromuser}
        </div>
        <div className="messageTitle" style={unReadStyle}>
          {this.props.message.title}
        </div>
        <div className="messageTime">
          <TimeAgo date={(this.props.message.timestamp)} live={false}/>
        </div>
      </li>
    )
  }
}

class Inbox extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      reading: false,
      readMessage: {}
    }
    this.openReadModal = this.openReadModal.bind(this);
    this.closeReadModal = this.closeReadModal.bind(this);
  }

  componentDidMount() {
    fetch('/messages/', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(messages => this.setState({messages}))
  }

  openReadModal(event) {
    var mid = parseInt(event.currentTarget.getAttribute('data-mid'));
    var index = this.state.messages.findIndex(message => message.mid === mid);
    var message = this.state.messages[index]
    this.setState({ reading: true, readMessage: message });
  }

  closeReadModal() {
    this.setState({ reading: false, readMessage: {} });
  }

  render() {
    return (
      <div className="container">
        <SideMenu title="Inbox">
          <h6>Connect with other 4UM Users by sending them a message!</h6>
          <h6>Invites for private SUB4UMs will be received as messages.</h6>
          {/*SEND MESSAGE MODAL*/}
          <ReadMessageModal
            reading={this.state.reading}
            closeReadModal={this.closeReadModal}
            message={this.state.readMessage}
          />
        </SideMenu>

        <div id="inboxFeed">
          <ul className="mailList">
            {this.state.messages.map((message, index) => (
              <Message
                message={message}
                key={message.mid}
                onClick={this.openReadModal}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Inbox
