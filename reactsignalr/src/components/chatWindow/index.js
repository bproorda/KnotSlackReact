import React from 'react';

export default function ChatWindow(props) {

    const { messages, count } = props;

    const formatMessage = (message) => {
        let fullDate = new Date(Date.parse(message.date));
        return `${fullDate.toLocaleString()}  ${message.sender}: ${message.contents}`;
    }

    return (
        <>
            <h2>Messages: {count}</h2>
            <ul>
                {messages.filter(msg => msg.recipient === "General").map((msg, index) => (
                    <li key={index}>{formatMessage(msg)}</li>
                ))}
            </ul>
        </>
    )

}