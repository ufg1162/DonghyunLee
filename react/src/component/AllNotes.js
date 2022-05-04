import Note from "./Note";

function AllNotes({note_list, showNote, setShowSimilar, showSimilar}) {
    return (
        <>
            {note_list.map((note) => (
                <Note key={note.id} note={note} showNote={showNote} setShowSimilar={setShowSimilar} showSimilar={showSimilar}/>
            ))}
        </>
    );
}

export default AllNotes