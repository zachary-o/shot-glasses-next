import { getShotGlassById } from '@/queries/getShotGlassById';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const item = await getShotGlassById(id);
  if (!item) return res.status(404).end();
  res.json(item);
}
