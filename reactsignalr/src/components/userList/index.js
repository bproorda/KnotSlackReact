import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';


export default function UserList(props) {

    const { allUsers, doesWindowAlreadyExist, windows } = useContext(HubContext);

    //console.log(allUsers);
    //console.log(windows);

    const getStyle = (username) => {
        var style = null;

        var indexNumber = allUsers.findIndex(user => user.username === username);

        if(indexNumber > 0 && allUsers[indexNumber].loggedIn){
            style = {color: "white", backgroundColor: "blue"};
        } else {
            style = {color: "black", backgroundColor: "lightgray"};
        };
        return style;
    }

    const clickHandler = (name) => {
        doesWindowAlreadyExist(name, "Private");
    }


    return (
        <>
        <h3>Your Neighbors</h3>
            {/* <ul style={{ listStyleType: "none", overflow:"auto", maxHeight: "50%" }}>
                {(allUsers !== null) ? allUsers.map((user, index) => (
                    <li key={index}><Button onClick={() => clickHandler(user.username)} style={getStyle(user)}>{user.username}</Button></li>
                )) : null}
            </ul> */}
                        <ul style={{ listStyleType: "none", overflow: "auto", maxHeight: "50%" }}>
                {(windows !== null) ? windows.filter(channel => channel.type === "Private" ).map((channel, index) => (
                    <li key={index}><Button onClick={() => clickHandler(channel.name)} style={getStyle(channel.name)} >{channel.name}</Button></li>
                )) : null}
            </ul>
        </>
    )
}