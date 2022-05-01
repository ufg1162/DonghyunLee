import React, { useCallback, useEffect, useRef, useState } from "react";
import Main from "./component/Main";
import Modal from "./component/Modal";
import Sidebar from "./component/Sidebar";
import GetDate from "./component/GetDate";
import LogIn from "./component/LogIn";
import {getNotesAPIMethod, createNoteAPIMethod, updateNoteAPIMethod, deleteNoteByIdAPIMethod, updateUserAPIMethod, getUsersAPIMethod, auth} from './api/client';
import {v4 as uuidv4} from 'uuid';

function App() {
    const [note_list, setNote_list] = useState([]);
    const [display, setDisplay] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        note_list.sort((a, b) => {
            return new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate);
        });
        setDisplay([...note_list]);
    }, [note_list]);


    const debounce = (func, timeout = 1000) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    const saveProfile = (profile) => {
        updateUserAPIMethod(profile);
    }
    
    const [current, setCurrent] = useState('');
    const [tags, setTags] = useState([]);
    const [show, setShow] = useState(false);
    const [LoggedIn, setLogIn] = useState(false);
    useEffect(() => {
        auth().then(result => {
            setLogIn(result);
        })
    }, []);

    useEffect(() => {
        if (LoggedIn === true) {
            getNotesAPIMethod().then((result) => {
                setNote_list(result);
            })
            getUsersAPIMethod().then((result) => {
                setProfile(result[0]);
            })
        }
    }, [LoggedIn])



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
    
    const textUpdate = useCallback(debounce((note) => {
        updateNoteAPIMethod(note);  
    }));
    const textChange = (event) => {
        var i = findIndex();
        const updatedNote = {...note_list[i], text: event.target.value, lastUpdatedDate: GetDate(),};
        setNote_list([...note_list.slice(0, i), updatedNote, ...note_list.slice(i + 1)]);
        textUpdate(updatedNote);
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
    const searchRef = useRef();

    const back = () => {
        sideRef.current.style.display = "block";
        mainRef.current.style.display = "none";
    }

    const search = (event) => {
        let search = event.target.value;
        const searched = [];
        note_list.map((note) => {
            if(note.text.includes(search)) {
                searched.push(note);
            }
        });
        setDisplay(searched);
    }

    useEffect(() => {if (current !== '') {showNote(current)}}, [display]);

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
        searchRef.current.value ="";
        setCurrent(note.id);
    };
    
    const showNote = (id) => {
        let curr = id;
        let exist;
        display.map((note) => {
            if(note.id === id) {
                exist = note;
            }
        })
        if (exist === undefined) {
            if (display.length !== 0) {
                curr = display[0].id;
            }
            else {
                return;
            }
        }
        const all = document.querySelectorAll(".note");
        for (let i = 0; i < all.length; i++) {
             all[i].style.backgroundColor = "inherit";
        }

        document.getElementById(curr).style.backgroundColor = "lightblue";
        var x;

        display.map((item) => {
            if (item.id === curr) {
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
        if (current !== '') {
            const newList = note_list.filter((note) => note.id !== current);
            var i = findIndex();
            const noteId = note_list[i]._id;
            deleteNoteByIdAPIMethod(noteId);
            setNote_list(newList);
            if (newList.length === 0) {
                setCurrent('');
            }
            else {
               setCurrent(newList[0].id);
            }
        }
    }
    

    return(
        <div id="root-contatiner">
            {!LoggedIn && <LogIn setLogIn={setLogIn} setNote_list={setNote_list} setProfile={setProfile}/>}
            <Sidebar addNote={addNote} display={display} search={search} showNote={showNote} openModal={() => setShow(true)} 
            sideRef={sideRef} searchRef={searchRef} profile={profile}/>
            <Main showNote={showNote} note_list={note_list} deleteNote={deleteNote} current={current} tags={tags}
            handleAddition={handleAddition} handleDelete={handleDelete} handleDrag={handleDrag} textChange={textChange}
            back={back} mainRef={mainRef}/>
            {show && <Modal profile={profile} saveProfile={saveProfile} closeModal={() => setShow(false)}/>}
        </div>
    );
}

export default App