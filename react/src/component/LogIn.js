import React, { useState} from "react";
import { getNotesAPIMethod, getUsersAPIMethod, logIn } from "../api/client";
import SignUp from "./SignUp";

function LogIn({ setLogIn, setNote_list, setProfile }) {
    const [show, setShow] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [user, setUser] = useState({
        password:"",
        email:""
    })
    const inputChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    const handleLogIn = (event) => {
        event.preventDefault();
        logIn(user).then((response) => {
            setInvalid(false);
            setLogIn(true);
        }).catch(err => {
            setInvalid(true);
        })
    }
    return(
        <div id="LogIn-page">
            {show && <SignUp closeModal={() => setShow(false)} show={() => setShow(true)} setLogIn={setLogIn}
            setNote_list={setNote_list} setProfile={setProfile}/>}
            <div className="header">
                <h1>Notes</h1><br></br>
                <h4>Organize all your thoughts in one place.</h4>
            </div>
            <form className="LogIn-form">
                <div className="container">
                    <label htmlFor="email">Email</label><br></br>
                    <input className="logIn-input" name="email" type="text" onChange={inputChange}></input><br></br>
                    <label htmlFor="password">Password</label><br></br>
                    <input className="logIn-input" name="password" type="password" onChange={inputChange}></input><br></br>
                    {invalid && <span>Error: Invalid email and/or password</span>}
                    <button type="submit" onClick={handleLogIn} className="LogIn">Log In</button><br></br>
                    <hr></hr>
                    <button type="button" onClick={() => setShow(true)} className="createAcc">Create New Account</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn