import React, {useContext} from 'react';
import GeneralChat from '../generalChat';
import PrivateChat from '../privateChat';
import GroupChat from '../groupChat';
import HubContext from '../../contexts/hubContext';
import UserList from '../userList'
import ChannelList from '../channelList'


export default function ChatCentral(props) {

    const { windows } = useContext(HubContext);

    //const [message, setMessage] = useState("");

const whichChatComponent = (type, recipient, index) =>{
    if(type === "General") {
        return <GeneralChat key={index}/>
    } else if (type === "Private") {
        return <PrivateChat name={recipient} key={index}/>
    } else if (type === "Group") {
        return <GroupChat name={recipient} key={index}/>
    }
};


    return (
        <>
            {windows.map((window, index) => {
               return whichChatComponent(window.type, window.name, index)
            })}
            <span className="theList">
                <ChannelList />
                <UserList />
            </span>
        </>
    )
}