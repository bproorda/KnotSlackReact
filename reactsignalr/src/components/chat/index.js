import React, { useState, useEffect } from 'react';
import {
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
    HubConnection,
  } from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props){

    const {username} = props;

    const [hubConnection, setHubConncetion] = useState();

    useEffect(()=>{
      let hubConnection =  new HubConnectionBuilder()
      .withUrl('http://localhost:5001/chat')
      .configureLogging(LogLevel.Information)
      .build();

      hubConnection.start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      setHubConncetion(hubConnection);
    },[])

    return(
        <>
        <h2>Chat goes here</h2>
        </>
    )
}