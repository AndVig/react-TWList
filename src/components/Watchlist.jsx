import React from 'react';
import { watchlist } from '../watchlist';
import Card from './Card';

function Watchlist() {
  return (
    <div className="watchlist-container">
      <h2 className="text-center">Watchlist</h2>
      <div className="watchlist">
        {watchlist.map((item) => (
          <div key={item.id} className="watchlist-item">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;