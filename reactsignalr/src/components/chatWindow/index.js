import React, {useState, useEffect} from 'react';

export default function ChatWindow(props){

    const {messages} = props;
    const [messageList, setMessageList] = useState(messages);


    useEffect(() => {
        setMessageList(messages);
    },[messages])

    return(
        <>
                    <ul>
                <li><h2>Messages: </h2></li>
                {messageList.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </>
    )

}