import React, { useState, useEffect } from 'react';
import '../App.css';

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async (offset, limit) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      setPokemonData(data.results);
      setTotalPages(Math.ceil(data.count / limit));
      console.log(totalPages);
    };

    fetchData((currentPage - 1) * 9, 9);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pokemon-list-container"> 
      {pokemonData.map((pokemon) => (
        <div key={pokemon.name} className="pokemon-item">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
            alt={pokemon.name}
          />
          <div className="pokemon-details">
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.url.split('/')[6]}</p>
          </div>
        </div>
      ))}
    <div className="pagination">
  {currentPage > 1 && (
    <span className="pagination-button" onClick={() => handlePageChange(currentPage - 1)}>
      &laquo; Previous
    </span>
  )}
  {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, index) =>currentPage + index ).map((pageNumber) => (
    
    <span
      key={pageNumber}
      className={pageNumber === currentPage ? 'active' : ''}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </span>
  ))}
  {currentPage < totalPages-4 && (
    <span className="pagination-button" onClick={() => handlePageChange(currentPage + 1)}>
      Next &raquo;
    </span>
  )}
</div>


    </div>
  );
}

export default PokemonList;
