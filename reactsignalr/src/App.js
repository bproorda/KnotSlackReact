import React, { useState } from 'react';
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
    {userName ? <p>Hello, {userName}. Welcome to your chat!</p> : <Login nameInput={loginHandler} />}
    {userName ? <Chat username={userName} /> : null }
    </>
  );
}

export default App;
