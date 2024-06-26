<<<<<<< HEAD:blog-site/src/components/ImageUploader.jsx
"use client";

=======
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/ImageUploader.jsx
import React from 'react';

const ImageUploader = () => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
  };

  return (
    <input type="file" accept="image/*" onChange={handleImageUpload} />
  );
};

export default ImageUploader;
