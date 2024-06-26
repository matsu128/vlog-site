import prisma from '../../src/lib/prisma';


// ユーザーの投稿を取得する関数
export async function getUserPosts(userId) {
  try {
    // userIdに紐づくユーザーの投稿を取得する
    const posts = await prisma.post.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc', // 必要に応じて投稿の並び替えを設定する
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Failed to fetch user posts');
  }
}

// 全ての投稿を取得する関数
export async function getAllPosts() {
  try {
    // 全ての投稿を取得する
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: 'desc', // 必要に応じて投稿の並び替えを設定する
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw new Error('Failed to fetch all posts');
  }
}

// Prismaの接続を閉じる関数
export async function disconnect() {
  await prisma.$disconnect();
}
