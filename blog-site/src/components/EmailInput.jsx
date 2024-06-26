<<<<<<< HEAD:blog-site/src/components/EmailInput.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/EmailInput.jsx
import React from 'react';

const EmailInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="email"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default EmailInput;
