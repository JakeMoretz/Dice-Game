/* eslint-disable react/prop-types */
export default function Die(props) {
    return (
        <section className = "die">  
               <p className="die-value">{props.value}</p> 
        </section>
    )
}