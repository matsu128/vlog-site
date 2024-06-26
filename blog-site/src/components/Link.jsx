<<<<<<< HEAD:blog-site/src/components/Link.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/Link.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children }) => {
  return (
    <RouterLink to={to}>
      {children}
    </RouterLink>
  );
};

export default Link;
