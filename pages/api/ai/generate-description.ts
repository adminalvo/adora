import type { NextApiRequest, NextApiResponse } from 'next';
import { generateProductDescription, generateCategoryDescription } from '@/lib/aiGateway';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, name, category } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    let description = '';
    
    if (type === 'product') {
      description = await generateProductDescription(name, category);
    } else if (type === 'category') {
      description = await generateCategoryDescription(name);
    } else {
      return res.status(400).json({ error: 'Invalid type. Use "product" or "category"' });
    }

    return res.status(200).json({ description });
  } catch (error) {
    console.error('AI generation error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate description' 
    });
  }
}
