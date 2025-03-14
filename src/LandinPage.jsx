import { useState,useEffect } from 'react'
import { fetchMoviesAndSeries } from './store';
import './App.css'

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([])

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchMoviesAndSeries();
        const movies = data.filter(item => item.media_type === 'movie');
        const series = data.filter(item => item.media_type === 'tv');
        setMovies(movies);
        setSeries(series);
      } catch (error) {
        console.error('Failed to load items:', error);
      }
    }
    loadItems();
  }, []);

  return (
    <div className="container w-screen">
      <h2>Movies</h2>
      <div className="carousel w-screen">
        {movies.map((item) => (
          <div key={item.id} className="carousel-item">
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
            <h3>{item.title || item.name}</h3>
          </div>
        ))}
      </div>
      <h2>Series</h2>
      <div className="carousel">
        {series.map((item) => (
          <div key={item.id} className="carousel-item">
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
            <h3>{item.title || item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage
