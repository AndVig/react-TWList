import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCredits } from '../store';
import './Card.css';

function Card({ item }) {
  const [flipped, setFlipped] = useState(false);
  const [credits, setCredits] = useState({ director: '', cast: [] });

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

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-front">
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="card-image" />
        <div className="card-title">{item.title || item.name}</div>
      </div>
      <div className="card-back">
        <div className="card-info">
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