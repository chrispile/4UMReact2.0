import React, { Component } from 'react';
import './header.css';

class SideMenu extends Component {
  render() {
    return (
      <div id="sideMenu">
        <h3>{this.props.title}</h3>
        {this.props.children}
      </div>
    );
  }
}

export default SideMenu;
