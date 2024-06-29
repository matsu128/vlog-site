import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Button from '../components/Button';

const BlogFormPage = () => {
  const [image, setImage] = useState(null); // 画像の状態管理
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 }); // 画像のサイズ管理
  const [title, setTitle] = useState(''); // タイトルの状態管理
  const [content, setContent] = useState(''); // コンテンツの状態管理
  const [titleError, setTitleError] = useState(false); // タイトルのエラー状態管理
  const [contentError, setContentError] = useState(false); // コンテンツのエラー状態管理
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ管理
  const router = useRouter(); // ルーターオブジェクト

  // ページ読み込み時にセッションストレージからデータを読み込む
  useEffect(() => {

    // userIdが存在しない
    if (!parseInt(sessionStorage.getItem('userId'))) {
      router.push('/login'); // userIdがnullならログインページに遷移
      return;
    }

    const storedImage = parseInt(sessionStorage.getItem('image'));
    if (storedImage) {
      setImage(storedImage);
      // 画像のサイズを取得するなどの処理も必要かもしれません
    }

    const storedTitle = sessionStorage.getItem('title');
    if (storedTitle) {
      setTitle(storedTitle);
    }

    const storedContent = sessionStorage.getItem('content');
    if (storedContent) {
      setContent(storedContent);
    }
  }, []); // 空の依存配列を渡すことで、初回のみ実行される

  // 画像アップロード時の処理
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
      setImage(URL.createObjectURL(e.target.files[0]));
      sessionStorage.setItem('image', URL.createObjectURL(e.target.files[0]));
    }
  };

  // 画像削除時の処理
  const handleImageDelete = () => {
    setImage(null);
    setImageSize({ width: 0, height: 0 });
    sessionStorage.removeItem('image');
  };

  // タイトル変更時の処理
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    sessionStorage.setItem('title', e.target.value);
    // タイトルが入力されたらエラーをクリアする
    if (e.target.value.trim() !== '') {
      setTitleError(false);
      setErrorMessage('');
    }
  };

  // コンテンツ変更時の処理
  const handleContentChange = (e) => {
    setContent(e.target.value);
    sessionStorage.setItem('content', e.target.value);
    // コンテンツが入力されたらエラーをクリアする
    if (e.target.value.trim() !== '') {
      setContentError(false);
      setErrorMessage('');
    }
  };

  // フォーム送信時の処理
  const handleSubmit = async () => {
    try {
      // 入力チェック
      if (!title.trim() || !content.trim()) {
        setTitleError(!title.trim());
        setContentError(!content.trim());
        setErrorMessage('You must enter both a title and text');
        return;
      }

      // セッションストレージからuserIdを取得
      const userId = parseInt(sessionStorage.getItem('userId'));

      // post送信を使って投稿する値をbackendに渡す
      const response = await fetch('/api/blogform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image,
          userId,
        }),
      });

      if (response.ok) {
        router.push('/bloglist'); // 成功時にブログリストページへ遷移
      } else {
        console.error('Failed to create post'); // 失敗時のエラーハンドリング
      }
    } catch (error) {
      console.error('Error submitting post:', error); // エラーハンドリング
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* 画像欄 */}
        <div className={`relative w-full border-2 border-dashed border-gray-600 flex items-center justify-center rounded-xl ${image ? '' : 'h-48'}`}
          style={{ height: image ? `${Math.min(imageSize.height, 600)}px` : '12rem' }}>
          {image ? (
            <div className="w-full h-full relative">
              <img src={image} alt="Uploaded" className="w-full h-full object-contain rounded-lg shadow-lg" />
              <button
                className="absolute top-0 right-0 m-2 p-1 bg-gray-800 text-white rounded-full hover:bg-red-600 transition duration-300"
                onClick={handleImageDelete}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
              <span className="absolute text-gray-400">Drag and drop or click to add images</span>
            </>
          )}
        </div>

        {/* タイトル欄 */}
        <div className="w-full mb-4">
          <textarea
            value={title}
            onChange={handleTitleChange}
            placeholder="タイトルを入力"
            className={`w-full h-12 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-black ${titleError ? 'border-red-500' : ''}`}
          />
        </div>

        {/* テキスト欄 */}
        <div className="w-full">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="テキストを入力"
            className={`w-full h-40 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-black ${contentError ? 'border-red-500' : ''}`}
          />
        </div>

        <div className="flex justify-between mt-4">
          {/* 戻るボタン */}
          <Button text="back" onClick={() => router.push('/bloglist')} />

          {/* メッセージ表示領域 */}
          <div className="flex-grow text-center">
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>

          {/* 登録ボタン */}
          <Button text="post" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default BlogFormPage;
