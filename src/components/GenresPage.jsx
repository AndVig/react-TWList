import React, { useState, useEffect } from 'react';
import { fetchMovieGenres, fetchSeriesGenres } from '../store';
import { Link } from 'react-router-dom';

function GenresPage() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        // Recupera i generi dei film
        const movieData = await fetchMovieGenres();
        setMovieGenres(movieData.genres || []); // Assicura che `genres` sia un array

        // Recupera i generi delle serie TV
        const seriesData = await fetchSeriesGenres();
        setSeriesGenres(seriesData.genres || []); // Assicura che `genres` sia un array
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    }
    loadGenres();
  }, []);

  return (
    <div className="genres-page container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Genres</h1>

      {/* Generi dei film */}
      <div className="genres-section mb-10">
        <h2 className="text-xl font-semibold mb-3">Movie Genres</h2>
        <ul className="list-disc pl-5">
          {movieGenres.map((genre) => (
            <li key={genre.id} className="text-gray-800">
              <Link to={`/movies/genre/${genre.id}`} className="text-cyan-500 hover:underline">
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Generi delle serie TV */}
      <div className="genres-section">
        <h2 className="text-xl font-semibold mb-3">Series Genres</h2>
        <ul className="list-disc pl-5">
          {seriesGenres.map((genre) => (
            <li key={genre.id} className="text-gray-800">
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