import React from 'react';
import './chatWindow.scss';

export default function ChatWindow(props) {

    const { messages, name } = props;

    const formatMessage = (message) => {
        let fullDate = new Date(Date.parse(message.date));
        return `${fullDate.toLocaleString()}  ${message.sender}: ${message.contents}`;
    }

    return (
        <>
            <div className="TheWindow">
                <h2>{name}</h2>
                <ul className="TheMessages">
                    {messages.map((msg, index) => (
                        <li key={index}>{formatMessage(msg)}</li>
                    ))}
                </ul>
            </div>
        </>
    )

}