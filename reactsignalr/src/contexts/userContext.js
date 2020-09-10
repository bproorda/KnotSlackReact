import React from 'react'
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
const usersAPI = 'https://localhost:5001/api/Users/';

const UserContext = React.createContext();


export default UserContext;

export class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeUser: "Bob",
            food: "Favorite Food: Bacon",
            user: JSON.parse(window.localStorage.getItem('user')) || "NotBob",
            permissions: [],
            token: JSON.parse(window.localStorage.getItem('token')) || null,
            channels: JSON.parse(window.localStorage.getItem('channels')) || null,
            login: this.login,
            logout: this.logout,
            register: this.register,
        }
    }

    register = async (email, username, password) => {
        const result = await fetch(`${usersAPI}register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        console.log(result);

        const body = await result.json();

        if (result.ok) {
            if (this.processToken(body.token, body)) {
                return true;
            }
        } else {
            return false;
        }
    }


    login = async (username, password) => {
        const result = await fetch(`${usersAPI}login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const body = await result.json();
        console.log(body);

        if (result.ok) {
            if (this.processToken(body.token, body)) {
                return true;
            }
        } else {
            return false;
        }

        //TODO: userError state
        this.logout();
    }

    logout = async (username) => {

        const result = await fetch(`${usersAPI}logout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, }),
        });

        if (result.ok) {
            this.setState({ token: null, user: null, permissions: [] });
            cookie.remove('auth', { path: "/" });
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("token");
        }
    }

    processToken(token, body) {
        try {
            const payload = jwt.decode(token);
            if (payload) {
                if (payload.exp * 1000 < Date.now()) {
                    this.logout();
                    return;
                }
                if (true) {
                    var user = payload.sub;
                }
                let channels = body.channels;
                window.localStorage.setItem("user", JSON.stringify(user));
                window.localStorage.setItem("token", JSON.stringify(token));
                window.localStorage.setItem("channels", JSON.stringify(channels));
                console.log(user);
                this.setState({
                    token,
                    user,
                    channels,
                    permissions: payload.permissions || [],
                });
                cookie.save('auth', token, { path: "/" });
                return true;
            }
        } catch (e) {
            console.warn(e);
            this.logout();
        }
    }

    componentDidMount() {
        const cookieToken = cookie.load('auth');
        if (cookieToken) console.log('Found auth cookie!');

        this.processToken(cookieToken);
    }


    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}