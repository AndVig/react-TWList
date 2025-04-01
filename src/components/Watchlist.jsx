import React from 'react';
import { useWatchlist } from '../WatchlistContext';
import Card from './Card';

function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div >
      <div className="watchlist justify-center">
        {watchlist.map((item) => (
          <div key={item.id} >
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;