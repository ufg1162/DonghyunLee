import { useEffect, useRef, useState } from "react";
import { uploadImageToCloudinaryAPIMethod, logOut } from "../api/client";
import image from "../dog.jpg"

function Modal({ profile, saveProfile, closeModal }) {
    const ref = useRef();
    const [user, setUser] = useState(profile);

    useEffect(() => {
        const outClick = (e) => {
            if(ref.current && !ref.current.contains(e.target)) {
               closeModal();
            }
        };
        document.addEventListener("click", outClick);
        return () => {document.removeEventListener("click", outClick)};
    })

    const inputChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleImageDelete = () => {
        setUser({...user, "profile_img": ''})
    }

    const handleImageSelected = (event) => {
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {

            // Could also do additional error checking on the file type, if we wanted
            // to only allow certain types of files.
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
            // Then enter the text for that here.
            const unsignedUploadPreset = 'NoteApp'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);

                // Now the URL gets saved to the author
                const updatedUser = {...user, "profile_img": response.url};
                setUser(updatedUser);

                // Now we want to make sure this is updated on the server – either the
                // user needs to click the submit button, or we could trigger the server call here
            });
        }
    }

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
                        <label className="profile"><input className="inputFile" type="file" onChange={handleImageSelected}/>
                        <img className="img" alt="Profile" src={user.profile_img || image}/></label>
                        <label className="profile-add"><input className="inputFile" type="file" onChange={handleImageSelected}/><i></i><b>Add New Image</b></label>
                        <label className="profile-remove" onClick={handleImageDelete}><b>Remove Image</b></label>
                    </div>
                    <label htmlFor="name">Name</label><br></br>
                    <input className="profile-form-input" name="name" type="text" value={user.name} onChange={inputChange}></input><br></br>
                    <label htmlFor="email">Email</label><br></br>
                    <input className="profile-form-input" name="email" type="text" value={user.email} onChange={inputChange}></input><br></br>
                    <label htmlFor="color-choice">Color Scheme</label><br></br>
                    <input className="profile-form-input" name="colorScheme" value={user.colorScheme || ''} onChange={inputChange} list="colors" 
                    id="color-list"></input><br></br>
                    <datalist id="colors">
                        <option value="Light"></option>
                        <option value="Dark"></option>
                    </datalist>

                    <div className="modal-footer">
                        <button type="submit" value="Save" onClick={() => {
                            console.log(user);
                            saveProfile(user);
                        }}
                        className="modal-submit" title="Close Modal">Save</button>
                        <button type="submit" onClick={logOut}>Logout</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Modal