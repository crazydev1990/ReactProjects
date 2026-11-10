import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const Custom7 = () => {
  const [data,setData]=useState(0);
  console.log("Inside Js now")
  function increment(){
      let val=data+1;
      setData(val);
      console.log(val);
  }
  useEffect(()=>{
      console.log("Inside UseEffect After UI Render");
  },[]); //dependency array
  return (
    <div>
      { console.log("UI Render First ")}
      <h1>{data}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default Custom7
