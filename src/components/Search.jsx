import React, { useState, useEffect } from 'react';
import { searchItems } from '../store';
import './Search.css';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="search-container relative">
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="search-input w-full px-4 py-2 border rounded-md"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </form>
      {query.length > 0 && (
        <div className="search-results mt-4">
          {results.map((item) => (
            <div key={item.id} className="search-result-item">
              <Card item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;