import React from 'react';
import GeneralChat from '../generalChat';
//import HubContext from '../../contexts/hubContext';
import UserList from '../userList'
import ChannelList from '../channelList'


export default function ChatCentral(props) {

    //const { user, messages, hubConnection } = useContext(HubContext);

    //const [message, setMessage] = useState("");




    return (
        <>
            <GeneralChat />
            <span className="theList">
                <ChannelList />
                <UserList />
            </span>
        </>
    )
}