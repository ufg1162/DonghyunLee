function Icons(props) {
    return (
        <span className="material-icons" onClick={props.onClick}>{props.text}</span>
    )
}

export default Icons