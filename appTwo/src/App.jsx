import React from 'react'
import ReactDom from 'react-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import ChapterIndex from './components/ChapterIndex'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChapterIndex/>
    </>
  )
}

export default App
