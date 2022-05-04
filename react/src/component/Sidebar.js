import AllNotes from './AllNotes';
import Icons from './Icons' 
import image from "../dog.jpg"

function Sidebar(props) {
    
    return (    
        <div className='sidebar' ref={props.sideRef}>
            <div className='index-sidebar-header'>
                <img className="img" alt="My profile image" onClick={props.openModal} src={props.profile.profile_img || image}></img>
                <span className='my-notes'>My notes</span>
                <Icons text="note_add" onClick={props.addNote}/>
            </div>

            <div className='search'>
                <Icons text="search" onClick={null}/>
                <input className='search-box'  onChange={props.search} type="text" 
                placeholder='Search all notes' ref={props.searchRef}></input>
            </div>

            <div className='all-notes'>
                <AllNotes note_list={props.display} showNote={props.showNote} setShowSimilar={props.setShowSimilar} showSimilar={props.showSimilar}/>
            </div>
        </div>

    );
}

export default Sidebar