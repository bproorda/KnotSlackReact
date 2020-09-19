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

const whichChatComponent = (window, index) => {
    if(window.type === "General") {
        return <GeneralChat key={index} Zindex={window.Zindex} style={{position: "relative", zIndex: window.Zindex}}/>
    } else if (window.type === "Private") {
        return <PrivateChat name={window.recipient} Zindex={window.Zindex} key={index} style={{position: "relative", zIndex: window.Zindex}}/>
    } else if (window.type === "Group") {
        return <GroupChat name={window.recipient} Zindex={window.Zindex} key={index} style={{position: "relative", zIndex: window.Zindex}}/>
    }
};


    return (
        <div>
            {windows.map((window, index) => {
               return whichChatComponent(window, index)
            })}
            <span className="theList">
                <ChannelList />
                <UserList />
            </span>
        </div>
    )
}