import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-3 bg-gradient-to-r bg-orange-400 bg-orange-400 bg-orange-400 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600"
      style={{
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
      }}
    >
      {text}
    </button>
  );
};

export default Button;
