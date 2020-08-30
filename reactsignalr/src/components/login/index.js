import React, { useState, useEffect } from 'react';

export default function Login(props) {

    const {nameInput} = props

    const [userInput, setUserInput] = useState();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(userInput);
        console.log(props);
        nameInput(userInput);
    }
    
    const changeHandler = e =>{
        //console.log(e.target.value);
        setUserInput(e.target.value);
    }

    return (
        <>
            <p>Please enter your name to start chatting</p>
            <form onSubmit={submitHandler}>
                <label>
                    Name:
    <input type="text" name="name"  onChange={changeHandler}/>
                </label>
                <button name="name" type="submit">Submit</button>
            </form>
        </>
    )
}