/**
 * AI Gateway Client
 * Handles AI API requests through AI Gateway
 */

// Vercel AI Gateway endpoint
const AI_GATEWAY_BASE_URL = 'https://ai-gateway.vercel.sh/v1';
const AI_GATEWAY_API_KEY = process.env.AI_GATEWAY_API_KEY;

export interface AIGatewayRequest {
  model?: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
}

export interface AIGatewayResponse {
  content: string;
  error?: string;
}

/**
 * Send a request to AI Gateway
 */
export async function sendAIGatewayRequest(
  request: AIGatewayRequest
): Promise<AIGatewayResponse> {
  if (!AI_GATEWAY_API_KEY) {
    throw new Error('AI Gateway API key is not configured');
  }

  try {
    // Vercel AI Gateway endpoint
    const isVercelGateway = AI_GATEWAY_API_KEY?.startsWith('vck_');
    
    let apiUrl: string;
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (isVercelGateway) {
      // Vercel AI Gateway format - uses Anthropic through gateway
      apiUrl = `${AI_GATEWAY_BASE_URL}/anthropic/messages`;
      headers['Authorization'] = `Bearer ${AI_GATEWAY_API_KEY}`;
    } else {
      // Direct Anthropic API
      apiUrl = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = AI_GATEWAY_API_KEY || '';
      headers['anthropic-version'] = '2023-06-01';
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: request.model || 'claude-3-5-sonnet-20241022',
        max_tokens: request.max_tokens || 1024,
        temperature: request.temperature || 0.7,
        messages: request.messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `AI Gateway error: ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Extract content from Claude API response format
    const content = data.content?.[0]?.text || data.content || '';
    
    return { content };
  } catch (error) {
    console.error('AI Gateway request failed:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate product description using AI
 */
export async function generateProductDescription(
  productName: string,
  category?: string
): Promise<string> {
  const prompt = `Generate a professional, attractive product description for a fashion item.
Product Name: ${productName}
${category ? `Category: ${category}` : ''}

Write a concise, marketing-focused description (2-3 sentences) that highlights the product's features and appeal.`;

  const response = await sendAIGatewayRequest({
    messages: [
      {
        role: 'system',
        content:
          'You are a professional fashion copywriter. Write engaging, concise product descriptions.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 200,
    temperature: 0.8,
  });

  return response.content || '';
}

/**
 * Generate category description using AI
 */
export async function generateCategoryDescription(
  categoryName: string
): Promise<string> {
  const prompt = `Generate a professional category description for a fashion e-commerce site.
Category Name: ${categoryName}

Write a brief, appealing description (1-2 sentences) that describes this fashion category.`;

  const response = await sendAIGatewayRequest({
    messages: [
      {
        role: 'system',
        content:
          'You are a professional fashion copywriter. Write engaging category descriptions.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 150,
    temperature: 0.8,
  });

  return response.content || '';
}
