import React from 'react'

const Component11 = (props) => {
  const {shows, onSelect} = props;
  return (
    <div style={{ width: "40%" }}>
      <h2>All Shows & Movies</h2>
      {shows.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          style={{
            cursor: "pointer",
            marginBottom: "15px",
            padding: "10px",
            border: "1px solid #ccc"
          }}
        >
          <img src={item.poster} alt={item.title} width="120" />
          <h3>{item.title}</h3>
          <p>{item.year}</p>
    </div>
      )
  )
}
</div>
  );
}

export default Component11
