import React from 'react'
import {useState} from 'react'
import Component11 from './Component11'
import Component12 from './Component12'
const sampleData = [
  {
    id: 1,
    title: "Stranger Things",
    year: 2016,
    description: "A group of kids uncover supernatural mysteries in their town.",
    poster: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    title: "Money Heist",
    year: 2017,
    description: "A criminal mastermind leads a daring heist on the Royal Mint.",
    poster: "https://via.placeholder.com/200"
  }
];
const Component10 = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Component11 shows={sampleData} onSelect={setSelected} />
      <Component12 show={selected} />
    </div>
  )
}

export default Component10
