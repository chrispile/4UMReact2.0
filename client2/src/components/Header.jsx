import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }
  }
  componentDidMount() {
    fetch('/users/check/isLoggedIn', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(username => this.setState({username}))
  }

  logout() {
    fetch('/logout', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(
      window.location.href = "/"
    );
  }

  render() {
    var profile = "/u/" + this.state.username.username
    return (
      <header>
        <a href="/home" id="headerLogo">4UM</a>
        <nav className="menu">
            <a href="/home">HOME</a>
            <a href="/SUB4UM">SUB4UM</a>
            <a href={profile}>PROFILE</a>
            <a href="/inbox">INBOX</a>
            <button onClick={this.logout}>LOGOUT</button>
        </nav>
      </header>
    )
  }
}

export default Header;
