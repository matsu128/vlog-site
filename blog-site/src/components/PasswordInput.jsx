<<<<<<< HEAD:blog-site/src/components/PasswordInput.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/PasswordInput.jsx
import React from 'react';

const PasswordInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default PasswordInput;
