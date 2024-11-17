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
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!shuffledColors.includes(correctColor)) {
      shuffledColors[Math.floor(Math.random() * 3)] = correctColor;
    }
    setTargetColor(correctColor);
    setOptions(shuffledColors);
    setMessage('');
    setShowStickers(false);
  };

  const handleSelect = (color: string) => {
    if (color === targetColor) {
      setMessage('Congratulations Correct!');
      setShowStickers(true);
    } else {
      setMessage('Loser! Try Again.');
    }
  };

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300">
      <h2 className="text-2xl font-bold text-center text-blue-600 bg-blue-100 py-4 px-4  rounded-lg shadow-lg sm:mb-9 ">Play the game and memorize the color codes as you go!</h2>

      <div className='bg-red-100 shadow-lg shadow-black border-yellow-300 border-s-8 border-e-8 p-10'>
        <h2 className='text-center font-mono text-xl opacity-30'>This Code Color Game Developed By Hammad Hafeez</h2>
      <h1 className="text-4xl font-bold mb-6 underline">Color Matching Game for Programmers</h1>
      <div className="text-2xl mb-4">Select the color for code: <span className="font-mono text-white bg-slate-500 rounded-2xl p-2">{targetColor}</span></div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {options.map((color) => (
          <button
            key={color}
            className='h-24 w-24 rounded-xl border-black border'
            style={{ backgroundColor: color }}
            onClick={() => handleSelect(color)}
          />
        ))}
      </div>
      {message && (
        <div className="text-2xl font-bold mb-6 bg-yellow-500 rounded-full p-3">{message}</div>
      )}
      {showStickers && (
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-bounce p-2">🎉</div>
          ))}
        </div>
      )}
      <button
        onClick={generateColors}
        className="mt-8 bg-yellow-500 hover:bg-yellow-300 text-white sm:ml-64 px-4 py-2 duration-300 rounded"
      >
        Play Again
      </button>
      </div>
    </div>
  );
}
