import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
//import UserContext from '../../contexts/userContext';
//import HubContext from '../../contexts/hubContext';



export default function CreateGroup(props) {

    //const { channels } = useContext(UserContext);
    //const {  } = useContext(HubContext);
    //const [groupName, setGroupName] = useState();
    const [toggle, setToggle] = useState(false);

    //const submitHandler = (name) => {
        //doesWindowAlreadyExist(name, "Group");

    const viewForm = () => {
        setToggle(!toggle);
    }
    

    return (
        <>
        <Button onClick={viewForm}>Create a New Group </Button>
        {toggle ? <form>
            <label>Name: </label>
            <input type="text"></input>
            <button type="submit">Submit</button>
            </form> : null}
        </>
    )
}