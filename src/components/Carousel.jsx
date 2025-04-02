import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMoviesAndSeries } from '../store';
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
    <div className="mb-5">
      <h2 className="text-center text-2xl font-bold mb-4">- New {title} -</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-60 md:w-72 lg:w-80"
          >
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