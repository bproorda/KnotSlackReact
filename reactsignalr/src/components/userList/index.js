import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';


export default function UserList(props) {

    const { allUsers } = useContext(HubContext);

    const getStyle = (user) => {
        var style = null;
        if(user.loggedIn){
            style = {color: "white", backgroundColor: "blue"};
        } else {
            style = {color: "black", backgroundColor: "lightgray"};
        };
        return style;
    }


    return (
        <>
            <ul style={{ listStyleType: "none" }}>
                {(allUsers !== null) ? allUsers.map((user, index) => (
                    <li key={index}><Button style={getStyle(user)}>{user.username}</Button></li>
                )) : null}
            </ul>
        </>
    )
}