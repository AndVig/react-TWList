import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './LandinPage.jsx';
import Header from './components/header.jsx';
import WatchlistPage from './components/WatchlistPage.jsx';
import { WatchlistProvider } from './WatchlistContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchlistProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  </StrictMode>
);
