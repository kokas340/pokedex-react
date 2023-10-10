import React from 'react'
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { id } = useParams(); 

 
  return (
    <div>
      <h2>Pokemon Details</h2>
      <p>ID: {id}</p>
    </div>
  );
};
export default PokemonDetails