import React, { useState } from 'react';
import Header from './components/header';
import Login from './components/login';
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
    </>
  );
}

export default App;
