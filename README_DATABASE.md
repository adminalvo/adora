# Database Setup Guide

## Supabase Kurulumu

### 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. Proje ayarlarından URL ve API Key'leri alın

### 2. Environment Variables

`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema Kurulumu

1. Supabase Dashboard'a gidin
2. SQL Editor'ü açın
3. `sql/schema.sql` dosyasındaki tüm SQL kodunu çalıştırın
4. `sql/seed.sql` dosyasındaki seed verilerini çalıştırın (isteğe bağlı)

### 4. Row Level Security (RLS)

RLS politikaları schema.sql dosyasında tanımlanmıştır. Tüm tablolar için güvenlik politikaları otomatik olarak uygulanır.

## Database Yapısı

### Tablolar

- **users**: Kullanıcı profilleri (Supabase auth.users'ı genişletir)
- **categories**: Ürün kategorileri
- **products**: Ürünler
- **cart_items**: Sepet öğeleri
- **favorites**: Favori ürünler
- **orders**: Siparişler
- **order_items**: Sipariş öğeleri

### İlişkiler

- Products → Categories (Many-to-One)
- Cart Items → Users & Products (Many-to-One)
- Favorites → Users & Products (Many-to-One)
- Orders → Users (Many-to-One)
- Order Items → Orders & Products (Many-to-One)

## API Kullanımı

Supabase client `lib/supabase.ts` dosyasında yapılandırılmıştır. Kullanım örneği:

```typescript
import { supabase } from '@/lib/supabase';

// Ürünleri getir
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true);
```
