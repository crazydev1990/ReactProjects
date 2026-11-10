import React from "react";
import ReactDOM from "react-dom";
import style from "./About.module.css";{/* External CSS */}
const About=()=>{
     return(
        <div>
            <h1 style={{ backgroundColor: "red", color: "white", padding: "10px"}}>About</h1>{/* Inline Style */}
            <p className={style.p1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
    )
}
export default About;