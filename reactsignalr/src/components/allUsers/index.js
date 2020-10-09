import React, { useContext, useState, useEffect } from 'react';
//import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';
import SelectSearch from 'react-select-search';

export default function AllUsers(props){

    const { allUsers, doesWindowAlreadyExist } = useContext(HubContext);
    const [thisUser, setThisUser] = useState(null);
    const options = allUsers ? allUsers.map((user, index) => ( {key: index, name: user.username} ) ) : {key: 0, name: "Loading!"};

    useEffect(() => {
        if(thisUser !== null){
            console.log(thisUser);
        }
    }, [thisUser])

    return(
        <SelectSearch 
        options={options}
        placeholder="Select a User" 
        onChange={setThisUser}></SelectSearch>
    )
}