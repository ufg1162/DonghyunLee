import AllNotes from './AllNotes';
import Icons from './Icons' 
import image from "./dog.jpg"


function Sidebar(props) {
    
    return (    
        <div className='sidebar'>
            <div className='index-sidebar-header'>
                <img className="img" alt="My profile image" onClick={props.openModal} src={image}></img>
                <span className='my-notes'>My notes</span>
                <Icons text="note_add" onClick={props.addNote}/>
            </div>

            <div className='search'>
                <Icons text="search" onClick={null}/>
                <input className='search-box' type="text" 
                placeholder='Search all notes'></input>
            </div>

            <div className='all-notes'>
                <AllNotes note_list={props.note_list} showNote={props.showNote}/>
            </div>
        </div>

    );
}

export default Sidebar
