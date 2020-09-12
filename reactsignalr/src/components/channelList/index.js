import React from 'react';
import Button from 'react-bootstrap/Button';
//import HubContext from '../../contexts/hubContext';


export default function ChannelList(props) {

    //const { userContext } = useContext(HubContext);

    //const allchannels = userContext.channels;
    //console.log(userContext);
    var theseChannels = JSON.parse(window.localStorage.getItem("channels"));
    console.log(theseChannels);

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
            <ul style={{ listStyleType: "none" }}>
                {(theseChannels !== null) ? theseChannels.map((channel, index) => (
                    <li key={index}><Button >{channel}</Button></li>
                )) : null}
            </ul>
        </>
    )
}