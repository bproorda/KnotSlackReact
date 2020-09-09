import React from 'react'
import {
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr/dist/browser/signalr';
import UserContext from './userContext';

export const HubContext = React.createContext();

export const HubConsumer = HubContext.Consumer

export default HubContext;

export class HubProvider extends React.Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      //dummy prop
      book: "Favorie Book: Dune",
      userContext: context,

      //hubContext props
      hubConnection: null,
      setConnection: this.setConnection,
      messages: [{date: "1970-01-01T00:00:00.000Z", sender:"Diana Trouble", contents: "Hello World!", recipient: "General"}],
      messgeCount: 0,

      //UserContext props
      //dummy props
      user: context.user
    }
  }


  async componentDidMount() {
    //console.log(this.context);
   await this.setConnection();
   
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
  render() {
    return (
      <HubContext.Provider value={this.state}>
        {this.props.children}
      </HubContext.Provider>
    );
  }
}