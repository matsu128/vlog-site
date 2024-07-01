import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from './components/Button';

const BlogDetailPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('');
  const router = useRouter();

  useEffect(() => {
    // sessionStorageから情報を取得
    const imageUrl = sessionStorage.getItem('image');
    const selectedTitle = sessionStorage.getItem('title');
    const selectedContent = sessionStorage.getItem('content');
    const selectedViewMode = sessionStorage.getItem('viewMode');

    setImage(imageUrl);
    setTitle(selectedTitle);
    setContent(selectedContent);
    setViewMode(selectedViewMode);
  }, []);

  const handleEdit = () => {
    router.push('/blogform');
  };

  const handleBack = () => {
    router.push('/bloglist');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl space-y-6 my-20">
        <div>
          {/* 画像欄 */}
          <div className="relative w-full border-2 border-dashed border-gray-600 rounded-xl overflow-hidden" style={{ paddingTop: '20%' }}>
            {image && (
              <div className="absolute top-0 left-0 w-full h-30vh">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg shadow-lg" />
              </div>
            )}
          </div>

          {/* タイトル欄 */}
          <div className="w-full mb-4">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>

          {/* テキスト欄 */}
          <div className="w-full">
            <p className="text-base">{content}</p>
          </div>

          <div className="flex justify-between mt-4">
            {/* 戻るボタン */}
            <div onClick={handleBack}>
              <Button text="back" />
            </div>

            {/* 編集ボタン */}
            {viewMode !== 'everyone' && (
              <div onClick={handleEdit}>
                <Button text="edit" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
