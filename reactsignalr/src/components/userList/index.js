import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';
import AllUsers from '../allUsers';
import '../channelList/channelList.scss';


export default function UserList(props) {

    const { allUsers, doesWindowAlreadyExist, windows } = useContext(HubContext);

    //console.log(allUsers);
    //console.log(windows);

    const getStyle = (username) => {
        var style = null;

        var indexNumber = allUsers.findIndex(user => user.username === username);

        if (indexNumber > 0 && allUsers[indexNumber].loggedIn) {
            style = { color: "white", backgroundColor: "blue" };
        } else {
            style = { color: "black", backgroundColor: "lightgray" };
        };
        return style;
    }

    const clickHandler = (name) => {
        doesWindowAlreadyExist(name, "Private");
    }


    return (
        <>
            <h3>Your Neighbors</h3>
            <ul style={{ listStyleType: "none", overflow: "auto", maxHeight: "50%", width: "80%", margin: "auto" }}>
                {(windows !== null) ? windows.filter(channel => channel.type === "Private").map((channel, index) => (
                    <li key={index} className={channel.hasUnread ? "BlinkBlink" : ""}><Button onClick={() => clickHandler(channel.name)} style={getStyle(channel.name)} >{channel.name}</Button></li>
                )) : null}
            </ul>
            <AllUsers />
        </>
    )

}