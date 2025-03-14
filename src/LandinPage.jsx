import { useState, useEffect } from "react";
import { fetchMoviesAndSeries } from "./store";
import "./App.css";
import Carousel from "./components/Carousel.jsx";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchMoviesAndSeries();
        const movies = data.filter((item) => item.media_type === "movie");
        const series = data.filter((item) => item.media_type === "tv");
        setMovies(movies);
        setSeries(series);
      } catch (error) {
        console.error("Failed to load items:", error);
      }
    }
    loadItems();
  }, []);

  return (
    <div className="container w-screen">
      <Carousel type="movie" title="Movies" />
      <Carousel type="tv" title="Series" />
    </div>
  );
}

export default LandingPage;
