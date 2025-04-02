const apiKey = import.meta.env.VITE_API_KEY; // Legge la chiave API dalla variabile di ambiente

const BASE_URL = 'https://api.themoviedb.org/3';

// Funzione per recuperare i film e le serie TV più popolari
export async function fetchMoviesAndSeries() {
  const url = `${BASE_URL}/trending/all/week?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies and series');
  }
  const data = await response.json();
  return data.results;
}

// Funzione per recuperare i dettagli di un film o di una serie TV
export async function fetchCredits(mediaType, id) {
  const url = `${BASE_URL}/${mediaType}/${id}/credits?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch credits');
  }
  const data = await response.json();
  const director = data.crew.find(member => member.job === 'Director');
  const cast = data.cast.slice(0, 3);
  return { director: director ? director.name : 'Unknown', cast };
}

// Funzione per cercare film e serie TV
export async function searchItems(query) {
  const url = `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search items');
  }
  const data = await response.json();
  return data.results;
}

// Funzione per recuperare i generi di film 
export async function fetchMovieGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${apiKey}`;// Modifica l'endpoint in base alla tua API
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json(); // Assumiamo che restituisca un oggetto con `movies` e `series`
}

// Funzione per recuperare i generi di serie TV
export async function fetchSeriesGenres() {
  const url = `${BASE_URL}/genre/tv/list?api_key=${apiKey}`;// Modifica l'endpoint in base alla tua API
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json(); // Assumiamo che restituisca un oggetto con `movies` e `series`
}

export async function fetchMoviesByGenre(genreId) {
  const url = `${BASE_URL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch movies by genre');
  }

  const data = await response.json();
  return data.results || [];
}

export async function fetchSeriesByGenre(genreId) {
  const url = `${BASE_URL}/discover/tv?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch series by genre');
  }

  const data = await response.json();
  return data.results || [];
}