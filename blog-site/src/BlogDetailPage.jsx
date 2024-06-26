import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BlogDetailPage = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleEdit = () => {
    sessionStorage.setItem('selectedPost', JSON.stringify(post));
    router.push('/blogform');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {post ? (
        <div className="max-w-2xl w-full p-4 bg-white shadow-md rounded-md">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md" />
          <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
          <p className="mt-2 text-gray-700">{post.text}</p>
          <button
            onClick={handleEdit}
            className="mt-4 bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition duration-300"
          >
            Edit
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetailPage;
