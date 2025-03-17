let watchlist = [];

export function getWatchlist() {
  return watchlist;
}

export function addToWatchlist(item) {
  if (!watchlist.some(watchlistItem => watchlistItem.id === item.id)) {
    watchlist.push(item);
  }
}

export function removeFromWatchlist(item) {
  watchlist = watchlist.filter(watchlistItem => watchlistItem.id !== item.id);
}

export function isInWatchlist(item) {
  return watchlist.some(watchlistItem => watchlistItem.id === item.id);
}