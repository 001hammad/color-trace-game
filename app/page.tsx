'use client'

import { useState, useEffect } from 'react';

const colors = ['#31511E', '#FF5733', '#1E90FF', '#FFD700', '#4CAF50', '#10375C', '#D91656'];

export default function ColorMatchingGame() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  // Generate a new color and options
  const generateColors = () => {
    const correctColor = colors[Math.floor(Math.random() * colors.length)];
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffledColors.includes(correctColor)) {
      shuffledColors[Math.floor(Math.random() * 4)] = correctColor;
    }
    setTargetColor(correctColor);
    setOptions(shuffledColors);
    setMessage('');
    setShowStickers(false);
  };

  const handleSelect = (color: string) => {
    if (color === targetColor) {
      setMessage('Congratulations! Correct!');
      setShowStickers(true);
    } else {
      setMessage('Oops! Try Again.');
    }
  };

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4">
      <h2 className="text-3xl font-semibold text-center text-white bg-opacity-70 py-4 px-6 rounded-lg shadow-xl mb-8 max-w-lg w-full">
        Play and match the color code!
      </h2>

      <div className="bg-white shadow-2xl rounded-3xl border-4 border-indigo-600 p-8 w-full max-w-xl">
        <h2 className="text-center font-mono text-lg opacity-70 mb-4 text-gray-600">A Color Matching Game Created by Hammad Hafeez</h2>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-indigo-700 underline">Color Matching Game for Programmers</h1>
        
        <div className="text-2xl sm:text-3xl mb-6 text-center">
          Select the color for code: 
          <span className="font-mono text-white bg-slate-500 rounded-2xl p-3 ml-2">{targetColor}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {options.map((color) => (
            <button
              key={color}
              className="h-24 sm:h-28 w-24 sm:w-28 rounded-2xl border-4 border-gray-800 shadow-lg transform transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
              onClick={() => handleSelect(color)}
            />
          ))}
        </div>

        {message && (
          <div className="text-2xl font-semibold mb-6 text-center py-3 px-6 bg-yellow-500 rounded-full shadow-xl">
            {message}
          </div>
        )}

        {showStickers && (
          <div className="flex flex-wrap justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-bounce p-2 text-3xl">🎉</div>
            ))}
          </div>
        )}

        <button
          onClick={generateColors}
          className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
