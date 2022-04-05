import { useEffect, useRef, useState } from "react";
import image from "../dog.jpg"

function Modal({ profile, inputChange, saveProfile, closeModal }) {
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
        <div id="id01" className="modal">
            <form className="modal-content" action="" ref={ref}>
                <div className="container">
                    <div className="modal-header">
                        <h3>Edit Profile</h3>
                        <span className="close" title="Close Modal" onClick={closeModal}>
                            &times;</span>
                    </div>

                    <div className="profile-box">
                        <img className="img" alt="My profile image" src={image}></img>
                        <span className="profile-add"><b>Add New Image</b></span>
                        <span className="profile-remove"><b>Remove Image</b></span>
                    </div>
                    <label htmlFor="name">Name</label><br></br>
                    <input className="profile-form-input" name="name" type="text" value={profile.name} onChange={inputChange}></input><br></br>
                    <label htmlFor="email">Email</label><br></br>
                    <input className="profile-form-input" name="email" type="text" value={profile.email} onChange={inputChange}></input><br></br>
                    <label htmlFor="color-choice">Color Scheme</label><br></br>
                    <input className="profile-form-input" name="color" value={profile.color} onChange={inputChange} list="colors" 
                    id="color-list"></input><br></br>
                    <datalist id="colors">
                        <option value="Light"></option>
                        <option value="Dark"></option>
                    </datalist>

                    <div className="modal-footer">
                        <button type="submit" value="Save" onClick={saveProfile}
                        className="modal-submit" title="Close Modal">Save</button>
                        <span>Logout</span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Modal