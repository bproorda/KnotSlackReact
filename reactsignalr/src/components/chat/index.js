import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from '../chatWindow';
import HubContext from '../../contexts/hubContext';


export default function Chat(props) {

    const {user,  messages, hubConnection } = useContext(HubContext);

    const [message, setMessage] = useState("");

    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messageCount, setMessageCount] = useState(1);

    useEffect(() => {
        console.log("Filtering to find general messages");
        //let theseMessages = messages.filter(msg => msg.recipient === "General");
        let theseMessages = messages
        setFilteredMessages(theseMessages);
        setMessageCount(theseMessages.length);
        console.log(theseMessages);
    }, [messages, messageCount])

    useEffect(()=>{
        console.log(messages);
    })


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
            <ChatWindow messages={filteredMessages} count={messageCount} />

        </>
    )
}