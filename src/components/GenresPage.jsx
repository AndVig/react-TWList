import React, { useState, useEffect } from 'react';
import { fetchMovieGenres, fetchSeriesGenres } from '../store';
import { Link } from 'react-router-dom';

function normalizeGenreName(name) {
  return name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
}

function GenresPage() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        // Recupera i generi dei film
        const movieData = await fetchMovieGenres();
        setMovieGenres(movieData.genres || []);

        // Recupera i generi delle serie TV
        const seriesData = await fetchSeriesGenres();
        setSeriesGenres(seriesData.genres || []);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    }
    loadGenres();
  }, []);

  return (
    <div className="genres-page container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Genres</h1>

      {/* Mosaico per i generi dei film */}
      <div className="genres-section mb-10">
        <h2 className="text-xl text-center font-semibold mb-3">Movie Genres</h2>
        <div className="flex flex-wrap w-screen justify-center gap-4">
          {movieGenres.map((genre) => (
            <Link
              key={genre.id}
              to={`/movies/genre/${genre.id}`}
              className="w-40 h-40 md:w-80 md:h-80 bg-cover bg-center text-white flex items-center justify-center rounded-md hover:opacity-80 transition-opacity duration-300"
              style={{
                backgroundImage: `url(/genres/${normalizeGenreName(genre.name)}.jpg)`,
              }}
            >
              <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mosaico per i generi delle serie TV */}
      <div className="genres-section">
        <h2 className="text-xl text-center font-semibold mb-3">Series Genres</h2>
        <div className="flex flex-wrap w-screen justify-center gap-4">
          {seriesGenres.map((genre) => (
            <Link
              key={genre.id}
              to={`/series/genre/${genre.id}`}
              className="w-40 h-40 md:w-80 md:h-80 bg-cover bg-center text-white flex items-center justify-center rounded-md hover:opacity-80 transition-opacity duration-300"
              style={{
                backgroundImage: `url(/genres/${normalizeGenreName(genre.name)}.jpg)`,
              }}
            >
              <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenresPage;