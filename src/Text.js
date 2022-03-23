function Text({ note_list, current, textChange,findIndex }) {
    if(current !== '') {
        var x;
        note_list.map((item) => {
            if (item.id === current) {
                x = item;
             }
        });
        var i = note_list.indexOf(x);
        return(
            <textarea value={note_list[i].text} onChange={textChange}></textarea>
        )
    }
    else {
        return null;
    }
}

export default Text