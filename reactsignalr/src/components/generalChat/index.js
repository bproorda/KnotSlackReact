import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from '../chatWindow';
import HubContext from '../../contexts/hubContext';
import UserContext from '../../contexts/userContext';
import './genChat.scss';



export default function GeneralChat(props) {

    const { messages, hubConnection, messageCount } = useContext(HubContext);
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState("");

    const [windowMessages, setWindowMessages] = useState([]);

    const [messageNumber, setMessageCount] = useState(0);


    useEffect(() => {
        let newMessages = messages.filter(msg => msg.recipient === "General");
        //console.log("New Message in General!");
        setWindowMessages(newMessages);
     }, [messageCount, messages]);

    useEffect(() => {
        setMessageCount(windowMessages.length);
    }, [windowMessages]);


    const submitHandler = async (e) => {
        e.preventDefault();
        let thisForm = e.target;

        if (hubConnection.connectionStarted) {
            console.log(`Sending: ${user}: ${message}`)
            await hubConnection.invoke("SendMessage", user, "General", message).catch(function (err) {
                return console.error(err);
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
        <div className="Chat">
            <ChatWindow messages={windowMessages} count={messageNumber} name="General Chat"/>
            <form className="SendMsgForm" onSubmit={submitHandler}>
                <label>
                    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send Message</button>
            </form>
        </div>
    )
}