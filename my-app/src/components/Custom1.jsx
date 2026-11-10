import React from 'react'
{/* js called first before ui load issue*/}
const Custom1 = () => {
  console.log("Called From Js")  
  return (
    <div>
      <p>Blog</p>
      { console.log("Called From UI")}
    </div>
  )
}

export default Custom1
