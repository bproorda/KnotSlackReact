import React, { useState, useEffect } from 'react';
import {
    HubConnectionBuilder,
    LogLevel,
} from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props) {

    const username = props.username;

    const [hubConnection, setHubConnection] = useState();

    const [chat, setChat] = useState([]);

    const [message, setMessage] = useState("");


    useEffect(() => {
        let hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .configureLogging(LogLevel.Information)
            .build();

        setHubConnection(hubConnection);
    }, []);

    useEffect(() => {
        if (hubConnection) {
            console.log(hubConnection);


            if (!hubConnection.connectionStarted) {
                hubConnection.start()
                    .then(result => {
                        console.log('Connected!');

                        hubConnection.on('ReceiveMessage', function (user, message) {
                            console.log("messages received");
                            console.log(message);
                            var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            var encodedMsg = user + " says " + msg;
                            let currentChat = chat;
                            currentChat.push(encodedMsg);
                            console.log(currentChat);
                            setChat(currentChat);
                        });
                    })
                    .catch(e => console.log('Connection failed: ', e));
            } else {
                hubConnection.on('ReceiveMessage', function (user, message) {
                    console.log("messages received");
                    console.log(message);
                    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    var encodedMsg = user + " says " + msg;
                    let currentChat = chat;
                    currentChat.push(encodedMsg);
                    console.log(currentChat);
                    setChat(currentChat);
                });
            }

        }
    }, [hubConnection, username, chat]);


    const submitHandler = async (e) => {
        e.preventDefault();
        //let thisForm = e.target;

        if (hubConnection.connectionStarted) {
            console.log("sending!")
            await hubConnection.invoke("SendMessage", username, message).catch(function (err) {
                return console.error(err.toString());
            });
        }
        else {
            alert('No connection to server yet.');
        }
        //this.reset();
        console.log(chat);
    };

    const changeHandler = e => {
        setMessage(e.target.value);
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <label>
                    {username} says:
    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send</button>
            </form>
            <ul>
                <li><h2>Messages: </h2></li>
                {chat.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </>
    )
}