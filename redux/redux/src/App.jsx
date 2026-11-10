import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './action/userAction'
import './App.css'

function App() {

  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  console.log(count);
  // const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <h1>Redux {count}</h1>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  )
}

export default App
