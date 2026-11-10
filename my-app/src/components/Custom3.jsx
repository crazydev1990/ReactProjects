import React from 'react'
import Custom4 from '../components/Custom4'
const Custom3 = (props) => {
    {/*Prop Drilling */}
  return (
    <div style={{ padding: '20px', margin: '10px 0', border: '2px solid blue' }}>
      <p>Inside Parent Component</p>
      <Custom4 username={props.username}/>
    </div>
  )
}

export default Custom3
