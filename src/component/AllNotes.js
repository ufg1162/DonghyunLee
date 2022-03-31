import Note from "./Note";

function AllNotes({note_list, showNote}) {
    return (
        <>
            {note_list.map((note) => (
                <Note key={note.id} note={note} showNote={showNote}/>
            ))}
        </>
    );
}

export default AllNotes