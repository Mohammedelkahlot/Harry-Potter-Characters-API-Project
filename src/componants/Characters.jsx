import { useEffect, useState } from "react";

const API = "https://potterapi-fedeperin.vercel.app/en/characters";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(API);
      const data = await response.json();
      setCharacters(data);
    }
    getCharacters();
  }, []);

  function handleSelect(name) {
    const character = characters.find(
      (char) => char.fullName === name
    );
    setSelectedCharacter(character);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Harry Potter Characters-API
        </h1>

        {/* Select Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Choose a character
          </label>
          <select 
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-700 bg-white"
            onChange={(e) => handleSelect(e.target.value)}
            value={selectedCharacter?.fullName || ""}
          >
            <option value="">Select a character...</option>
            {characters.map((character) => (
              <option key={character.id} value={character.fullName}>
                {character.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Character Details */}
        {selectedCharacter && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <div className="md:flex">
              <div className="md:w-1/3 bg-linear-to-br from-purple-100 to-indigo-100 p-8 flex items-center justify-center">
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.nickname}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedCharacter.fullName}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Nickname:</span>
                    <span className="text-gray-800 text-lg">{selectedCharacter.nickname}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Birthdate:</span>
                    <span className="text-gray-800 text-lg">{selectedCharacter.birthdate}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">House:</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${
                      selectedCharacter.hogwartsHouse === 'Gryffindor' ? 'bg-red-500' :
                      selectedCharacter.hogwartsHouse === 'Slytherin' ? 'bg-green-500' :
                      selectedCharacter.hogwartsHouse === 'Ravenclaw' ? 'bg-blue-500' :
                      selectedCharacter.hogwartsHouse === 'Hufflepuff' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      {selectedCharacter.hogwartsHouse}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Characters;