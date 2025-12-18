# Adora Fashion

Adora Fashion - Online kıyafet satış sitesi

## Teknolojiler

- Next.js 14
- TypeScript
- Tailwind CSS
- next-i18next (Çoklu dil desteği)
- Supabase (Database & Authentication)

## Kurulum

```bash
npm install
```

## Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun ve yeni proje oluşturun
2. `.env.local` dosyası oluşturun:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Supabase SQL Editor'de `sql/schema.sql` dosyasını çalıştırın
4. İsteğe bağlı: `sql/seed.sql` dosyasını çalıştırarak örnek kategoriler ekleyin

Detaylı bilgi için `README_DATABASE.md` dosyasına bakın.

## Geliştirme

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Özellikler

- ✅ 4 dil desteği (Azerbaycan, Rus, İngiliz, Türk)
- ✅ Sarı-beyaz tema
- ✅ Preloader
- ✅ Cookie acceptance banner
- ✅ Responsive tasarım
- ✅ Kullanıcı sistemi (Login/Register)
- ✅ Sepet sistemi
- ✅ Favori ürünler
- ✅ Checkout sistemi
- ✅ Supabase database entegrasyonu
- ✅ Gizlilik politikası ve kullanım şartları sayfaları

## Sayfalar

- Ana Sayfa (/)
- Hakkımızda (/about)
- İletişim (/contact)
- Giriş (/login)
- Kayıt (/register)
- Sepet (/cart)
- Favoriler (/favorites)
- Checkout (/checkout)
- Gizlilik Politikası (/privacy)
- Kullanım Şartları (/terms)

