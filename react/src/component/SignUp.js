import { useRef, useEffect, useState } from "react";
import { register, getNotesAPIMethod, getUsersAPIMethod } from "../api/client";

function SignUp({ closeModal, setLogIn, setNote_list, setProfile }) {
    const ref = useRef();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profile_img: "",
        colorScheme: "",
    })

    const inputChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    const handleRegister = (event) => {
        event.preventDefault();
        register(user).then((response) => {
            setError(null);
            setLogIn(true);
        }).catch(err => {
            setError(err.toLocaleString());
        })
    }

    useEffect(() => {
        const outClick = (e) => {
            if(ref.current && !ref.current.contains(e.target)) {
               closeModal();
            }
        };
        document.addEventListener("click", outClick);
        return () => {document.removeEventListener("click", outClick)};
    })

    return(
        <div id="SignUp-page">
            <form className="Signup-sheet" ref={ref} onSubmit={handleRegister}>
                <div className="container">
                    <div className="sign-header">
                        <h3>Sign Up</h3>
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>

                    <label>Name</label><br></br>
                    <input className="signUp-input" name="name" type="text" onChange={inputChange}></input><br></br>
                    <label>Email</label><br></br>
                    <input className="signUp-input" name="email" type="text" onChange={inputChange}></input><br></br>
                    <label>Password</label><br></br>
                    <input className="signUp-input" name="password" type="text" onChange={inputChange}></input><br></br>
                    {error && <span>{error}</span>}
                    <input type="submit" id="submit-signUp" value="Submit"></input>
                </div>
            </form>
        </div>
    )
}

export default SignUp