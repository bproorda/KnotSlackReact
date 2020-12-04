import React, { useContext, useState } from 'react';
import HubContext from '../../contexts/hubContext';
import Button from 'react-bootstrap/Button';
import SelectSearch from 'react-select-search';
import './allUsers.scss';

export default function AllUsers(props) {

    const { allUsers, doesWindowAlreadyExist, currentWindow, addUserToGroup } = useContext(HubContext);
    const [thisUser, setThisUser] = useState(null);
    const currentOptions = allUsers ? allUsers.map((user) => ({ name: user.username, value: user.username })) : [{ name: "Loading!", value: "Loading!" }];

    //console.log(allUsers);

    return (
        <div>
            <h3>All Users</h3>
            <p>Select a User to send them a Private Message {currentWindow.type === "Group" ? "or add to current group" : null}</p>
            <SelectSearch
                placeholder="Select a User"
                onChange={setThisUser}
                search
                options={currentOptions}></SelectSearch>
            <Button onClick={() => doesWindowAlreadyExist(thisUser, "Private")}>Send PM</Button>
            {currentWindow.type === "Group" ? <Button onClick={() => addUserToGroup(thisUser, currentWindow.name)}>Add to Group</Button> : null}
        </div>
    )
}