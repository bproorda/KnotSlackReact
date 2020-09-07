import React, { useContext } from 'react';
import useAuth from './auth';
import {
    HubConnectionBuilder,
    LogLevel,
} from '../../node_modules/@microsoft/signalr/dist/browser/signalr'

export const HubContext = React.createContext();

export default function useHub() {
    return useContext(HubContext);
}

export class HubProvider extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            setUser : this.setUser, 
            user : this.setUser(),
            hubConnection: null,
            setConnection: this.setConnection,
            messages: [],
        }

        };
    
        componentDidMount(){
            this.setConnection();

            this.recieveMessages();
        }

     setConnection = async () =>{
        let hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub")
        .configureLogging(LogLevel.Information)
        .build();

   await hubConnection.start()
        .then(result => {
            console.log('Connected!');
        })
        .catch(e => console.log('Connection failed: ', e));

        this.setState({hubConnection});
    };

    recieveMessages = async () =>{
        let hubConnection = this.hubConnection;
        hubConnection.on('ReceiveMessage', async function (message) {
            console.log("messages received");
            var msg = message.Conents;
            console.log(msg);
            msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = message.Sender + ": " + msg;
            console.log(encodedMsg);
            let msgs = this.messages;
            msgs.push(msg);
            this.setState({messages : msgs})
     
        });

    }

   setUser = () => {
        const { user } = useAuth();
        this.setState({user});
    }
    

}