
import React, { useState, useEffect } from "react";

const PokemonQuiz = () => {

  // ==========================================
  // 1. STATES
  // ==========================================

  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [options, setOptions] = useState([]);

  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // ==========================================
  // 2. CREATE RANDOM QUESTION
  // ==========================================

  const makeQuestion = (list) => {

    if (list.length < 4) {
      setError("Not enough Pokemon data!");
      return;
    }

    // Random Pokemon Select

    const randomIndex = Math.floor(
      Math.random() * list.length
    );

    const target = list[randomIndex];

    // API URL માંથી Pokemon ID મેળવવો

    const pokemonId = target.url
      .split("/")
      .filter(Boolean)
      .pop();

    // Official Artwork Image URL

    const imageUrl =
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    const correctAns = {
      id: pokemonId,
      name: target.name.toUpperCase(),
      image: imageUrl
    };

    setCurrentPokemon(correctAns);

    // Wrong Options

    const wrongOptions = list
      .filter((pokemon) => pokemon.name !== target.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((pokemon) => pokemon.name.toUpperCase());

    // Correct + Wrong Options

    const choices = [
      correctAns.name,
      ...wrongOptions
    ];

    // Shuffle Options

    const shuffledOptions = [...choices].sort(
      () => Math.random() - 0.5
    );

    setOptions(shuffledOptions);

    setIsRevealed(false);
    setMsg("");
  };

  // ==========================================
  // 3. FETCH POKEMON API
  // ==========================================

  const fetchPokemon = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon data!");
      }

      const data = await response.json();

      setPokemonList(data.results);

      makeQuestion(data.results);

    } catch (error) {

      console.error("Pokemon API Error:", error);

      setError(
        "Pokemon data load failed. Please try again!"
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // 4. USE EFFECT
  // ==========================================

  useEffect(() => {

    fetchPokemon();

  }, []);

  // ==========================================
  // 5. CHECK ANSWER
  // ==========================================

  const handleAnswer = (selectedName) => {

    if (isRevealed || !currentPokemon) return;

    setIsRevealed(true);

    if (selectedName === currentPokemon.name) {

      setScore((prevScore) => prevScore + 1);

      setMsg("🎉 Correct Answer! You Won!");

    } else {

      setMsg(
        `❌ Wrong Answer! This is ${currentPokemon.name}!`
      );

    }
  };

  // ==========================================
  // 6. NEXT QUESTION
  // ==========================================

  const handleNext = () => {

    if (pokemonList.length === 0) return;

    makeQuestion(pokemonList);

  };

  // ==========================================
  // 7. LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial"
      }}>

        <h2>🔄 Pokemon Data Is Loading...</h2>

      </div>

    );

  }

  // ==========================================
  // 8. ERROR SCREEN
  // ==========================================

  if (error) {

    return (

      <div style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial"
      }}>

        <h2>❌ {error}</h2>

        <button
          onClick={fetchPokemon}
          style={{
            padding: "12px 25px",
            backgroundColor: "#3b4cca",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Try Again
        </button>

      </div>

    );

  }

  // ==========================================
  // 9. MAIN UI
  // ==========================================

  return (

    <div style={{
      backgroundColor: "#f3f4f6",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      {/* MAIN GAME CARD */}

      <div style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        padding: "25px",
        textAlign: "center",
        border: "3px solid #ffcb05"
      }}>

        <h2 style={{
          color: "#3b4cca",
          margin: "0 0 10px 0"
        }}>
          Who's That Pokémon?
        </h2>

        {/* SCORE */}

        <div style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#3b4cca",
          display: "inline-block",
          padding: "6px 20px",
          borderRadius: "20px",
          marginBottom: "20px"
        }}>

          Score: {score}

        </div>

        {/* POKEMON IMAGE */}

        {currentPokemon && (

          <div style={{
            height: "200px",
            background: "radial-gradient(circle, #cedbef 0%, #3b4cca 100%)",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            position: "relative"
          }}>

            <img
              src={currentPokemon.image}
              alt="Guess the Pokemon"
              style={{
                height: "160px",
                maxWidth: "90%",
                objectFit: "contain",

                filter: isRevealed
                  ? "none"
                  : "brightness(0) drop-shadow(0 0 6px rgba(255,255,255,0.8))",

                transition: "filter 0.3s ease-in-out"
              }}
            />

          </div>

        )}

        {/* CORRECT / WRONG MESSAGE */}

        {msg && (

          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: msg.includes("🎉")
              ? "#10b981"
              : "#ef4444",
            marginBottom: "15px"
          }}>

            {msg}

          </p>

        )}

        {/* FOUR OPTIONS */}

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "20px"
        }}>

          {options.map((option, index) => (

            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isRevealed}
              style={{

                padding: "12px 10px",

                fontSize: "14px",
                fontWeight: "bold",

                backgroundColor: isRevealed
                  ? (
                      option === currentPokemon.name
                        ? "#10b981"
                        : "#e5e7eb"
                    )
                  : "#ffffff",

                color: isRevealed
                  ? (
                      option === currentPokemon.name
                        ? "#ffffff"
                        : "#9ca3af"
                    )
                  : "#2c3e50",

                border: "2px solid #3b4cca",
                borderRadius: "10px",

                cursor: isRevealed
                  ? "not-allowed"
                  : "pointer"

              }}
            >

              {option}

            </button>

          ))}

        </div>

        {/* NEXT QUESTION BUTTON */}

        {isRevealed && (

          <button
            onClick={handleNext}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ffcb05",
              color: "#3b4cca",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >

            Next Question 🚀

          </button>

        )}

      </div>

    </div>

  );

};

export default PokemonQuiz;
