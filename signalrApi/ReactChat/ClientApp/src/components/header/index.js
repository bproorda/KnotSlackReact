import React, {useContext} from 'react';
import logo from '../../assests/KnotLogo.png';
import UserContext from '../../contexts/userContext';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import './header.scss';


function Header() {

  const {user, logout} = useContext(UserContext);

  let history = useHistory();

  const logoutHandler = () => {
    console.log("logout was clicked");
    logout(user);
    history.push("/");
  }

    return (
      <div className="header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Knot Slack
          </p>
          {user ? <Button className="logout" onClick={logoutHandler}>Log Out</Button> : null}
        </header>
      </div>
    );
  }

  export default Header;