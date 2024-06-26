import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ArticleItem from './ArticleItem';
import Pagination from './Pagination';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const BlogListPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const [articles, setArticles] = useState([]); // 表示する記事のリスト
  const [viewMode, setViewMode] = useState('myself'); // 表示モード ('myself' か 'everyone')
  const articlesPerPage = 4; // 1ページに表示する記事の数
  const router = useRouter(); // ルーターオブジェクト

  // コンポーネントがマウントされた時またはviewModeが変更された時に記事を取得する
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user')); // セッションストレージからユーザー情報を取得
      const userId = user?.id;

      try {
        const url = new URL('/api/bloglist', window.location.origin); // APIエンドポイントを設定

        const response = await fetch(url.toString(), {
          method: 'POST', // POSTメソッドを使用
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, viewMode }), // リクエストボディにuserIdとviewModeをJSON形式で含める
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.posts); // 取得した記事をセット
      } catch (error) {
        console.error('Error fetching posts:', error); // エラーハンドリング
      }
    };

    fetchData(); // データ取得関数を実行
  }, [viewMode]); // viewModeが変更された時に再度実行

  // 表示する記事のインデックスを計算
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle); // 現在のページに表示する記事のリストを取得
  const totalPages = Math.ceil(articles.length / articlesPerPage); // 総ページ数を計算

  // ページ変更時の処理
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 表示モード変更時の処理
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1); // ページ番号をリセット
  };

  // 記事選択時の処理
  const handleArticleSelect = (article) => {
    sessionStorage.setItem('selectedPost', JSON.stringify(article)); // 選択した記事をセッションストレージに保存
    router.push('/BlogDetailPage'); // 記事詳細ページへ遷移
  };

  // 新規投稿ボタン押下時の処理
  const handleNewPost = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    sessionStorage.setItem('userId', user?.id); // ユーザーIDをセッションストレージに保存
    router.push('/BlogFormPage'); // 新規投稿ページへ遷移
  };

  return (
    <div className="bg-gray-100 md:bg-white min-h-screen">
      {/* ビューの切り替えボタン */}
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
      
      {/* 記事リスト */}
      <div className="flex items-center justify-center h-screen">
        <ArticleItem articles={currentArticles} onSelect={handleArticleSelect} /> {/* 記事選択時の処理を追加 */}
      </div>
      
      {/* ページネーション */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>

      {/* 新規投稿ボタン */}
      <button onClick={handleNewPost} className="absolute bottom-10 right-10 bg-blue-500 text-white py-2 px-4 rounded-full">
        新規投稿
      </button>
    </div>
  );
};

export default BlogListPage;
