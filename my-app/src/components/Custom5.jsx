import React from 'react'
import ReactDom from 'react-dom'
import {useState} from 'react'
const Custom5 = () => {
    {/* Without State var */}
    let name="John Doe";
    let count=0
    console.log("Inside JS")
    const [val, setVal] = useState(0); 
    function increment(){
        console.log("Inside Function Call")
        console.log("Button Clicked")
        count=count+1
        console.log("Count is ",count)
    }
    function incrementCount(){
        console.log("Inside Function Call")
        console.log("Button Clicked")
        setVal(val+1);{/* modify with function returned*/}
        console.log("Count is ",val)
    }
  return (
    <div>
        { console.log("Inside UI")}
      <h1>Hello {name} Your score is {count}</h1>
      <button onClick={()=>{increment()}}>Increment Counter Without State</button>
      <h1>Hello {name} Your score is {val}</h1>
      <button onClick={()=>{incrementCount()}}>Increment Counter With State</button>
    </div>
  )
}

export default Custom5
