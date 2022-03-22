import image from "./dog.jpg"

function Image(props) {
    return(
        <img className="img" alt="My profile image" onClick={props.click} 
        src={image}></img>
    );
}

export default Image