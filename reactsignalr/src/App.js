import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Chat from './components/chat';
import './App.css';

function App() {


  return (
    <>
    <Header />
    <Switch>
      <Route exact path = "/">
      <Login />
      </Route>
      <Route path = "/chat">
      <Chat />
      </Route>
    </Switch>
    </>
  );
}

export default App;
