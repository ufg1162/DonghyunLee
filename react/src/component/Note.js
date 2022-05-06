function Note({note, selectNote }) {

    var text;
    if (note.text === '') {
        text = "New Note";
    }
    else {
        text = note.text.split('\n')[0];
    }
    return (
        <div className="note" id={note.id} onClick={() => selectNote(note.id)}> 
            <p className="title">
                {text}
            </p>
            <span className="date">{note.lastUpdatedDate}</span>
            <span className="similar"><b>similar</b></span>
        </div>
    );
}

export default Note