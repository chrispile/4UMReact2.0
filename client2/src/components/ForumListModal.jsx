import React, { Component } from 'react';
import './header.css';
import './font-awesome.min.css'

import ReactModal from 'react-modal';

class ForumForm extends Component {
  render() {
    return (
      <form className="modalForm">
        <label for="name2UM">name</label>
        <input type="text" id="sname" name="name" maxlength="20" required/>
        <label for="title2UM">title</label>
        <input type="text" id="title" name="title" maxlength="100" required/>
        <label for="desc2UM">description</label>
        <textarea type="text" id="desc" name="desc" maxlength="500" required></textarea>
        <label>Type</label><br/>
        <label>
          <input type="radio" name="type" value="public"/>
          <i>public</i>
        </label><br/>
        <label>
        <input type="radio" name="type" value="protected"/>
        <i>protected</i>
        </label><br/>
        <label>
        <input type="radio" name="type" value="private" required/>
        <i>private</i>
        </label><br/><br/>
        <input type="submit" value="submit" id="modal1submit"/>
      </form>
    )
  }
}

class JoinPrivateForm extends Component {
  render() {
    return (
    <form className="modalForm">
      <label>Access Code</label>
      <input type="text" name="name" maxLength="10" required/>
      <input type="submit" value="submit"/>
    </form>
    )
  }
}

class ForumListModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showModal2: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
     this.handleOpenModal2 = this.handleOpenModal2.bind(this);
     this.handleCloseModal = this.handleCloseModal.bind(this);
     this.handleCloseModal2 = this.handleCloseModal2.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleOpenModal2 () {
    this.setState({ showModal2: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleCloseModal2 () {
    this.setState({ showModal2: false });
  }

  render() {
    return(
      <div>
        <button className="modalBtn" onClick={this.handleOpenModal}>Create your own</button>
        <button className="modalBtn" onClick={this.handleOpenModal2}>Join a private SUB4UM</button>
        <ReactModal
           isOpen={this.state.showModal}
           onRequestClose={this.handleCloseModal}
           contentLabel="Create Forum Modal"
           className="modalContent"
           overlayClassName="modalBg"
        >

          <div onClick={this.handleCloseModal}>
              <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
          </div>
          <h2>Create your own SUB4UM</h2>
          <ForumForm/>
        </ReactModal>

        <ReactModal
           isOpen={this.state.showModal2}
           onRequestClose={this.handleCloseModal2}
           className="modalContent"
           overlayClassName="modalBg"
           contentLabel="Private SUB4UM Modal"
           style={{
             content: {
               height: '20%'
             }
           }}
        >
          <div onClick={this.handleCloseModal2}>
              <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
          </div>
          <h2>Join a private SUB4UM</h2>
          <JoinPrivateForm/>
        </ReactModal>
      </div>
    )
  }
}

export default ForumListModal;
