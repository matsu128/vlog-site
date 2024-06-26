import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BlogFormPage = () => {
  const [post, setPost] = useState({ title: '', text: '', image: '', userId: '' });
  const router = useRouter();

  useEffect(() => {
    const storedPost = sessionStorage.getItem('selectedPost');
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    } else {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        setPost(prev => ({ ...prev, userId: user.id }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: post.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      };
      const response = await fetch(`/api/posts${post.id ? `/${post.id}` : ''}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      router.push('/bloglist');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full p-4 bg-white shadow-md rounded-md">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-md"
          placeholder="Title"
        />
        <textarea
          name="text"
          value={post.text}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-md"
          placeholder="Text"
        />
        <input
          type="text"
          name="image"
          value={post.image}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-md"
          placeholder="Image URL"
        />
        <button
          type="submit"
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition duration-300"
        >
          {post.id ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default BlogFormPage;
