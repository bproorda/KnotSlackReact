import React from 'react'
import {
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr/dist/browser/signalr';
import UserContext from './userContext';
//import context from 'react-bootstrap/esm/AccordionContext';
const usersAPI = 'https://localhost:5001/api/Users/';
const messagesAPI = 'https://localhost:5001/api/messages/';

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
      allUsers: null,

      //hubContext props
      hubConnection: null,
      setConnection: null,
      messages: [{ date: "1970-01-01T00:00:00.000Z", sender: "Diana Trouble", contents: "Hello World!", recipient: "General" }],
      messgeCount: 0,
      currentWindow: "General",

      //UserContext props
      user: context.user
    }
  }


  async componentDidMount() {
    //console.log(this.context);
    await this.setConnection();
    await this.fetchAllUsers();
    await this.fetchAllMessages();
  }

  fetchAllUsers = async () => {
    const result = await fetch(`${usersAPI}allusers`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.context.token}`
      },
    });

    const body = await result.json();
    console.log(body);

    if (result.ok) {
      this.setState({allUsers: body});
    } else {
      return false;
    }
  };

  fetchAllMessages = async () => {
    const result = await fetch(`${messagesAPI}mymsg`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.context.token}`
      },
    });

    const body = await result.json();
    console.log(body);

    if (result.ok) {
      let allMessages = this.state.messages.concat(body);
      this.setState({messages: allMessages});
    } else {
      return false;
    }
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

    this.setState({ hubConnection: hubConnection });
    this.recieveMessages(hubConnection);
    this.recieveUpdatedUser(hubConnection);
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

  recieveUpdatedUser = async (hubConnection) => {
    hubConnection.on('UpdateUsers', async function (user) {
      console.log(user);
    });
  }
  render() {
    return (
      <HubContext.Provider value={this.state}>
        {this.props.children}
      </HubContext.Provider>
    );
  }
}