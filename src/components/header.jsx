import React from 'react';
import '../App.css';
import reactLogo from '../assets/react.svg';
import Search from './Search';

function Header() {
  return (
    <header className="bg-[#242424] fixed top-0 w-full shadow-md z-50">
      <nav className=" mx-auto flex  items-center justify-between p-4">
        <a href="/" className="flex items-center">
          <img src={reactLogo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-cyan-500">Home</span>
        </a>
        <div className="flex items-center">
          {/* <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border w-50 md:w-11/12 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          /> */}
          <Search />
        </div>
      </nav>
    </header> 
  );
}

export default Header;

