function Note({note, showNote}) {
    var text;
    if (note.text === '') {
        text = "New Note";
    }
    else {
        text = note.text.split('\n')[0];
    }
    return (
        <div className="note" id={note.id} onClick={() => showNote(note.id)}> 
            <p className="title">
                {text}
            </p>
            <span className="date">{note.date}</span>
        </div>
    );
}

export default Note