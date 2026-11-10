import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doincrement } from './actions/action';
import { dodecrement } from './actions/action';
function App() {
  {/* Manage Seperate States In Components */}
  const [count,setCount]=useState(0);
  const mycount=useSelector((state)=>state.counter);
  console.log(mycount)
  const dispatch=useDispatch();
  return (
    <>
    {/*Seperate Component Based State */}
    <div className="App">
       <h1>Without Redux Counter: {count}</h1>
       <button onClick={()=>setCount(count+1)} style={{background:"green", color:"white",padding:"10px",border:"none",borderRadius:"5px",margin:"5px",wdth:"70px",display:"inline-block"}}>Increment</button>
       <button onClick={()=>setCount(count-1)} style={{background:"red", color:"white",padding:"10px",border:"none",borderRadius:"5px",margin:"5px",wdth:"70px",display:"inline-block"}}>Decrement</button>
    </div>
    {/* Global Shared State*/ }
    <div className="App">
       <h1>With Redux Counter: {mycount}</h1>
       <button onClick={()=>dispatch(doincrement())} style={{background:"green", color:"white",padding:"10px",border:"none",borderRadius:"5px",margin:"5px",wdth:"70px",display:"inline-block"}}>Increment</button>
       <button onClick={()=>dispatch(dodecrement())} style={{background:"red", color:"white",padding:"10px",border:"none",borderRadius:"5px",margin:"5px",wdth:"70px",display:"inline-block"}}>Decrement</button>
    </div>
    </>
  )
}

export default App
