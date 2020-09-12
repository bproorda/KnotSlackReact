import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import UserContext from '../../contexts/userContext'


export default function ChannelList(props) {

    const { channels } = useContext(UserContext);
    //console.log(channels);


    // const getStyle = (user) => {
    //     var style = null;
    //     if(user.loggedIn){
    //         style = {color: "white", backgroundColor: "blue"};
    //     } else {
    //         style = {color: "black", backgroundColor: "lightgray"};
    //     };
    //     return style;
    // }


    return (
        <>
        <h3>Your Channels</h3>
            <ul style={{ listStyleType: "none" }}>
                {(channels !== null) ? channels.map((channel, index) => (
                    <li key={index}><Button >{channel.name}</Button></li>
                )) : null}
            </ul>
        </>
    )
}