import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Chat from './components/chat';
import './App.css';

function App() {
const [userName, setUserName] = useState("");

const loginHandler = (data) => {
  setUserName(data);
}

  return (
    <>
    <Header />
    <Switch>
      <Route exact path = "/">
      <Login />
      </Route>
      <Route path = "/chat">
      <Chat username={userName} />
      </Route>
    </Switch>
    </>
  );
}

export default App;
