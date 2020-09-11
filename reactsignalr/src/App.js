import React, {useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Chat from './components/chat';
import UserContext from './contexts/userContext';
import './App.css';

function App() {

  const { user } = useContext(UserContext);

  return (
    <>
    <Header />
    <Switch>
      <Route exact path = "/">
      {user ? <Redirect to="/chat" /> : <Login /> }
      </Route>
      <Route path = "/chat">
      {user ? <Chat /> : <Redirect to="/" />}
      
      </Route>
    </Switch>
    </>
  );
}

export default App;
