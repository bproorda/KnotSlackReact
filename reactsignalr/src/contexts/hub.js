import React, { useContext } from 'react';
import {
    HubConnectionBuilder,
    LogLevel,
} from '../../node_modules/@microsoft/signalr/dist/browser/signalr'


export const HubContext = React.createContext();

export default function useHub() {
    return useContext(HubContext);
}

export class HubProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setUser: this.setUser,
            user: this.setUser(),
            hubConnection: null,
            setConnection: this.setConnection,
            messages: ["Hello"],
            messgeCount: 0,
        }

    };

    async componentDidMount() {
       await this.setConnection();
        //console.log(this.hubConnection);
       
    }

    setConnection = async () => {
        let hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .configureLogging(LogLevel.Information)
            .build();

            console.log(hubConnection);

        await hubConnection.start()
            .then(result => {
                console.log('Connected!');
            })
            .catch(e => console.log('Connection failed: ', e));

        this.setState({hubConnection: hubConnection});
        this.recieveMessages(hubConnection);
    };

    recieveMessages = async (hubConnection) => {
        //let hubConnection = this.state.hubConnection;
        hubConnection.on('ReceiveMessage', async function (message) {
            console.log("messages received");
            var msg = message;
            console.log(msg);
            //msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            //var encodedMsg = message.Sender + ": " + msg;
            //console.log(encodedMsg);
            let currentMessages = this.state.messages ? this.state.messages : [];
            console.log(currentMessages);
            currentMessages.push(msg);
            console.log(currentMessages);
            this.setState({ messages: currentMessages, messageCount: currentMessages.length });

        }.bind(this));

    }

    setUser = () => {
        console.log(this.context);
    }

    render() {
        return (
            <HubContext.Provider value={this.state}>
                {this.props.children}
            </HubContext.Provider>
        );
    }

}