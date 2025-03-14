import React, { useState, useEffect } from 'react';
import { searchItems } from '../store';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      const fetchResults = async () => {
        try {
          const data = await searchItems(query);
          setResults(data);
        } catch (error) {
          console.error('Failed to search items:', error);
        }
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div >
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search "
          className="search-input"
        />
        {/* <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button> */}
      </form>
      <div className="search-results">
        {results.map((item) => (
          <div key={item.id} className="search-result-item">
            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
            <div>{item.title || item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;