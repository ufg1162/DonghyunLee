import React, { useEffect, useRef, useState } from "react";
import Main from "./Main";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import GetDate from "./GetDate";

function App() {
    const modal = document.getElementById('id01');

    window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        }
    }

    const [note_list, setNote_list] = useState([
        {
            id: "note1",
            text: 'This is a note with a long line of text.',
            date: '3/7/2022, 6:12:47 PM'
        },
        {   
            id: "note0",
            text: 'Sample Note',
            date: '3/7/2022, 5:58:23 PM'
        }
    ]);
    
    const [note_num, setNote_num] = useState(2);
    const [current, setCurrent] = useState('');

    const textRef = useRef();
    useEffect(() => {if (current !== '') {showNote(current)}}, [note_list])
    
    const addNote = () => {
        const note = {
            text: '',
            date: '',
            id: '',
        }
        note.text = '';
        const date = <GetDate/>;
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
        
        setCurrent(x.id);
        var y = note_list.indexOf(x);
        textRef.current.innerHTML = note_list[y].text;
        textRef.current.setAttribute("contenteditable", "true")
     
    }

    const deleteNote = () => {
        const newList = note_list.filter((note) => note.id !== current)
        setNote_list(newList);
        if (newList.length === 0) {
            textRef.current.setAttribute("contenteditable", "false");
            textRef.current.innerHTML = "";
            setCurrent('');
        }
        else {
           setCurrent(newList[0].id);
        }
    }
    

    return(
        <div id="root-contatiner">
            <Sidebar addNote={addNote} note_list={note_list} showNote={showNote}/>
            <Main showNote={showNote} note_list={note_list} deleteNote={deleteNote} textRef={textRef} current={current}/>
            <Modal/>
        </div>
    );
}

export default App