import React, { useContext, useState, useEffect } from 'react';
import HubContext from '../../contexts/hubContext';
import SelectSearch from 'react-select-search';

export default function AllUsers(props){

    const { allUsers, doesWindowAlreadyExist } = useContext(HubContext);
    const [thisUser, setThisUser] = useState(null);
    const currentOptions = allUsers ? allUsers.map((user) => ( {name: user.username, value: user.username} ) ) : [{name: "Loading!", value: "Loading!"}];
   

    useEffect(() => {
        if(thisUser !== null){
            //doesWindowAlreadyExist(thisUser, "Private");
        }
    }, [thisUser, doesWindowAlreadyExist]);

    return(
        <SelectSearch 
        placeholder="Select a User" 
        onChange={setThisUser}
        search
        options={currentOptions}></SelectSearch>
    )
}