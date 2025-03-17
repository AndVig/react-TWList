import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCredits } from '../store';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../watchlistManager';
import './Card.css';

function Card({ item }) {
  const [flipped, setFlipped] = useState(false);
  const [credits, setCredits] = useState({ director: '', cast: [] });
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist(item));

  useEffect(() => {
    async function loadCredits() {
      try {
        const data = await fetchCredits(item.media_type, item.id);
        setCredits(data);
      } catch (error) {
        console.error('Failed to load credits:', error);
      }
    }
    loadCredits();
  }, [item]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(item);
    } else {
      addToWatchlist(item);
    }
    setInWatchlist(!inWatchlist);
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-front">
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="card-image" />
        <button className="watchlist-button" onClick={(e) => { e.stopPropagation(); handleWatchlistToggle(); }}>
          {inWatchlist ? '-' : '+'}
        </button>
      </div>
      <div className="card-back">
        <div className="card-info">
          <div className="card-title">{item.title || item.name}</div>
          <h3>Director: {credits.director}</h3>
          <h4>Cast:</h4>
          <ul>
            {credits.cast.map(actor => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;