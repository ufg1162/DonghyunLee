import React, { useState} from "react";
import SignUp from "./SignUp";

function LogIn() {
    const [show, setShow] = useState(false);
    const [invalid, setInvalid] = useState(false);
    return(
        <div id="LogIn-page">
            {show && <SignUp closeModal={() => setShow(false)} show={() => setShow(true)}/>}
            <div className="header">
                <h1>Notes</h1><br></br>
                <h4>Organize all your thoughts in one place.</h4>
            </div>
            <form className="LogIn-form">
                <div className="container">
                    <label htmlFor="email">Email</label><br></br>
                    <input className="logIn-input" name="email" type="text" ></input><br></br>
                    <label htmlFor="password">Password</label><br></br>
                    <input className="logIn-input" name="password" type="password"></input><br></br>
                    {invalid && <span>Error: Invalid email and/or password</span>}
                    <button type="submit" onClick={null} className="LogIn">Log In</button><br></br>
                    <hr></hr>
                    <button type="button" onClick={() => setShow(true)} className="createAcc">Create New Account</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn