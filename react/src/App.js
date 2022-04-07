import React, { useEffect, useRef, useState } from "react";
import Main from "./component/Main";
import Modal from "./component/Modal";
import Sidebar from "./component/Sidebar";
import GetDate from "./component/GetDate";
import {getNotesAPIMethod, createNoteAPIMethod, updateNoteAPIMethod, deleteNoteByIdAPIMethod} from './api/client';
import {v4 as uuidv4} from 'uuid';

function App() {
    const [note_list, setNote_list] = useState([]);
    useEffect(() => {
        getNotesAPIMethod().then((notes) => {
            setNote_list(notes);
        });
    }, []);

    const [profile, setProfile] = useState(() => {
        const localProfile = localStorage.getItem("profile");
        return localProfile ? JSON.parse(localProfile) : {name: '', email: '', color: ''};
    });

    const inputChange = (event) => {
        setProfile({...profile, [event.target.name]: event.target.value})
    }
    const saveProfile = () => {
        localStorage.setItem("profile", JSON.stringify(profile));
    }
    
    const [current, setCurrent] = useState('');
    const [tags, setTags] = useState([]);
    const [show, setShow] = useState(false);
    
    const findIndex = () => {
        var x;
        note_list.map((item) => {
            if (item.id === current) {
                x = item;
             }
        });
        var i = note_list.indexOf(x);
        return i;
    }
    const handleAddition = (tag) => {
        var i = findIndex();
        const newTags = [...tags, tag];
        setTags(newTags);
        note_list[i].tags = newTags;
        updateNoteAPIMethod(note_list[i]);
        setNote_list([...note_list.slice(0, i), {...note_list[i], tags: newTags,}, ...note_list.slice(i + 1)]);
      };
    const handleDelete = (i) => {
        var y = findIndex();
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
        note_list[i].tags = newTags;
        updateNoteAPIMethod(note_list[i]);
        setNote_list([...note_list.slice(0, y), {...note_list[y], tags: newTags,}, ...note_list.slice(y + 1)]);
    };
    const handleDrag = (tag, currPos, newPos) => {
        var i = findIndex();
        const newTags = [...tags].slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        setTags(newTags);
        note_list[i].tags = newTags;
        updateNoteAPIMethod(note_list[i]);
        setNote_list([...note_list.slice(0, i), {...note_list[i], tags: newTags,}, ...note_list.slice(i + 1)]);
    };
    const textChange = (event) => {
        var i = findIndex();
        setNote_list([...note_list.slice(0, i), {...note_list[i], text: event.target.value, date: GetDate(),}, ...note_list.slice(i + 1)])
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                sideRef.current.style.display = "block";
                mainRef.current.style.display = "block";
            }
            else {
                sideRef.current.style.display = "none";
                mainRef.current.style.display = "block";
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    const sideRef = useRef();
    const mainRef = useRef();
    const back = () => {
        sideRef.current.style.display = "block";
        mainRef.current.style.display = "none";
    }

    useEffect(() => {if (current !== '') {showNote(current)}}, [note_list]);

    const addNote = () => {
        const note = {
            id: '',
            text: '',
            lastUpdatedDate: '',
            tags: []
        }
        note.id = uuidv4();
        note.lastUpdatedDate = GetDate();
        createNoteAPIMethod(note).then(result => {
            setNote_list([...note_list, result])
        });
        setCurrent(note.id);
    };
    
    const showNote = (id) => {

        const all = document.querySelectorAll(".note");
        for (let i = 0; i < all.length; i++) {
             all[i].style.backgroundColor = "inherit";
        }

        document.getElementById(id).style.backgroundColor = "lightblue";
        var x;

        note_list.map((item) => {
            if (item.id === id) {
                x = item;
             }
        });
        setTags(x.tags);
        setCurrent(x.id);
        if(window.innerWidth <= 500) {
            sideRef.current.style.display = "none";
            mainRef.current.style.display = "block";
        }
    }

    const deleteNote = () => {
        const newList = note_list.filter((note) => note.id !== current);
        var i = findIndex();
        const noteId = note_list[i]._id;
        deleteNoteByIdAPIMethod(noteId)
        setNote_list(newList);
        if (newList.length === 0) {
            setCurrent('');
        }
        else {
           setCurrent(newList[0].id);
        }
    }
    

    return(
        <div id="root-contatiner">
            <Sidebar addNote={addNote} note_list={note_list} showNote={showNote} openModal={() => setShow(true)} sideRef={sideRef}/>
            <Main showNote={showNote} note_list={note_list} deleteNote={deleteNote} current={current} tags={tags}
            handleAddition={handleAddition} handleDelete={handleDelete} handleDrag={handleDrag} textChange={textChange}
            back={back} show={show} mainRef={mainRef}/>
            {show && <Modal profile={profile} inputChange={inputChange} saveProfile={saveProfile} closeModal={() => setShow(false)}/>}
        </div>
    );
}

export default App