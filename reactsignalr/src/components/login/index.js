import React, { useState } from 'react';
import useAuth from '../../contexts/auth';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

const Login = () => {

    const { user, login, logout, register } = useAuth();

    let history = useHistory();

    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationFailed, setRegistrationFailed] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        const { username, password } = e.target.elements;

        let result = null;

        if (!isRegistering) {

            console.log("logging in");

            result = login(username.value, password.value);

        } else {
            console.log("registering");

            result = register(username.value, password.value);
        }

        if (result){ 
            history.push("/chat")
        } else {
            setRegistrationFailed(true);
        };
    }

    const toggleIsRegistering = () => {
        console.log("Registering new user!");
        setIsRegistering(!isRegistering);
    }

    const logoutSubmit = e => {
        console.log("logging out use");
        e.preventDefault();
        logout();
        history.push("/")

    }

    console.log(user);


    if (user) {
        return (
            <div className="login">
                <h3>Welcome back, {user.username ? user.username.match(/^\S*\b/gm) : "Friend"}!</h3>
                <form onSubmit={logoutSubmit}>
                    <Button type="submit" >Log Out</Button>
                    <Button onClick={() => history.push("/chat")} >To Chat</Button>
                </form>
            </div>)
    }

    return (
        <>
        {(!registrationFailed) ? null : isRegistering ? <h3>Registration Failed</h3> : <h3>Login Failed</h3>}
        <form onSubmit={handleSubmit} className="login">
            <label>
                I am a registering as a new user
                <input type="checkbox" onChange={toggleIsRegistering} />
            </label>
            <label>
                Email
            <input placeholder="Username" name="username" />
            </label>
            <label>
                password
            <input placeholder="Password" type="password" name="password" />
            </label>
            <Button type="submit">Login</Button>
        </form>
        </>
    )
}

export default Login;