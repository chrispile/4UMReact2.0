import React, { Component } from 'react';
import './header.css';

class Header extends Component {

  logout() {
    fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(
      window.location.href = "/"
    );
  }

  render() {
    return (
      <header>
        <a href="/home" id="headerLogo">4UM</a>
        <nav className="menu">
            <a href="/home">HOME</a>
            <a href="/SUB4UM">SUB4UM</a>
            <a href="/u">PROFILE</a>
            <a href="/inbox">INBOX</a>
            <button onClick={this.logout}>LOGOUT</button>
        </nav>
      </header>
    )
  }
}

export default Header;
