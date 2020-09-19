import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from '../chatWindow';
import HubContext from '../../contexts/hubContext';
import './privChat.scss';



export default function PrivateChat(props) {

    const { user, messages, hubConnection } = useContext(HubContext);

    const [message, setMessage] = useState("");

    const [messageCount] = useState(1);

    const recipient = props.name;
    const Zindex = props.Zindex;


    useEffect(() => {
        //console.log(messages);
    })


    const submitHandler = async (e) => {
        e.preventDefault();
        let thisForm = e.target;

        if (hubConnection.connectionStarted) {
            console.log("sending!")
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
        <div className="Chat" style={{zIndex: Zindex}}>
            <ChatWindow messages={messages.filter(msg => msg.recipient === recipient)} count={messageCount} />
            <form onSubmit={submitHandler}>
                <label>
    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send</button>
            </form>
        </div>
    )
}