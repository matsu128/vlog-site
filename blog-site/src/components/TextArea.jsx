<<<<<<< HEAD:blog-site/src/components/TextArea.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/TextArea.jsx
import React from 'react';

const TextArea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
