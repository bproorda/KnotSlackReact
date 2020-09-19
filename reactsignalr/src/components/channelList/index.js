import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import UserContext from '../../contexts/userContext'


export default function ChannelList(props) {

    const { channels, doesWindowAlreadyExist } = useContext(UserContext);

    const clickHandler = (name) => {
        doesWindowAlreadyExist(name, "Group");
    }

    return (
        <>
        <h3>Your Channels</h3>
            <ul style={{ listStyleType: "none" }}>
                {(channels !== null) ? channels.map((channel, index) => (
                    <li key={index}><Button onClick={() => clickHandler(channel.name)} >{channel.name}</Button></li>
                )) : null}
            </ul>
        </>
    )
}