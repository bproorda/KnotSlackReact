import React from 'react';
import logo from '../../logo.svg';
import useAuth from '../../contexts/auth';
import Button from 'react-bootstrap/Button';
import './header.scss';


function Header() {

  const {user, logout} = useAuth();

    return (
      <div className="header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            my Knot Slack Prototype, a Work in progress!
          </p>
          {user ? <Button onClick={logout()}>Log Out</Button> : null}
        </header>
      </div>
    );
  }

  export default Header;