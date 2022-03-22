import Image from "./Image";

function Modal(props) {

    const close_modal = (e) => 
    {document.getElementById('id01').style.display = 'none'};
    return(
        <div id="id01" className="modal">
            <form className="modal-content" action="">
                <div className="container">
                    <div className="modal-header">
                        <h3>Edit Profile</h3>
                        <span className="close" title="Close Modal" onClick={close_modal}>
                            &times;</span>
                    </div>

                    <div className="profile-box">
                        <Image click={null}></Image>
                        <span className="profile-add"><b>Add New Image</b></span>
                        <span className="profile-remove"><b>Remove Image</b></span>
                    </div>

                    <label htmlFor="name">Name</label><br></br>
                    <input className="profile-form-input" type="text"></input><br></br>
                    <label htmlFor="email">Email</label><br></br>
                    <input className="profile-form-input" type="text"></input><br></br>
                    <label htmlFor="color-choice">Color Scheme</label><br></br>
                    <input className="profile-form-input" list="colors" 
                    id="color-list"></input><br></br>
                    <datalist id="colors">
                        <option value="Light"></option>
                        <option value="Dark"></option>
                    </datalist>

                    <div className="modal-footer">
                        <button type="submit" value="Save" onClick={close_modal}
                        className="modal-submit" title="Close Modal">Save</button>
                        <span>Logout</span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Modal