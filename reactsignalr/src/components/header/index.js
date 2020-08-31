import React from 'react';
import logo from '../../logo.svg';
import './header.scss';


function Header() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            my Knot Slack Prototype, a Work in progress!
          </p>
        </header>
      </div>
    );
  }

  export default Header;