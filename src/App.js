import React, { useEffect, useState } from "react";
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
            date: '3/7/2022, 6:12:47 PM',
            tags: []
        },
        {   
            id: "note0",
            text: 'Sample Note',
            date: '3/7/2022, 5:58:23 PM',
            tags:[]
        }
    ]);
    
    const [note_num, setNote_num] = useState(2);
    const [current, setCurrent] = useState('');
    const [tags, setTags] = useState([]);
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
    const textChange = (event) =>{
        var i = findIndex();
        setNote_list([...note_list.slice(0, i), {...note_list[i], text: event.target.value, date: GetDate(),}, ...note_list.slice(i + 1)])
    }

    useEffect(() => {if (current !== '') {showNote(current)}}, [note_list]);
    
    const addNote = () => {
        const note = {
            text: '',
            date: '',
            id: '',
            tags: []
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
        setTags(x.tags);
        setCurrent(x.id);
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
            <Sidebar addNote={addNote} note_list={note_list} showNote={showNote}/>
            <Main showNote={showNote} note_list={note_list} deleteNote={deleteNote} current={current} tags={tags}
            handleAddition={handleAddition} handleDelete={handleDelete} handleDrag={handleDrag} textChange={textChange}
            findIndex={findIndex}/>
            <Modal/>
        </div>
    );
}

export default App