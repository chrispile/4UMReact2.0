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
          <label>choose a SUB4UM</label><br/>
          <select className="SUB4UMlist" name="sname" onChange={this.props.onChangeUrlForm} required>
            <option value="" selected disabled hidden></option>
            {this.props.sub4ums.map((item, index) => (
              <option value={item.sname} key={item.sid}>
                {item.sname}
              </option>
            ))}
          </select>
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
          <label>choose a SUB4UM</label><br/>
          <select className="SUB4UMlist" name="sname" required onChange={this.props.onChangeTextForm}>
            <option value="" selected disabled hidden></option>
            {this.props.sub4ums.map((item, index) => (
              <option value={item.sname} key={item.sid}>
                {item.sname}
              </option>
            ))}
          </select>
          <input type="submit" value="submit"/>
      </form>
    )
  }
}

class MainFeedModal extends Component {
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

  componentDidMount() {
    fetch('/sub4ums/subscribe', {
      method: 'GET',
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        sub4ums: responseJson
      })
    })
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
               height: '40%'
             }
           }}
        >

          <div onClick={this.handleCloseModal}>
              <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
          </div>
          <h2>Submit link to 4UM</h2>
          <PostLinkForm
            onUrlSubmit={this.props.onUrlSubmit}
            onChangeUrlForm={this.props.onChangeUrlForm}
            closeModal={this.handleCloseModal}
            sub4ums={this.state.sub4ums}
          />
        </ReactModal>

        <ReactModal
           isOpen={this.state.showModal2}
           onRequestClose={this.handleCloseModal2}
           className="modalContent"
           overlayClassName="modalBg"
           contentLabel="Post Text Form Modal"
        >
          <div onClick={this.handleCloseModal2}>
              <i className="fa fa-times fa-lg modalClose" aria-hidden="true"></i>
          </div>
          <h2>Submit a text post to 4UM</h2>
          <PostTextForm
            onTextSubmit={this.props.onTextSubmit}
            onChangeTextForm={this.props.onChangeTextForm}
            closeModal={this.handleCloseModal2}
            sub4ums={this.state.sub4ums}
          />
        </ReactModal>
      </div>
    )
  }
}

export default MainFeedModal;
