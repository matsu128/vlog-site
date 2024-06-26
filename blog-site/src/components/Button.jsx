<<<<<<< HEAD:blog-site/src/components/Button.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/Button.jsx
import React from 'react';

const Button = ({ type = 'button', children, ...props }) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
