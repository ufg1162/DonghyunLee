function Tags({ current, tags, handleAddition, handleDelete, handleDrag }) {
    const ReactTags = require('react-tag-input').WithContext;
    const Keys = {ENTER: 13};
    if (current !== '') {
        return <ReactTags tags={tags} autofocus={false} delimiters={[Keys.ENTER]}
        placeholder="Enter a tag" handleAddition={handleAddition} handleDelete={handleDelete} handleDrag={handleDrag}/>
    }
    else {
        return null;
    }
}

export default Tags