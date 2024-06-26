<<<<<<< HEAD:blog-site/src/components/Checkbox.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/Checkbox.jsx
import React from 'react';

const Checkbox = ({ children, ...props }) => {
  return (
    <label>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );
};

export default Checkbox;
