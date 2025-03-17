import { apiKey } from './keys.js'; // Importa la chiave API
console.log('API Key:', apiKey); // Aggiungi questo log per verificare la chiave API

const BASE_URL = 'https://api.themoviedb.org/3';

// Funzione per recuperare i film e le serie TV più popolari
export async function fetchMoviesAndSeries() {
  const url = `${BASE_URL}/trending/all/week?api_key=${apiKey}`;
  console.log('Request URL:', url); // Logga l'URL della richiesta
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
  console.log('Request URL:', url); // Logga l'URL della richiesta
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
  console.log('Request URL:', url); // Logga l'URL della richiesta
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search items');
  }
  const data = await response.json();
  return data.results;
}