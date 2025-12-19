# 🚀 Hızlı Başlangıç - Supabase Entegrasyonu

## ✅ Yapılan İşlemler

1. ✅ Service role key projeye entegre edildi
2. ✅ Supabase admin client oluşturuldu (`lib/supabaseAdmin.ts`)
3. ✅ SQL dosyaları hazırlandı
4. ✅ SQL görüntüleme scripti oluşturuldu

## 📝 Yapmanız Gerekenler

### 1. Supabase Proje Bilgilerini Ekleme

`.env.local` dosyasını düzenleyin ve Supabase proje bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

**Not:** Supabase URL ve Anon Key'i Supabase Dashboard > Project Settings > API'den alabilirsiniz.

### 2. SQL Dosyalarını Supabase'de Çalıştırma

#### Yöntem 1: Script ile Görüntüleme (Önerilen)

```bash
npm run db:setup
```

Bu komut SQL dosyalarını konsola yazdırır. Sonra:

1. [Supabase Dashboard](https://supabase.com/dashboard) → Projenizi seçin
2. Sol menüden **SQL Editor**'ü açın
3. Script'in gösterdiği SQL içeriklerini kopyalayın
4. Sırayla çalıştırın:
   - **schema.sql** (önce bu)
   - **functions.sql** (sonra bu)
   - **seed.sql** (isteğe bağlı)

#### Yöntem 2: Manuel Dosya Okuma

SQL dosyalarını doğrudan okuyup Supabase SQL Editor'e yapıştırabilirsiniz:
- `sql/schema.sql`
- `sql/functions.sql`
- `sql/seed.sql`

### 3. Kurulum Kontrolü

SQL dosyalarını çalıştırdıktan sonra:

1. Supabase Dashboard > **Table Editor**
2. Şu tabloların oluşturulduğunu kontrol edin:
   - ✅ `users`
   - ✅ `categories`
   - ✅ `products`
   - ✅ `cart_items`
   - ✅ `favorites`
   - ✅ `orders`
   - ✅ `order_items`

## 🔑 Service Role Key Kullanımı

Service role key **sadece server-side** işlemler için kullanılmalıdır:

```typescript
// ✅ Server-side (API routes, server components)
import { createAdminClient } from '@/lib/supabaseAdmin';

const adminClient = createAdminClient();
// RLS'yi bypass eder, admin işlemleri için kullanılır
```

```typescript
// ✅ Client-side (normal kullanıcı işlemleri)
import { supabase } from '@/lib/supabase';

// RLS politikalarına tabidir
const { data } = await supabase.from('products').select('*');
```

## ⚠️ Güvenlik Uyarıları

- ❌ Service role key'i **asla** client-side kodda kullanmayın
- ❌ Service role key'i **asla** Git'e commit etmeyin (`.env.local` zaten `.gitignore`'da)
- ✅ Service role key'i sadece API routes ve server components'te kullanın
- ✅ Production'da Vercel environment variables'a ekleyin

## 🚀 Vercel Deployment

Vercel'e deploy ederken:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 📚 Daha Fazla Bilgi

- Detaylı kurulum: `SETUP_SUPABASE.md`
- Database yapısı: `README_DATABASE.md`
