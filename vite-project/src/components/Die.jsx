/* eslint-disable react/prop-types */
export default function Die(props) {
    return (
        <section 
        onClick={props.handleHold}
        className = {props.isHeld ? "die-true" : "die"}>  
               <p className="die-value">{props.value}</p> 
        </section>
    )
}