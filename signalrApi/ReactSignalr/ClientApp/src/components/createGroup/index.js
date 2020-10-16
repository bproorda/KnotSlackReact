import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';



export default function CreateGroup(props) {

    const { doesWindowAlreadyExist } = useContext(HubContext);
    const [groupName, setGroupName] = useState();
    const [toggle, setToggle] = useState(false);


    const viewForm = () => {
        setToggle(!toggle);
    };

    const changeHandler = (e) => {
        setGroupName(e.target.value);
    };

    const submitHandler = async () => {
        await doesWindowAlreadyExist(groupName, "Group");
    };

    return (
        <>
            <Button onClick={viewForm}>Create a New Group </Button>
            {toggle ? <form onSubmit={submitHandler}>
                <label>Name: </label>
                <input type="text" onChange={changeHandler}></input>
                <button type="submit">Submit</button>
            </form> : null}
        </>
    )
}