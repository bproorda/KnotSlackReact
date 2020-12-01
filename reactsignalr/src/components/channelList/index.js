import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import HubContext from '../../contexts/hubContext';
import CreateGroup from '../createGroup';
import './channelList.scss'


export default function ChannelList(props) {

    const { windows, doesWindowAlreadyExist, currentWindow } = useContext(HubContext);

    const clickHandler = (name, type) => {
        console.log(`name: ${name} type: ${type}`);
        doesWindowAlreadyExist(name, type);
    }
    return (
        <div>
            <h3>Your Channels</h3>
            <CreateGroup />
            <ul style={{ listStyleType: "none", overflow: "auto", maxHeight: "50%" }}>
                {(windows !== null) ? windows.filter(channel => channel.type === "Group" || channel.type === "General").map((channel, index) => (
                    <li key={index} className={channel.hasUnread ? "BlinkBlink" : currentWindow.name === channel.name ? "CurrentWindow" : ""}><Button onClick={() => clickHandler(channel.name, channel.type)} >{channel.name}</Button></li>
                )) : null}
            </ul>
        </div>
    )
}