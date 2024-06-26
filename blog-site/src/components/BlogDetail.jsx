<<<<<<< HEAD:blog-site/src/components/BlogDetail.jsx
"use client";

import React from 'react';
=======
import React from 'react';
import Button from './Button';
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/BlogDetail.jsx

const BlogDetail = ({ blog }) => {

  if (!blog || blog.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
<<<<<<< HEAD:blog-site/src/components/BlogDetail.jsx
=======
      <Button>Back</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
>>>>>>> 22f6438 (Set up the foundation for development):frontend/src/components/BlogDetail.jsx
    </div>
  );
};

export default BlogDetail;
