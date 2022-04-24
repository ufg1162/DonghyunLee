import { useRef, useEffect } from "react";

function SignUp({ closeModal }) {
    const ref = useRef();

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
            <form className="Signup-sheet" ref={ref}>
                <div className="container">
                    <div className="sign-header">
                        <h3>Sign Up</h3>
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>

                    <label>Name</label><br></br>
                    <input className="signUp-input" name="name" type="text" onChange={null}></input><br></br>
                    <label>Email</label><br></br>
                    <input className="signUp-input" name="email" type="text" onChange={null}></input><br></br>
                    <label>Password</label><br></br>
                    <input className="signUp-input" name="password" type="text" onChange={null}></input><br></br>
                    <button type="submit" onClick={null}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp