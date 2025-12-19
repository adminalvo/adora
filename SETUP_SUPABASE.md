# Supabase Kurulum Rehberi

## 🔑 Service Role Key Entegrasyonu

Service role key'iniz projeye entegre edilmiştir. Bu key **sadece server-side** işlemler için kullanılmalıdır ve **asla client-side'da kullanılmamalıdır**.

## 📝 Environment Variables

`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

⚠️ **ÖNEMLİ**: `.env.local` dosyası `.gitignore`'da olduğu için Git'e commit edilmeyecektir.

## 🗄️ Database Schema Kurulumu

Supabase, güvenlik nedeniyle REST API üzerinden direkt SQL çalıştırmaya izin vermez. SQL dosyalarını manuel olarak çalıştırmanız gerekmektedir.

### Yöntem 1: Supabase SQL Editor (Önerilen)

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Projenizi seçin
3. Sol menüden **SQL Editor**'ü açın
4. Aşağıdaki sırayla SQL dosyalarını çalıştırın:

#### Adım 1: Schema.sql
`sql/schema.sql` dosyasının içeriğini kopyalayıp SQL Editor'e yapıştırın ve **RUN** butonuna tıklayın.

#### Adım 2: Functions.sql
`sql/functions.sql` dosyasının içeriğini kopyalayıp SQL Editor'e yapıştırın ve **RUN** butonuna tıklayın.

#### Adım 3: Seed.sql (İsteğe Bağlı)
`sql/seed.sql` dosyasının içeriğini kopyalayıp SQL Editor'e yapıştırın ve **RUN** butonuna tıklayın.

### Yöntem 2: Supabase CLI

Eğer Supabase CLI kuruluysa:

```bash
# Supabase CLI kurulumu
npm install -g supabase

# Projeyi bağla
supabase link --project-ref your-project-ref

# SQL dosyalarını çalıştır
supabase db push
```

### Yöntem 3: Script Kullanımı

SQL dosyalarını görüntülemek için:

```bash
npm run db:setup
```

Bu komut SQL dosyalarının içeriğini konsola yazdırır, böylece Supabase SQL Editor'e kolayca kopyalayabilirsiniz.

## ✅ Kurulum Kontrolü

SQL dosyalarını çalıştırdıktan sonra:

1. Supabase Dashboard > **Table Editor**'a gidin
2. Aşağıdaki tabloların oluşturulduğunu kontrol edin:
   - ✅ `users`
   - ✅ `categories`
   - ✅ `products`
   - ✅ `cart_items`
   - ✅ `favorites`
   - ✅ `orders`
   - ✅ `order_items`

3. **Authentication** > **Policies** bölümünden RLS politikalarının aktif olduğunu kontrol edin

## 🔒 Güvenlik Notları

- ✅ Service role key **sadece** server-side kodda kullanılmalıdır
- ✅ Service role key **asla** client-side'a expose edilmemelidir
- ✅ Service role key RLS'yi bypass eder, dikkatli kullanın
- ✅ Production'da environment variables'ları Vercel dashboard'dan ekleyin

## 🚀 Vercel Deployment

Vercel'e deploy ederken:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (sadece server-side için)

## 📚 Kullanım Örnekleri

### Client-side (Anon Key)
```typescript
import { supabase } from '@/lib/supabase';

// Public data access
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true);
```

### Server-side (Service Role Key)
```typescript
import { createAdminClient } from '@/lib/supabaseAdmin';

// Admin operations (bypasses RLS)
const adminClient = createAdminClient();
const { data } = await adminClient
  .from('users')
  .select('*');
```

## 🆘 Sorun Giderme

### SQL çalıştırma hatası
- SQL dosyalarını sırayla çalıştırdığınızdan emin olun
- Her SQL dosyasını ayrı ayrı çalıştırın
- Hata mesajlarını kontrol edin

### RLS politikaları çalışmıyor
- `sql/schema.sql` dosyasının tamamını çalıştırdığınızdan emin olun
- Supabase Dashboard > Authentication > Policies'den kontrol edin

### Service role key çalışmıyor
- `.env.local` dosyasında doğru key'in olduğundan emin olun
- Server-side kodda kullandığınızdan emin olun
- Vercel'de environment variables'ları kontrol edin
