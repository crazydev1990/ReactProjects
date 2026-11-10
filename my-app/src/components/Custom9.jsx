import React from "react";

function Custom9(props) {
  const { pokemon } = props;
  if (!pokemon) {
    return <p>Click a Pokémon to see details.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{ width: "150px", height: "150px" }}
      />
      <p>
        <strong>Type:</strong> {pokemon.types.join(", ")}
      </p>
      <p>
        <strong>Best Moves:</strong> {pokemon.moves.join(", ")}
      </p>
    </div>
  );
}

export default Custom9;