import React from 'react';
import './chatWindow.scss';

export default function ChatWindow(props) {

    const { messages, count } = props;

    const formatMessage = (message) => {
        let fullDate = new Date(Date.parse(message.date));
        return `${fullDate.toLocaleString()}  ${message.sender}: ${message.contents}`;
    }

    return (
        <>
            <div>
                <h2>Messages: {count}</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{formatMessage(msg)}</li>
                    ))}
                </ul>
            </div>
        </>
    )

}