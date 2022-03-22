import Icons from './Icons'
import Text from './Text'

function Main(props) {
    return(
        <div className='main'>
            <div className='actions'>
                <ul>
                    <li><Icons text="arrow_back" onClick={null}></Icons></li>
                    <li><Icons text="notification_add" onClick={null}></Icons></li>
                    <li><Icons text="person_add_alt" onClick={null}></Icons></li>
                    <li><Icons text="delete_outline" onClick={props.deleteNote}></Icons></li>
                </ul>
            </div>
            <div className='note-page'>
                <Text note_list={props.note_list} textRef={props.textRef}/>
            </div>
        </div>
    );
}

export default Main