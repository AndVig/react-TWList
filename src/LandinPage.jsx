
import "./App.css";
import Carousel from "./components/Carousel.jsx";

function LandingPage() {
  



  return (
    <div className="container w-screen mt-25">
      <Carousel type="movie" title="Movies" />
      <Carousel type="tv" title="Series" />
    </div>
  );
}

export default LandingPage;
