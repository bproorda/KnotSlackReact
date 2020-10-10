import React, {useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import ChatCentral from './components/chatCentral';
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
      {user ? <ChatCentral /> : <Redirect to="/" />}
      
      </Route>
    </Switch>
    </>
  );
}

export default App;
