import React, { useState, useEffect } from 'react';
import { fetchMovieGenres, fetchSeriesGenres, fetchMoviesByGenre, fetchSeriesByGenre } from '../store';
import { Link } from 'react-router-dom';

function normalizeGenreName(name) {
  return name
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/\s+/g, '-');
}

function GenresPage() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Genere selezionato
  const [movies, setMovies] = useState([]); // Film del genere selezionato
  const [series, setSeries] = useState([]); // Serie TV del genere selezionato
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato della modale
  const [modalType, setModalType] = useState(''); // Tipo di contenuto nella modale (movies o series)

  useEffect(() => {
    async function loadGenres() {
      try {
        const movieData = await fetchMovieGenres();
        setMovieGenres(movieData.genres || []);

        const seriesData = await fetchSeriesGenres();
        setSeriesGenres(seriesData.genres || []);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    }
    loadGenres();
  }, []);

  // Gestisce il click su un genere di film
  const handleMovieGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setModalType('movies');
    try {
      const movies = await fetchMoviesByGenre(genre.id); // Recupera i film del genere selezionato
      setMovies(movies);
      setIsModalOpen(true); // Mostra la modale
    } catch (error) {
      console.error('Failed to fetch movies by genre:', error);
    }
  };

  // Gestisce il click su un genere di serie TV
  const handleSeriesGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setModalType('series');
    try {
      const series = await fetchSeriesByGenre(genre.id); // Recupera le serie TV del genere selezionato
      setSeries(series);
      setIsModalOpen(true); // Mostra la modale
    } catch (error) {
      console.error('Failed to fetch series by genre:', error);
    }
  };

  // Chiude la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGenre(null);
    setMovies([]);
    setSeries([]);
    setModalType('');
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Genres</h1>

      {/* Mosaico per i generi dei film */}
      <div className="w-full mb-10">
        <h2 className="text-xl text-center font-semibold mb-3">Movie Genres</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {movieGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleMovieGenreClick(genre)}
              className="w-40 h-40 md:w-80 md:h-80 bg-cover bg-center text-white flex items-center justify-center rounded-md hover:opacity-80 transition-opacity duration-300"
              style={{
                backgroundImage: `url(/genres/${normalizeGenreName(genre.name)}.jpg)`,
              }}
            >
              <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mosaico per i generi delle serie TV */}
      <div className="genres-section">
        <h2 className="text-xl text-center font-semibold mb-3">Series Genres</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {seriesGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleSeriesGenreClick(genre)}
              className="w-40 h-40 md:w-80 md:h-80 bg-cover bg-center text-white flex items-center justify-center rounded-md hover:opacity-80 transition-opacity duration-300"
              style={{
                backgroundImage: `url(/genres/${normalizeGenreName(genre.name)}.jpg)`,
              }}
            >
              <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full md:w-3/4 md:h-3/4 rounded-lg overflow-y-auto p-5 relative animate-fade-in">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-white text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-5">
              Most Popular {modalType === 'movies' ? 'Movies' : 'Series'} in {selectedGenre?.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(modalType === 'movies' ? movies : series).map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Rating: {item.vote_average}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenresPage;