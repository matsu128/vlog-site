import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, viewMode } = req.body;

    try {
      let posts;

      if (viewMode === 'myself') {
        posts = await prisma.post.findMany({
          where: { userId: userId } // ユーザーIDに基づく投稿を取得
        });
      } else if (viewMode === 'everyone') {
        posts = await prisma.post.findMany(); // 全ての投稿を取得
      }

      res.status(200).json({ posts });
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } finally {
      await prisma.$disconnect(); // Prismaの接続を閉じる
    }
  } else {
    res.status(405).end(); // POST以外のメソッドは許可しない
  }
}
