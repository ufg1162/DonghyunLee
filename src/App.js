import React, { useEffect, useRef, useState } from "react";
import Main from "./component/Main";
import Modal from "./component/Modal";
import Sidebar from "./component/Sidebar";
import GetDate from "./component/GetDate";

function App() {
    const [note_list, setNote_list] = useState(() => {
        const local = localStorage.getItem("note_list");
        return local ? JSON.parse(local) : [
            {
                id: "note1",
                text: 'This is a note with a long line of text.',
                date: '3/7/2022, 6:12:47 PM',
                tags: []
            },
            {   
                id: "note0",
                text: 'Sample Note',
                date: '3/7/2022, 5:58:23 PM',
                tags:[]
            }
        ];
    });
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
    
    const [note_num, setNote_num] = useState(2);
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
        setNote_list([...note_list.slice(0, i), {...note_list[i], tags: newTags,}, ...note_list.slice(i + 1)]);
      };
    const handleDelete = (i) => {
        var y = findIndex();
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
        setNote_list([...note_list.slice(0, y), {...note_list[y], tags: newTags,}, ...note_list.slice(y + 1)]);
    };
    const handleDrag = (tag, currPos, newPos) => {
        var i = findIndex();
        const newTags = [...tags].slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        setTags(newTags);
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
    useEffect(() => {localStorage.setItem("note_list", JSON.stringify(note_list))}, [note_list]);
    const addNote = () => {
        const note = {
            text: '',
            date: '',
            id: '',
            tags: []
        }
        note.text = '';
        const date = GetDate();
        note.date = date;
        note.id = "note" + note_num;
        const newList = [note, ...note_list];
        setNote_list(newList);
        setNote_num(note_num + 1);
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
        const newList = note_list.filter((note) => note.id !== current)
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