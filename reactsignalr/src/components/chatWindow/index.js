import React from 'react';

export default function ChatWindow(props) {

    const { messages, count } = props;

    return (
        <>
            <h2>Messages: {count}</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </>
    )

}