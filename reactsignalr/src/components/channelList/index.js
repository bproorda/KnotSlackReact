import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import UserContext from '../../contexts/userContext'
import HubContext from '../../contexts/hubContext';
import Plus from '../../assests/plus.svg';
import './channelList.scss'


export default function ChannelList(props) {

    const { channels } = useContext(UserContext);
    const { doesWindowAlreadyExist } = useContext(HubContext);

    const clickHandler = (name) => {
        doesWindowAlreadyExist(name, "Group");
    }

    return (
        <>
        <span>
        <h3>Your Channels</h3>
        <button><img src={Plus} alt="Plus symbol"></img> Create New Group Channel</button>
        </span>
            <ul style={{ listStyleType: "none", overflow:"auto", maxHeight: "50%" }}>
                {(channels !== null) ? channels.filter(channel => channel.type === "Group" || channel.type === "General").map((channel, index) => (
                    <li key={index}><Button onClick={() => clickHandler(channel.name)} >{channel.name}</Button></li>
                )) : null}
            </ul>
        </>
    )
}