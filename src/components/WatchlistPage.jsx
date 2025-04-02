import React from 'react';
import Watchlist from './Watchlist';
import './Watchlist.css';
import GenresButton from './GenresButton';

function WatchlistPage() {
  return (
    <div className="w-screen mt-25">
      <h1 className="text-center">My Watchlist</h1>
      <Watchlist />
      <GenresButton /> 

    </div>
  );
}

export default WatchlistPage;