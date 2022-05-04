function Note({note, showNote, setShowSimilar, showSimilar }) {

    const showAll = async (id) => {
        setShowSimilar(true);
        console.log(showSimilar);
        await showNote(id);
    }
    var text;
    if (note.text === '') {
        text = "New Note";
    }
    else {
        text = note.text.split('\n')[0];
    }
    return (
        <div className="note" id={note.id} onClick={() => showAll(note.id)}> 
            <p className="title">
                {text}
            </p>
            <span className="date">{note.lastUpdatedDate}</span>
            <span className="similar"><b>similar</b></span>
        </div>
    );
}

export default Note