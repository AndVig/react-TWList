import React, { useState, useEffect } from 'react';
import { fetchGenres } from '../store'; // Assicurati di avere una funzione per ottenere i generi
import { Link } from 'react-router-dom';

function GenresPage() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres(); // Supponiamo che questa funzione restituisca i generi
        setMovieGenres(data.movies);
        setSeriesGenres(data.series);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    }
    loadGenres();
  }, []);

  return (
    <div className="genres-page container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Genres</h1>
      <div className="genres-section">
        <h2 className="text-xl font-semibold mb-3">Movie Genres</h2>
        <ul className="list-disc pl-5">
          {movieGenres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/movies/genre/${genre.id}`} className="text-cyan-500 hover:underline">
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="genres-section mt-5">
        <h2 className="text-xl font-semibold mb-3">Series Genres</h2>
        <ul className="list-disc pl-5">
          {seriesGenres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/series/genre/${genre.id}`} className="text-cyan-500 hover:underline">
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GenresPage;