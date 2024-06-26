<<<<<<< HEAD:blog-site/src/components/TextInput.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/TextInput.jsx
import React from 'react';

const TextInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
