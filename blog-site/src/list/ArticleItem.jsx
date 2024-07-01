import React from 'react';
import { useRouter } from 'next/router';

const ArticleItem = ({ articles, onSelect }) => {
  const router = useRouter();

  const handleArticleClick = (article) => {
    onSelect(article);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  return (
    <section id="skills" className="">
      <div className="flex items-center justify-center h-screen" style={{ width: '100vw' }}>
        <div className="container mx-auto px-10 flex flex-col items-center justify-between py-8" style={{ minHeight: '40vh', maxHeight: '50vh', height: '50%', width: '80%', margin: '0 auto' }}>
          {articles.map((article, index) => (
            <div key={article.id} className={`flex flex-col md:flex-row w-full h-1/4 mb-8 p-6 border-2 border-gray-300 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} onClick={() => handleArticleClick(article)}>
              {index % 2 === 0 ? ( // 偶数列の場合
                <>
                  <div className="md:w-1/2 w-full h-1/2 md:h-full flex items-center order-1">
                      <div className="w-full h-full relative group mx-auto">
                        <img
                          src={article.imageUrl}
                          alt="Article Image"
                          className="w-full h-full object-cover rounded-3xl rounded-lg transform transition duration-500 group-hover:scale-105"
                          style={{ minHeight: '100%', maxHeight: '100%' }}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-500 rounded-lg"></div>
                      </div>
                  </div>
                  <div className="py-6 p-2 md:w-1/2 w-full h-1/2 md:h-full flex items-center order-2">
                    <div className="mx-auto text-center">
                      <h1 className="sm:text-3xl text-2xl font-medium text-gray-900 mb-2">{truncateText(article.title, 7)}</h1>
                      <div className="w-full"><h2>{article.text}</h2></div>
                    </div>
                  </div>
                </>
              ) : ( // 奇数列の場合
                <>
                  <div className="py-6 p-2 md:w-1/2 w-full h-1/2 md:h-full flex items-center order-1">
                    <div className="mx-auto text-center">
                      <h1 className="sm:text-3xl text-2xl font-medium text-gray-900 mb-2">{truncateText(article.title, 7)}</h1>
                      <div className="w-full"><h2>{article.text}</h2></div>
                    </div>
                  </div>
                  <div className="md:w-1/2 w-full h-1/2 md:h-full flex items-center order-2">
                      <div className="w-full h-full relative group mx-auto">
                        <img
                          src={article.imageUrl}
                          alt="Article Image"
                          className="w-full h-full object-cover rounded-3xl rounded-lg transform transition duration-500 group-hover:scale-105"
                          style={{ minHeight: '100%', maxHeight: '100%' }}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-500 rounded-lg"></div>
                      </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArticleItem;
