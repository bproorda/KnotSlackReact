import React from 'react';

export default function ChatWindow(props){

    const {messages, count} = props;
    
    return(
        <>
                    <ul>
                <li><h2>Messages: {count}</h2></li>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </>
    )

}