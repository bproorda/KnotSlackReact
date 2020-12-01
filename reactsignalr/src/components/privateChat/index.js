import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from '../chatWindow';
import HubContext from '../../contexts/hubContext';
import UserContext from '../../contexts/userContext';
import './privChat.scss';



export default function PrivateChat(props) {


    const { messages, hubConnection, messageCount } = useContext(HubContext);
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState("");

    const [windowMessages, setWindowMessages] = useState([]);

    const [messageNumber, setMessageCount] = useState(0);

    const recipient = props.name;


    useEffect(() => {
        let newMessages = messages.filter(msg => msg.recipient === recipient);
        setWindowMessages(newMessages);
    }, [messageCount, recipient, messages]);

    useEffect(() => {
        setMessageCount(windowMessages.length);
    }, [windowMessages]);


    const submitHandler = async (e) => {
        e.preventDefault();
        let thisForm = e.target;

        if (hubConnection.connectionStarted) {
            console.log("sending!")
            console.log(`${user} to ${recipient}: ${message}`);
            await hubConnection.invoke("SendPrivateMessage", user, recipient, message).catch(function (err) {
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
        <div className="Chat" >
            <ChatWindow messages={windowMessages} count={messageNumber} name={recipient}/>
            <form className="SendMsgForm" onSubmit={submitHandler}>
                <label>
                    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send Message</button>
            </form>
        </div>
    )
}