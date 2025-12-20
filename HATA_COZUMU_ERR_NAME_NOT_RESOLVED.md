# ❌ ERR_NAME_NOT_RESOLVED Hatası - Çözüm

## 🔍 Sorun

`ERR_NAME_NOT_RESOLVED` hatası, Supabase URL'sinin eksik veya yanlış olduğunu gösterir.

## ✅ Çözüm Adımları

### 1. Supabase URL'sini Bulun

1. https://supabase.com → Projeniz
2. **Settings** → **API**
3. **"Project URL"** kısmındaki URL'yi kopyalayın
   - Format: `https://xxxxxxxxxxxxx.supabase.co`

### 2. Vercel'de Environment Variables Ayarlayın

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Aşağıdaki 3 değişkeni ekleyin:

#### Değişken 1: NEXT_PUBLIC_SUPABASE_URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxxxxxxxxxx.supabase.co (Supabase'den aldığınız URL)
Environment: Production, Preview, Development (hepsini seçin)
```

#### Değişken 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk
Environment: Production, Preview, Development (hepsini seçin)
```

#### Değişken 3: SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
Environment: Production, Preview, Development (hepsini seçin)
```

### 3. Redeploy Yapın

**ÇOK ÖNEMLİ:** Environment variable'ları ekledikten sonra mutlaka redeploy yapın:

1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsünden **"Redeploy"** seçin
3. **"Redeploy"** butonuna tıklayın

### 4. Local Development İçin

Eğer local'de çalışıyorsanız, proje root dizininde `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

**Not:** `xxxxxxxxxxxxx` kısmını Supabase Dashboard'dan aldığınız gerçek URL ile değiştirin.

Sonra development server'ı yeniden başlatın:
```bash
npm run dev
```

## 🔍 Doğrulama

1. Browser console'u açın (F12)
2. Network sekmesine gidin
3. Sayfayı yenileyin
4. Supabase isteklerinin başarılı olduğunu kontrol edin (200 status code)
5. Console'da "Supabase not configured" uyarısı görünmemeli

## ⚠️ Yaygın Hatalar

- ❌ URL'nin sonunda `/` olmamalı: `https://xxx.supabase.co/` ❌
- ✅ Doğru format: `https://xxx.supabase.co` ✅
- ❌ `http://` yerine `https://` kullanın
- ❌ `www.` eklemeyin
- ❌ Environment variable'ları ekledikten sonra redeploy yapmayı unutmayın

## 📝 Özet

Bu hata genellikle şu nedenlerden kaynaklanır:
1. ✅ Supabase URL'si Vercel'de ayarlanmamış
2. ✅ Environment variable'ları ekledikten sonra redeploy yapılmamış
3. ✅ URL'de typo var (yanlış yazılmış)

**En önemli adım:** Supabase URL'sini bulup Vercel'de ayarlayın ve redeploy yapın!
