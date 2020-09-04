import React, { useContext } from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

// TODO: Input Users API url below
const usersAPI = 'https://localhost:5001/api/Users/';

export const AuthContext = React.createContext();

export default function useAuth() {
    return useContext(AuthContext);
}

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(window.localStorage.getItem('user')) || null,
            permissions: [],
            token: JSON.parse(window.localStorage.getItem('token')) || null,
            login: this.login,
            logout: this.logout,
            register: this.register,
        };
    }

    register = async (username, email, password) => {
        const result = await fetch(`${usersAPI}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email,  password }),
        });

        const body = await result.json();

        if (result.ok) {
            if(this.processToken(body.token, body)){
                return true;
            }
        }
    }


    login = async (username, password) => {
        const result = await fetch(`${usersAPI}/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const body = await result.json();
        //console.log(body);

        if (result.ok) {
            if(this.processToken(body.token, body)){
                return true;
            }
        }

        //TODO: userError state
        this.logout();
    }

    logout = () => {
        this.setState({token: null, user: null, permissions: [] });
        cookie.remove('auth', {path: "/"});
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
    }

    processToken(token, user) {
        try {
            const payload = jwt.decode(token);
            if (payload) {
                if(payload.exp*1000 < Date.now()) {
                    this.logout();
                    return;
                }
                if (true) {
                    user = {
            //username: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            username: payload.FullName
                    };
                }
                window.localStorage.setItem("user", JSON.stringify(user));
                window.localStorage.setItem("token", JSON.stringify(token));
                console.log(user);
                this.setState({
                    token,
                    user,
                    permissions: payload.permissions || [],
                });
                cookie.save('auth', token, {path: "/"});
                return true;
            }
        } catch(e) {
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
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}