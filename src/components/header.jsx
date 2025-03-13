import React from 'react';
import '../App.css';
import reactLogo from '../assets/react.svg';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#movies">Movies</a></li>
        </ul>
        <div className="logo">
          <img src={reactLogo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#series">Series</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

