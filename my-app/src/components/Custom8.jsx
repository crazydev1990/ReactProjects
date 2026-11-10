import React, { useEffect, useState } from "react";
import Custom9 from "./Custom9";

function Custom8() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Fetch Pokémon list
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        if (!response.ok) throw new Error("Failed to fetch Pokémon list");
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  // Fetch details for clicked Pokémon
  const handlePokemonClick = async (url) => {
      const response = await fetch(url);      
      const data = await response.json();
      let types = [];
      for (let i = 0; i < data.types.length; i++) {
            types.push(data.types[i].type.name); 
      }
      let moves = [];
      for (let i = 0; i < 5; i++) {
          moves.push(data.moves[i].move.name);
      }
      setSelectedPokemon({
        name: data.name,
        image: data.sprites.front_default,
        types,
        moves,
      });
    
  };

  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  return (
    <div className="container">
    <div className="row">
    <div style={{ fontFamily: "Arial", padding: "20px" }} className="col">
      <h1>Pokémon List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pokemonList.map((p, index) => (
          <li
            key={index}
            onClick={() => handlePokemonClick(p.url)}
            style={{
              cursor: "pointer",
              padding: "5px",
              borderBottom: "1px solid #ddd",
              color: "blue",
            }}
          >
            {p.name}
          </li>
        ))}
      </ul>
      </div>
      <div className="col">
         {/* Show details in separate component */}
         <Custom9 pokemon={selectedPokemon} />
      </div>
    </div>
    </div>
  );
}

export default Custom8;