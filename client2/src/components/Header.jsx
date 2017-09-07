import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <a href="/home" id="headerLogo">4UM</a>
        <nav className="menu">
            <a href="/home">HOME</a>
            <a href="/SUB4UM">SUB4UM</a>
            <a href="/u">PROFILE</a>
            <a href="/inbox">INBOX</a>
            <a href="/logout">LOGOUT</a>
        </nav>
      </header>
    )
  }
}

export default Header;
