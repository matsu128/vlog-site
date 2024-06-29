import prisma from '../../src/lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // 新規記事作成
      const { title, content, image, userId } = req.body;
      try {
        const post = await prisma.post.create({
          data: {
            title,
            content,
            imageUrl: image || null,
            author: {
              connect: { id: userId }
            }
          }
        });
        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
      }
      break;

    case 'PUT':
      // 記事更新(idとid以外のデータ)
      const { id, ...updateData } = req.body;
      try {
        const post = await prisma.post.update({
          where: { id: id},
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
