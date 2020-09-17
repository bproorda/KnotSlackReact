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
      hasUpdated: false,
      messages: [{ date: "1970-01-01T00:00:00.000Z", sender: "Diana Trouble", contents: "Hello World!", recipient: "General" }],
      messgeCount: 0,
      currentWindow: "General",
      windows: [],

      //UserContext props
      user: context.user,
    }
  }


  async componentDidUpdate(prevProps, prevState) {
    if(!this.state.hasUpdated){
      this.setState({hasUpdated: true});
    }

    if(this.context.user !== prevState.user && !this.state.hasUpdated){
      console.log("update is running!")
    await this.setConnection();
    await this.fetchAllUsers();
    await this.fetchAllMessages();
    this.createWindows();
    }
  }

  componentWillUnmount(){
    if(this.state.user !== null){
      this.setState({hubConnection: null});
    }
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
    //console.log(body);

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
    //console.log(body);

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
    hubConnection.on('ReceiveMessage', async function (message) {
      //console.log("messages received");
      var msg = message;
      console.log(msg);
      let currentMessages = this.state.messages ? this.state.messages : [];
      currentMessages.push(msg);
      this.setState({ messages: currentMessages, messageCount: currentMessages.length });

    }.bind(this));
  }

  recieveUpdatedUser = async (hubConnection) => {
    hubConnection.on('UpdateUsers', async function (user) {
      //console.log(user);
    });
  }

  createWindows = () => {
    let windows = this.context.channels.map((channel, index) => (
      {name: channel.name, type: channel.type, Zindex : (this.context.channels.length - index) }
    ));
    console.log(windows);
    this.setState({windows: windows});
  }

  render() {
    return (
      <HubContext.Provider value={this.state}>
        {this.props.children}
      </HubContext.Provider>
    );
  }
}