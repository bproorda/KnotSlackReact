import React, { useContext, useState, useEffect } from 'react';
//import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';
import SelectSearch from 'react-select-search';

export default function AllUsers(props){

    const { allUsers, doesWindowAlreadyExist } = useContext(HubContext);
    const [thisUser, setThisUser] = useState(null);
    const currentOptions = allUsers ? allUsers.map((user, index) => ( {name: user.username, value: user.username} ) ) : [{name: "Loading!", value: null}];

    useEffect(() => {
        if(thisUser !== null){
            console.log(thisUser);
        }
    }, [thisUser])

    return(
        <SelectSearch 
        placeholder="Select a User" 
        onChange={setThisUser}
        options={currentOptions}></SelectSearch>
    )
}