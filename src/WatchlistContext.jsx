import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (item) => {
    setWatchlist((prev) => {
      if (!prev.some((watchlistItem) => watchlistItem.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromWatchlist = (item) => {
    setWatchlist((prev) =>
      prev.filter((watchlistItem) => watchlistItem.id !== item.id)
    );
  };

  const isInWatchlist = (item) => {
    return watchlist.some((watchlistItem) => watchlistItem.id === item.id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}