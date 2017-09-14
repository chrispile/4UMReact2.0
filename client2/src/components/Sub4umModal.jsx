import React, { Component } from 'react';
import './header.css';
import './font-awesome.min.css'

import ReactModal from 'react-modal';

class PostLinkForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUrl = this.checkUrl.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onUrlSubmit();
    this.props.closeModal();
  }

  checkUrl(event) {
      var string = event.target.value;
      if (!~string.indexOf("http")) {
        string = "http://" + string;
      }
      event.target.value = string;
  }

  render() {
    return (
      <form className="postLinkForm modalForm" onSubmit={this.onSubmit}>
          <label >url</label><br/>
          <input type="url" name="url" onChange={this.props.onChangeUrlForm} onBlur={this.checkUrl} required /><br/>
          <label >title</label>
          <input type="text" name="title" maxLength="300" onChange={this.props.onChangeUrlForm} required /><br/>
          <input type="submit" value="submit" />
      </form>
    )
  }
}

class PostTextForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onTextSubmit();
    this.props.closeModal();
  }

  render() {
    return (
      <form className="postTextForm modalForm" onSubmit={this.onSubmit}>
          <label>title</label>
          <input type="text" maxLength="300" name="title" required onChange={this.props.onChangeTextForm}/><br/>
          <label>text (optional)</label>
          <textarea type="text" maxLength="40000" name="text" onChange={this.props.onChangeTextForm}></textarea><br/>
          <input type="submit" value="submit"/>
      </form>
    )
  }
}

class Sub4umModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showModal2: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleOpenModal2 = this.handleOpenModal2.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleOpenModal2() {
    this.setState({ showModal2: true });
  }

  handleCloseModal() {
    this.props.resetForms();
    this.setState({ showModal: false });
  }

  handleCloseModal2() {
    this.props.resetForms();
    this.setState({ showModal2: false });
  }

  render() {
    return(
      <div>
        <button className="modalBtn" onClick={this.handleOpenModal}>Submit a new link</button>
        <button className="modalBtn" onClick={this.handleOpenModal2}>Submit a new text post</button>
        <ReactModal
           isOpen={this.state.showModal}
           onRequestClose={this.handleCloseModal}
           contentLabel="Post Link Form Modal"
           className="modalContent"
           overlayClassName="modalBg"
           style={{
             content: {
               height: '35%'
             }
           }}
        >

          <div onClick={this.handleCloseModal}>
              <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
          </div>
          <h2>Submit link post</h2>
          <PostLinkForm
            onUrlSubmit={this.props.onUrlSubmit}
            onChangeUrlForm={this.props.onChangeUrlForm}
            closeModal={this.handleCloseModal}
          />
        </ReactModal>

        <ReactModal
           isOpen={this.state.showModal2}
           onRequestClose={this.handleCloseModal2}
           className="modalContent"
           overlayClassName="modalBg"
           contentLabel="Post Text Form Modal"
           style={{
             content: {
               height: '40%'
             }
           }}
        >
          <div onClick={this.handleCloseModal2}>
              <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
          </div>
          <h2>Submit a text post</h2>
          <PostTextForm
            onTextSubmit={this.props.onTextSubmit}
            onChangeTextForm={this.props.onChangeTextForm}
            closeModal={this.handleCloseModal2}
          />
        </ReactModal>
      </div>
    )
  }
}

export default Sub4umModal;
