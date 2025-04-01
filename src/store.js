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

// Funzione per recuperare i generi di film e serie TV
export async function fetchGenres() {
  const response = await fetch('/api/genres'); // Modifica l'endpoint in base alla tua API
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json(); // Assumiamo che restituisca un oggetto con `movies` e `series`
}