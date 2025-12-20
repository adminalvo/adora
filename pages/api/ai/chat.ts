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
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `Sen Adora Fashion adlı bir moda e-ticaret sitesinin müşteri hizmetleri temsilcisisin. 
- Profesyonel, nazik ve yardımcı bir dil kullan
- Ürünler, siparişler, kargo, iade ve değişim konularında bilgi ver
- Site hakkında genel bilgiler paylaş
- Müşterilere yardımcı olmaya odaklan
- Türkçe, Azerbaycan Türkçesi, İngilizce ve Rusça dillerinde yanıt verebilirsin
- Eğer bir soruyu yanıtlayamazsan, müşteriyi iletişim formunu kullanmaya yönlendir`;

    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt,
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: message,
      },
    ];

    const response = await sendAIGatewayRequest({
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    if (response.error) {
      return res.status(500).json({ error: response.error });
    }

    return res.status(200).json({ 
      message: response.content,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: response.content },
      ],
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to process chat message' 
    });
  }
}
