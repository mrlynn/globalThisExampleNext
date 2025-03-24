// pages/api/ping.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Default DB from URI
    const serverStatus = await db.command({ ping: 1 });

    res.status(200).json({ ok: true, mongo: serverStatus });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

