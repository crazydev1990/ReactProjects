import React from 'react'
import { useEffect } from 'react'
const Custom2 = () => {
    useEffect(() => {
      console.log("Function Second")  
    },[])
  return (
    <div>
      <p>Custom2</p>
      {console.log("UI First")}
    </div>
  )
}
export default Custom2
