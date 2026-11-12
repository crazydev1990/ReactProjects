
import React, { useState } from 'react';

import StudProfile from './components/StudProfile';
import AllStuds from './components/AllStuds';
import PokedexDevice from './components/PokedexDevice';

function App() {
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  return (
    <div>

      {/* Student List / Student Profile */}
      {selectedStudentId === null ? (

        <AllStuds
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
        />

      ) : (

        <StudProfile
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
        />

      )}

      {/* Pokémon Pokedex */}
      <hr style={{ margin: '30px 0' }} />

      <PokedexDevice />

    </div>
  );
}

export default App;
