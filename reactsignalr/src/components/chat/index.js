import React, { useState, useEffect, useRef } from 'react';
import {
    HubConnectionBuilder,
    LogLevel,
} from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props) {

    const {username} = props;

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
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [hubConnection]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Send!")
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
            <p>{message}</p>
        </>
    )
}