import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPokemonData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pokemonData.name}</h2>
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
      />
      <h3>Abilities:</h3>
      <ul>
        {pokemonData.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h3>Types:</h3>
      <ul>
        {pokemonData.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <h3>Stats:</h3>
      <ul>
        {pokemonData.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h3>Moves:</h3>
      <ul>
        {pokemonData.moves.slice(0, 5).map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
