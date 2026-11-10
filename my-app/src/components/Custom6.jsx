import React from 'react'; 
import { useState } from 'react';

let count = 0; 
let count1 = 0; 

const Custom6 = () => {
    let name = "John Doe";
    console.log("Inside JS");
    const [val, setVal] = useState(0); 

    function increment(){
        console.log("Inside Function Call");
        console.log("Button Clicked");
        count = count + 1; 
        console.log("Count is ", count);
    }

    function incrementCount(){
        console.log("Inside Function Call");
        console.log("Button Clicked");
        count1 = val + 1; 
        setVal(count1);   
        console.log("Count is (In Console)", count1); 
    }

    return (
        <div>
            {console.log("Inside UI")}
            <h1>Hello {name} Your score is {count}</h1>
            <button onClick={() => { increment() }}>Increment Counter Without State</button>
            <h1>Hello {name} Your score is {count1}</h1> 
            <button onClick={() => { incrementCount() }}>Increment Counter With State</button>
        </div>
    );
};
export default Custom6;
