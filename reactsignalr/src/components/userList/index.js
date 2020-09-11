import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';

export default function UserList(props) {

    const { allUsers } = useContext(HubContext);


    return (
        <>
            <ul style={{ listStyleType: "none" }}>
                {(allUsers !== null) ? allUsers.map((user, index) => (
                    <li key={index}><Button variant={user.LoggedIn ? "primary" : "outline-primary"}>{user.username}</Button></li>
                )) : null}
            </ul>
        </>
    )
}