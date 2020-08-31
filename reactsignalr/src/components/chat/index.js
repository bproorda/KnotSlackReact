import React, { useState, useEffect, useRef } from 'react';
import {
    HubConnectionBuilder,
    LogLevel,
  } from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props){

    //const {username} = props;

    const [hubConnection, setHubConnection] = useState();
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    useEffect(()=>{
      let hubConnection =  new HubConnectionBuilder()
      .withUrl('http://localhost:5001/chat')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

      setHubConnection(hubConnection);
    },[]);

    useEffect(() => {
        if (hubConnection) {
            hubConnection.start()
                .then(result => {
                    console.log('Connected!');
    
                    hubConnection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [hubConnection]);

    return(
        <>
        <h2>Chat goes here</h2>
        </>
    )
}