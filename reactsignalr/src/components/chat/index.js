import React, { useState, useEffect, useRef } from 'react';
import {
    HubConnectionBuilder,
    LogLevel,
} from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props) {

    const username = props.username;

    const [hubConnection, setHubConnection] = useState();

    const [chat, setChat] = useState([]);

    const [message, setMessage] = useState("");
    const latestChat = useRef(null);

    useEffect(() => {
        let hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .configureLogging(LogLevel.Information)
            .build();

        setHubConnection(hubConnection);
    }, []);

    useEffect(() => {
        if (hubConnection) {
            hubConnection.start()
                .then(result => {
                    console.log('Connected!');

                    hubConnection.on('ReceiveMessage', message => {
                        console.log("messages received");
                        let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        let encodedMsg = username + " says " + msg;
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(encodedMsg);
                        
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [hubConnection, username]);


    const submitHandler = async (e) => {
        e.preventDefault();
            const chatMessage = {
                user: username,
                message: message
            };

            console.log(chatMessage);
            //console.log(props);
    
            if (hubConnection.connectionStarted) {
                console.log("sending!")
                    await hubConnection.invoke("SendMessage", username, message).catch(function (err) {
                        return console.error(err.toString());
                    });
            }
            else {
                alert('No connection to server yet.');
            }
            console.log(chat);
    };

    const changeHandler = e => {
        setMessage(e.target.value);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <label>
                    {username} says:
    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send</button>
            </form>
            <p>{chat}</p>
        </>
    )
}