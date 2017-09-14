import React, { Component } from 'react';
import './header.css';
import './font-awesome.min.css'

import ReactModal from 'react-modal';

class ForumForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.submitCreateForm();
  }

  render() {
    if(this.props.fail) {
      var failDivStyle = 'inline-block'
    } else {
      failDivStyle = 'none'
    }

    return (
      <form className="modalForm" onSubmit={this.onSubmit}>
        <label>name</label>
        <div
          className="failDiv"
          style={{display: failDivStyle}}
          ref={(fail) => {this.fail = fail}}
        >
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <div className="failMessage">The SUB4UM name is already taken</div>
        </div>
        <input type="text" name="name" maxLength="20" onChange={this.props.onChangeCreateForm} required/>
        <label>title</label>
        <input type="text" name="title" maxLength="100" onChange={this.props.onChangeCreateForm} required/>
        <label>description</label>
        <textarea type="text" name="description" maxLength="500" onChange={this.props.onChangeCreateForm} required></textarea>
        <label>Type</label><br/>
        <label>
          <input type="radio" name="type" onChange={this.props.onChangeCreateForm} value="public"/>
          <i>public</i>
        </label><br/>
        <label>
          <input type="radio" name="type" onChange={this.props.onChangeCreateForm} value="protected"/>
          <i>protected</i>
        </label><br/>
        <label>
          <input type="radio" name="type" onChange={this.props.onChangeCreateForm} value="private" required/>
          <i>private</i>
        </label><br/><br/>
        <input type="submit" value="submit"/>
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.closeCreateFormModal) {
      this.setState({ showModal: false });
    }
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleOpenModal2 () {
    this.setState({ showModal2: true });
  }

  handleCloseModal () {
    this.props.resetForms();
    this.setState({ showModal: false });
  }

  handleCloseModal2 () {
    this.props.resetForms();
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
          <ForumForm fail={this.props.fail} onChangeCreateForm={this.props.onChangeCreateForm} submitCreateForm={this.props.submitCreateForm}/>
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
