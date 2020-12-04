import React from 'react'
import {
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr/dist/browser/signalr';
import UserContext from './userContext';
//import context from 'react-bootstrap/esm/AccordionContext';
const usersAPI = 'https://knotslackapi.azurewebsites.net/api/Users/';
const messagesAPI = 'https://knotslackapi.azurewebsites.net/api/messages/';
const channelsAPI = 'https://knotslackapi.azurewebsites.net/api/channels/';

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
      channelsAPI: channelsAPI,
      messages: [{ date: "1970-01-01T00:00:00.000Z", sender: "Diana Trouble", contents: "Hello World!", recipient: "General" }],
      messgeCount: 0,
      currentWindow: { name: "General", type: "General" },
      windows: [],
      windowCount: 1,
      doesWindowAlreadyExist: this.doesWindowAlreadyExist,
      addUserToGroup: this.addUserToGroup,
      updateLastVisited: this.updateLastVisited,

      //UserContext props
      user: context.user,
      loggedInWhen: context.lastVisited,
    }
  }


  async componentDidUpdate(prevProps, prevState) {
    if (!this.state.hasUpdated) {
      this.setState({ hasUpdated: true });
    }

    if (this.context.user !== prevState.user && !this.state.hasUpdated) {
      console.log("update is running!")
      await this.setConnection();
      if (!this.context.guestUser) {
        await this.fetchAllUsers();
        await this.fetchAllMessages();
        this.createWindows();
      } else {
        await this.fetchGenMessages();
      }
    }
  }

  async componentWillUnmount() {
    if (this.state.user !== null) {
      await this.state.hubConnection.invoke("UpdateLastVisited", this.context.user).catch(function (err) {
        return console.error(err.toString());
      });
      window.localStorage.setItem("lastVisited", new Date());
      this.setState({ hubConnection: null });
    }
  }

  fetchGenMessages = async () => {
    const result = await fetch(`${messagesAPI}genmsg`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await result.json();
    //console.log(body);

    if (result.ok) {
      let allMessages = this.state.messages.concat(body);
      this.setState({ messages: allMessages });
    } else {
      return false;
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
      this.setState({ allUsers: body });
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
      this.setState({ messages: allMessages });
    } else {
      return false;
    }
  }

  setConnection = async () => {
    let hubConnection = new HubConnectionBuilder()
      .withUrl("https://knotslackapi.azurewebsites.net/chatHub")
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
      if (msg.recipient !== this.state.currentWindow.name) this.updateHasUnread(msg.Recipient);
      this.setState({ messages: currentMessages, messageCount: currentMessages.length });
      console.log(this.state.messageCount);
    }.bind(this));
  }

  recieveUpdatedUser = async (hubConnection) => {
    hubConnection.on('UpdateUsers', async function (user) {
      //console.log(user);
    });
  }

  createWindows = () => {
    let windows = this.context.channels.map((channel, index) => (
      { name: channel.name, type: channel.type, lastVisited: new Date(0), hasUnread: this.checkForUnreads(channel.name) }
    ));
    //console.log(windows);
    window.localStorage.setItem("channels", JSON.stringify(windows));
    this.setState({ windows: windows, windowCount: windows.length });
  };

  checkForUnreads = channelName => {
    let currentMsgs = this.state.messages;
    let result = currentMsgs.some(msg => msg.Date > this.context.lastVisited);
    if (result) {
      return true;
    }
    return false;
  };

  createNewWindow = async (name, type) => {
    let newWindow = { name: name, type: type, lastVisited: new Date(), hasUnread: false };
    let currentWindows = this.state.windows;
    currentWindows.unshift(newWindow);
    window.localStorage.setItem("channels", JSON.stringify(currentWindows));
    this.setState({ windows: currentWindows, windowCount: currentWindows.length });

    //sending new window to api
    await fetch(`${channelsAPI}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.context.token}`
      },
      body: JSON.stringify(newWindow),
    });
  }

  doesWindowAlreadyExist = async (name, type) => {
    let result = this.state.windows.find(window => name === window.name && type === window.type);
    if (!result) {
      await this.createNewWindow(name, type);
    }
    let newCurrentWindow = { name: name, type: type };
    this.setState({ currentWindow: newCurrentWindow });
  }

  addUserToGroup = async (username, channelName) => {

    let newGroupUser = { Username: username, ChannelName: channelName };
    await fetch(`${channelsAPI}newuc`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.context.token}`
      },
      body: JSON.stringify(newGroupUser),
    });
    
  }

  updateLastVisitedWindow = (channelName) => {
    let theseWindows = this.state.windows;
    let desiredIndex = theseWindows.findIndex(window => window.name === channelName);
    theseWindows[desiredIndex].lastVisited = new Date();
    this.setState({ windows: theseWindows });
  }

  updateHasUnread = (channelName) => {
    let theseWindows = this.state.windows;
    let desiredIndex = theseWindows.findIndex(window => window.name === channelName);
    theseWindows[desiredIndex].hasUnread = new Date();
    this.setState({ windows: theseWindows });
  }

  render() {
    return (
      <HubContext.Provider value={this.state}>
        {this.props.children}
      </HubContext.Provider>
    );
  }
}