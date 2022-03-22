
import AllNotes from './AllNotes';
import Icons from './Icons' 
import Image from './Image'


function Sidebar(props) {
    const open_modal = (e) => 
    {document.getElementById('id01').style.display = 'block'};

    
    return (
        <div className='sidebar'>
            <div className='index-sidebar-header'>
                <Image click={open_modal}/>
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
