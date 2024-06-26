import prisma from '../../src/lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // 新規記事作成
      const { title, text, image, userId } = req.body;
      try {
        const post = await prisma.post.create({
          data: {
            title,
            text,
            image,
            user_id: userId,
          },
        });
        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
      }
      break;

    case 'PUT':
      // 記事更新
      const { id, ...updateData } = req.body;
      try {
        const post = await prisma.post.update({
          where: { id: parseInt(id, 10) },
          data: updateData,
        });
        res.status(200).json(post);
      } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
