import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Search from './Search';

function Header() {
  return (
    <header className="bg-[#242424] fixed top-0 w-full shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between px-5">
        <Link to="/" className="flex items-center">
        <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <Link to="/watchlist" className="text-xl font-bold text-cyan-500 ml-4">
            Watchlist
          </Link>
          
        </Link>
        <div className="flex items-center">
          <Search />
        </div>
      </nav>
    </header> 
  );
}

export default Header;

