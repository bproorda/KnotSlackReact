import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import UserContext from '../../contexts/userContext'
import HubContext from '../../contexts/hubContext';


export default function ChannelList(props) {

    const { channels } = useContext(UserContext);
    const { doesWindowAlreadyExist } = useContext(HubContext);

    const clickHandler = (name) => {
        doesWindowAlreadyExist(name, "Group");
    }

    return (
        <>
        <h3>Your Channels</h3>
            <ul style={{ listStyleType: "none", overflow:"auto" }}>
                {(channels !== null) ? channels.filter(channel => channel.type === "Group" || channel.type === "General").map((channel, index) => (
                    <li key={index}><Button onClick={() => clickHandler(channel.name)} >{channel.name}</Button></li>
                )) : null}
            </ul>
        </>
    )
}