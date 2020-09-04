import React, { useState, useEffect } from 'react';
import ChatWindow from '../chatWindow';
import {
    HubConnectionBuilder,
    LogLevel,
} from '../../../node_modules/@microsoft/signalr/dist/browser/signalr'

export default function Chat(props) {

    const username = props.username;
    const [hubConnection, setHubConnection] = useState();
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const [messageCount, setMessageCount] = useState(0);
    const [userList, setUserList] = useState([]);
    const [userCount, setUserCount] = useState(0);


    useEffect(() => {
        startup();
    }, []);

    useEffect(() => {
        if (hubConnection) {
            console.log(hubConnection);

            RecieveNewMessages();
            updateUserList();

        }

    }, [hubConnection]);

    const RecieveNewMessages = () => {
        hubConnection.on('ReceiveMessage', function (user, message) {
            console.log("messages received");
            console.log(message);
            var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = user + ": " + msg;
            let currentChat = chat;
            currentChat.push(encodedMsg);
            console.log(currentChat);
            setChat(currentChat);
            IncrementCount();
        });
    }

    const updateUserList = () => {
        hubConnection.on('ShowUsers', function (users) {
            console.log("updating user list");
            console.log(users);
            setUserList(users);
            incrementUser();
        })
    }

    const IncrementCount = () => {
        let currentCount = chat.length;
        setMessageCount(currentCount);
        console.log(`# of messages: ${currentCount}`);
    }

    const incrementUser = () => {
        setUserCount(userList.length);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let thisForm = e.target;

        if (hubConnection.connectionStarted) {
            console.log("sending!")
            await hubConnection.invoke("SendMessage", username, message).catch(function (err) {
                return console.error(err.toString());
            });
        }
        else {
            alert('No connection to server yet.');
        }
        thisForm.reset();
    };

    const sendUser = async (connection) => {
        if (connection.connectionStarted) {
            console.log("adding your username to the list of users")
            await connection.invoke("DisplayUsers").catch(function (err) {
                return console.error(err.toString());
            });
        }
        else {
            alert('No connection to server yet.');
        }
    }
    const startup = async () => {
        let hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .configureLogging(LogLevel.Information)
            .build();

       await hubConnection.start()
            .then(result => {
                console.log('Connected!');
            })
            .catch(e => console.log('Connection failed: ', e));

        sendUser(hubConnection);

        setHubConnection(hubConnection);
    }

    const changeHandler = e => {
        setMessage(e.target.value);
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <label>
                    {username} says:
    <input type="text" name="name" onChange={changeHandler} />
                </label>
                <button name="name" type="submit">Send</button>
            </form>
            <ChatWindow messages={chat} count={messageCount} />

        </>
    )
}