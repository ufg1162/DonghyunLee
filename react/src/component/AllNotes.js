import Note from "./Note";

function AllNotes({note_list, selectNote, setShowSimilar, showSimilar}) {
    return (
        <>
            {note_list.map((note) => (
                <Note key={note.id} note={note} selectNote={selectNote}/>
            ))}
        </>
    );
}

export default AllNotes