import React from 'react'

const Custom = () => {
    let name='Yash'
    let age=36
    {/*Array */}
    let arr=[10,20,30,40,50]
    {/*Object */}
    let user={
      name:'Yash',
      age:36
    }
  return (
    <div>
      <p>{name} is {age} years old</p>
      <p>{arr[0]}</p>
      <p>{arr.map((ele)=>{
        return ele
      })}</p>
      <p>{user.name} is {user.age} years old</p>
    </div>
  )
}
export default Custom
