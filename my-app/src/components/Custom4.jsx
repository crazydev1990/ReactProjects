import React from 'react'

const Custom4 = (props) => {
    {/*Prop Drilling */}
  return (
    <div style={{ padding: '20px', border: '2px solid green' }}>
      <p>Inside Child Component</p>
      <h3><p>Wecome,{props.username}</p></h3>
    </div>
  )
}

export default Custom4
