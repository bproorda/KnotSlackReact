import React, { useState, useEffect } from 'react';
import ChatWindow from '../chatWindow';
import useAuth from '../../contexts/auth.js';
import useHub from '../../contexts/hub.js'
// import {
//     HubConnectionBuilder,
//     LogLevel,
// } from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props) {

    const { user } = useAuth();

    const { messages, hubConnection } = useHub();

    const [message, setMessage] = useState("");

    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        console.log("Filtering to find general messages");
        let theseMessages = messages.filter(msg => msg.recipient === "General");
        setFilteredMessages(theseMessages);
        setMessageCount(theseMessages.length);
        console.log(theseMessages);
    }, [messages, messageCount])


    const submitHandler = async (e) => {
        e.preventDefault();
        let thisForm = e.target;

        if (hubConnection.connectionStarted) {
            console.log("sending!")
            await hubConnection.invoke("SendMessage", user, "General", message).catch(function (err) {
                return console.error(err.toString());
            });
        }
        else {
            alert('No connection to server yet.');
        }
        thisForm.reset();
    };



    const changeHandler = e => {
        setMessage(e.target.value);
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <label>
                    {user} says:
    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send</button>
            </form>
            <ChatWindow messages={filteredMessages} />

        </>
    )
}