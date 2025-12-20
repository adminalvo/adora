# Supabase URL'sini Bulma - Hızlı Rehber

## 🔍 Supabase URL'si Nerede?

`ERR_NAME_NOT_RESOLVED` hatası genellikle Supabase URL'sinin eksik veya yanlış olmasından kaynaklanır.

## Adım 1: Supabase Dashboard'a Gidin

1. https://supabase.com adresine gidin
2. Giriş yapın
3. Projenizi seçin

## Adım 2: API Ayarlarına Gidin

1. Sol menüden **"Settings"** (⚙️) seçeneğine tıklayın
2. **"API"** sekmesine tıklayın

## Adım 3: Project URL'yi Kopyalayın

**"Project URL"** kısmında şu formatta bir URL göreceksiniz:

```
https://xxxxxxxxxxxxx.supabase.co
```

Bu URL'yi kopyalayın.

## Adım 4: Vercel'de Ayarlayın

1. Vercel Dashboard → Projeniz → Settings → Environment Variables
2. **NEXT_PUBLIC_SUPABASE_URL** değişkenini ekleyin veya güncelleyin
3. Value olarak kopyaladığınız URL'yi yapıştırın
4. **Redeploy yapın**

## Adım 5: Local Development İçin

Eğer local'de çalışıyorsanız, `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

**Not:** `xxxxxxxxxxxxx` kısmı sizin projenize özel bir string olacak.

## ✅ Doğrulama

URL'yi ekledikten sonra:
1. Browser console'u açın (F12)
2. Network sekmesine gidin
3. Sayfayı yenileyin
4. Supabase isteklerinin başarılı olduğunu kontrol edin (200 status code)

## ⚠️ Yaygın Hatalar

- ❌ URL'nin sonunda `/` olmamalı: `https://xxx.supabase.co/` ❌
- ✅ Doğru format: `https://xxx.supabase.co` ✅
- ❌ `http://` yerine `https://` kullanın
- ❌ `www.` eklemeyin
