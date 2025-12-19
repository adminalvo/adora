# Vercel Environment Variables - Detaylı Kurulum Rehberi

## 🔑 Supabase Anahtarlarınız

Aşağıdaki anahtarları Vercel'de ayarlamanız gerekiyor:

### 1. Vercel Dashboard'a Giriş
1. https://vercel.com adresine gidin
2. Giriş yapın
3. Projenizi seçin: **adora-site**

### 2. Environment Variables Sayfasına Gidin
1. Proje sayfasında **"Settings"** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçeneğine tıklayın

### 3. Environment Variable'ları Ekleyin

Aşağıdaki 3 değişkeni sırayla ekleyin:

#### Değişken 1: NEXT_PUBLIC_SUPABASE_URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://xxxxx.supabase.co` (Supabase Dashboard'dan alın)
- **Environment:** Production, Preview, Development (hepsini seçin)
- **Add** butonuna tıklayın

#### Değişken 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk`
- **Environment:** Production, Preview, Development (hepsini seçin)
- **Add** butonuna tıklayın

#### Değişken 3: SUPABASE_SERVICE_ROLE_KEY
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet`
- **Environment:** Production, Preview, Development (hepsini seçin)
- **Add** butonuna tıklayın

### 4. Supabase URL'sini Bulma

Eğer Supabase URL'nizi bilmiyorsanız:

1. https://supabase.com adresine gidin
2. Projenizi seçin
3. Sol menüden **"Settings"** > **"API"** seçeneğine tıklayın
4. **"Project URL"** kısmındaki URL'yi kopyalayın
   - Format: `https://xxxxx.supabase.co`
   - Bu URL'yi `NEXT_PUBLIC_SUPABASE_URL` olarak ekleyin

### 5. Redeploy Yapın

Environment variable'ları ekledikten sonra **mutlaka redeploy yapmanız gerekir**:

1. **"Deployments"** sekmesine gidin
2. En son deployment'ı bulun
3. Sağ taraftaki **"..."** (üç nokta) menüsüne tıklayın
4. **"Redeploy"** seçeneğini seçin
5. **"Redeploy"** butonuna tıklayın

### 6. Doğrulama

Redeploy tamamlandıktan sonra:

1. Siteyi ziyaret edin
2. Browser console'u açın (F12)
3. **"Supabase not configured"** uyarısı görünmemeli
4. Login/Register sayfaları çalışmalı
5. Ürünler yüklenmeli

## ⚠️ Önemli Notlar

- `NEXT_PUBLIC_` prefix'i **zorunludur** - Bu prefix olmadan client-side'da kullanılamaz
- Environment variable'ları ekledikten sonra **mutlaka redeploy yapın**
- Service Role Key'i **asla** client-side kodunda kullanmayın - sadece server-side için
- Anon Key güvenli bir şekilde client-side'da kullanılabilir

## 🔍 Sorun Giderme

Eğer hala uyarı görüyorsanız:

1. ✅ Variable isimlerinin doğru yazıldığından emin olun
2. ✅ `NEXT_PUBLIC_` prefix'inin olduğundan emin olun
3. ✅ Redeploy yaptığınızdan emin olun
4. ✅ Vercel logs'u kontrol edin (Deployments > Logs)
5. ✅ Browser console'da başka hata var mı kontrol edin

## 📝 Özet

Vercel'de ayarlamanız gereken 3 değişken:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

**Not:** `xxxxx` kısmını Supabase Dashboard'dan alacağınız gerçek URL ile değiştirin.
