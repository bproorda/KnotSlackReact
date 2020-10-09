import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
//import UserContext from '../../contexts/userContext';
import HubContext from '../../contexts/hubContext';



export default function CreateGroup(props) {

    //const { channels } = useContext(UserContext);
    const { channelsAPI, doesWindowAlreadyExist } = useContext(HubContext);
    const [groupName, setGroupName] = useState();
    const [toggle, setToggle] = useState(false);


    const viewForm = () => {
        setToggle(!toggle);
    };
    
    const changeHandler = (e) => {
        setGroupName(e.target.value);
    };

    const submitHandler = async () => {
        const result = await fetch(`${channelsAPI}`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.context.token}`
            },
            body: JSON.stringify({ name: groupName, type: "Group" }),
          });
      
          //const body = await result.json();
          //console.log(body);
      
          if (result.ok) {
             doesWindowAlreadyExist(groupName, "Group");
          } else {
            return false;
          }
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