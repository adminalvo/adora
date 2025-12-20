# AI Gateway Entegrasyonu

## ✅ Kurulum Tamamlandı

AI Gateway API key'i projeye entegre edildi.

### Environment Variable

- **Key:** `AI_GATEWAY_API_KEY`
- **Value:** `vck_4bPr4bot3LGTXbwf0Vb7QjJWo4S8ZemJB6LHENxlW0S12MeKpt46sJGc`

### Yerel Geliştirme

`.env.local` dosyanıza ekleyin:

```env
AI_GATEWAY_API_KEY=vck_4bPr4bot3LGTXbwf0Vb7QjJWo4S8ZemJB6LHENxlW0S12MeKpt46sJGc
```

### Vercel

Environment variable Vercel'de ayarlandı:
- ✅ Production
- ✅ Preview
- ✅ Development

## 📚 Kullanım

### AI Gateway Client

`lib/aiGateway.ts` dosyasında AI Gateway client'ı hazır.

### Örnek Kullanımlar

#### 1. Ürün Açıklaması Oluşturma

```typescript
import { generateProductDescription } from '@/lib/aiGateway';

const description = await generateProductDescription('Elbise', 'Giyim');
```

#### 2. Kategori Açıklaması Oluşturma

```typescript
import { generateCategoryDescription } from '@/lib/aiGateway';

const description = await generateCategoryDescription('Giyim');
```

#### 3. Özel AI İsteği

```typescript
import { sendAIGatewayRequest } from '@/lib/aiGateway';

const response = await sendAIGatewayRequest({
  messages: [
    {
      role: 'user',
      content: 'Merhaba, nasılsın?'
    }
  ],
  max_tokens: 100,
  temperature: 0.7
});
```

## 🔧 Admin Panelde Kullanım

Admin panelde ürün eklerken AI ile otomatik açıklama oluşturma özelliği eklenebilir.

## ⚠️ Notlar

- AI Gateway API key'i güvenli tutulmalıdır
- Server-side kullanım için `AI_GATEWAY_API_KEY` environment variable'ı kullanılır
- Client-side'da kullanılmamalıdır (güvenlik için)

## 📝 API Endpoint

Varsayılan endpoint: `https://api.anthropic.com/v1`

Bu endpoint `lib/aiGateway.ts` dosyasında `AI_GATEWAY_BASE_URL` olarak tanımlanmıştır ve gerektiğinde değiştirilebilir.
