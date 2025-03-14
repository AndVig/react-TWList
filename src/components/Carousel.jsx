import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMoviesAndSeries } from '../store';
import './Carousel.css';
import Card from './Card'; 
function Carousel({ type, title }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchMoviesAndSeries();
        const filteredItems = data.filter(item => item.media_type === type);
        setItems(filteredItems);
      } catch (error) {
        console.error('Failed to load items:', error);
      }
    }
    loadItems();
  }, [type]);

  return (

    
    <div className="carousel-container w-screen mt-25">
      <h2 className='text-center'>{title}</h2>
      <div className="carousel">
        {items.map((item) => (
          <div key={item.id} className="carousel-item ">
            {/* <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} /> */}
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Carousel;