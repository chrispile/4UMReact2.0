import React, { Component } from 'react';
import './header.css';
import './font-awesome.min.css'
import TimeAgo from 'react-timeago'

import ReactModal from 'react-modal';

class ReadMessageModal extends Component {
  render() {
    return(
      <ReactModal
         isOpen={this.props.reading}
         onRequestClose={this.props.closeReadModal}
         contentLabel="Send a message modal"
         className="modalContent"
         overlayClassName="modalBg"
      >
        <div onClick={this.props.closeReadModal}>
            <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
        </div>
        <h2 id="viewTitle">{this.props.message.title}</h2>
        <div id="messageTagLine">
          <div id="fromDiv">From: </div>
          <div id="viewFromUser">{this.props.message.fromuser}</div>
          <div id="viewTimestamp">
            <TimeAgo date={(this.props.message.timestamp)} live={false}/>
          </div>
        </div>
        <p id="viewMessage">
          {this.props.message.message}
        </p>
        {/*insert reply form here later*/}
      </ReactModal>
    )
  }
}

export default ReadMessageModal
