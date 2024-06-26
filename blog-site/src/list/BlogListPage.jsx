import React, { useState, useEffect } from 'react';
import ArticleItem from './ArticleItem';
import Pagination from './Pagination';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const BlogListPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // ページ番号
  const [articles, setArticles] = useState([]);
  const [viewMode, setViewMode] = useState('myself'); // 'myself' or 'everyone'
  const articlesPerPage = 4; // 1ページに表示する記事の数

  // コンポーネントがマウントされる or viewModeが変更された時
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user')); // セッションストレージからユーザー情報を取得
      const userId = user?.id;

      try {
        const url = new URL('/api/bloglist', window.location.origin);

        const response = await fetch(url.toString(), {
          method: 'POST', // POSTメソッドを使用
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, viewMode }), // ボディにuserIdとviewModeをJSON形式で含める
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

       // responseをarticlesにset
        const data = await response.json();
        setArticles(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [viewMode]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // myselfかeveryoneを押下時に表示切り替え
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1); // ページをリセット
  };

  return (
    <div className="bg-gray-100 md:bg-white min-h-screen">
      <div className="absolute top-20 left-0 right-0 z-10 flex justify-end space-x-4 px-4">
        <PersonIcon className="text-orange-400 self-center" />
        <button
          className={`bg-transparent text-orange-700 border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 relative overflow-hidden ${viewMode === 'myself' ? 'font-bold' : ''}`}
          onClick={() => handleViewModeChange('myself')}
        >
          <span className="relative z-10">myself</span>
        </button>
        <PeopleAltIcon className="text-green-600 self-center" />
        <button
          className={`bg-transparent text-green-800 border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 relative overflow-hidden ${viewMode === 'everyone' ? 'font-bold' : ''}`}
          onClick={() => handleViewModeChange('everyone')}
        >
          <span className="relative z-10">everyone</span>
        </button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <ArticleItem articles={currentArticles} /> {/* ArticleItemコンポーネントに記事リストを渡す */}
      </div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default BlogListPage;
