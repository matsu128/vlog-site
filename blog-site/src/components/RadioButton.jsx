<<<<<<< HEAD:blog-site/src/components/RadioButton.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/RadioButton.jsx
import React from 'react';

const RadioButton = ({ children, ...props }) => {
  return (
    <label>
      <input type="radio" {...props} />
      {children}
    </label>
  );
};

export default RadioButton;
