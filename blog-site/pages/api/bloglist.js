// pages/api/bloglist.js

import { disconnect } from '../../src/lib/prisma'; // Prismaの接続を閉じる関数をインポート

export default async function handler(req, res) {
  if (req.method === 'POST') { // post送信の場合
    const { userId, viewMode } = req.body;

    try {
      let posts;
      if (viewMode === 'myself') {
        posts = await getUserPosts(userId); // IDが一致するPostテーブルの情報を取得

      } else if (viewMode === 'everyone') {
        posts = await getAllPosts(); // 全ての投稿を取得
      }

      res.status(200).json({ posts });

    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });

    } finally {
      await disconnect(); // Prismaの接続を閉じる
    }
  } else {
    res.status(405).end(); // POST以外のメソッドは許可しない
  }
}
