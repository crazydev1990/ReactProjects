import React from 'react'

const Component12 = (props) => {
    const {show} = props;
    if (!show) {
    return <div style={{ width: "60%" }}><h2>Select a show to see details</h2></div>;
  }

  return (
    <div style={{ width: "60%" }}>
      <h2>{show.title}</h2>
      <img src={show.poster} alt={show.title} width="200" />
      <p><strong>Year:</strong> {show.year}</p>
      <p><strong>Description:</strong> {show.description}</p>
    </div>
  )
}
export default Component12
