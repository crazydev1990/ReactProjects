import img from '../assets/rr1.jpg'
import React from 'react'
import style from './Home.module.css'
//import './Home.css';{/* Importing CSS file  issue with tagname applies css to each component*/}
const Home=()=>{
    {/* Home Component */}
    return(
        <div>
            <h1>Home1</h1>
            <p className={style.p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            <img src="./rr1.png" alt="Random Image"/>{/* Load image from public*/}
            {/* Load img from src/assets */}
            <img src={img} alt="Random Image"/>
        </div>
    )
}
export default Home;