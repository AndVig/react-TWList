import React from 'react';
import { useNavigate } from 'react-router-dom';

function GenresButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/genres')}
      className="relative flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300 overflow-hidden group"
    >
      {/* Effetto di sfumatura animata */}
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></span>
      <span className="relative flex items-center">
        <span className="mr-2">Explore Genres</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
      {/* Effetto al clic */}
      <span className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 transition duration-300"></span>
    </button>
  );
}

export default GenresButton;