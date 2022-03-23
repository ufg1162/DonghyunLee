function Text({note, textRef}) {
    return (
        <p contentEditable='false' ref={textRef} ></p>
    );
}

export default Text