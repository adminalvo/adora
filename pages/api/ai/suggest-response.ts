import type { NextApiRequest, NextApiResponse } from 'next';
import { sendAIGatewayRequest } from '@/lib/aiGateway';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerMessage } = req.body;

    if (!customerMessage) {
      return res.status(400).json({ error: 'Customer message is required' });
    }

    const systemPrompt = `Sen bir moda e-ticaret sitesinin müşteri hizmetleri temsilcisisin. 
Müşteri mesajlarına profesyonel, nazik ve yardımcı yanıtlar öner. 
Yanıtlar kısa, net ve çözüm odaklı olsun.`;

    const response = await sendAIGatewayRequest({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Müşteri mesajı: "${customerMessage}"\n\nBu mesaja profesyonel bir yanıt öner. Yanıt kısa ve çözüm odaklı olsun.`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    if (response.error) {
      return res.status(500).json({ error: response.error });
    }

    return res.status(200).json({ suggestedResponse: response.content });
  } catch (error) {
    console.error('Response suggestion error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate response suggestion' 
    });
  }
}
