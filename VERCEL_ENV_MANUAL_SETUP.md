# 🚀 Vercel Environment Variables - Manuel Kurulum Rehberi

## ✅ Supabase Bilgileri

- **Project URL:** `https://vjxkvzzppbxvkmaxwrhz.supabase.co`
- **Anon Key:** `sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk`
- **Service Role Key:** `sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet`

## 📋 Vercel Dashboard'dan Ekleme (Önerilen)

Vercel CLI ile otomatik ekleme zor olduğu için, **Vercel Dashboard'dan manuel ekleme** önerilir:

### Adımlar:

1. **Vercel Dashboard'a gidin:**
   - https://vercel.com → Projeniz (adora-site)

2. **Settings → Environment Variables**

3. **Aşağıdaki 3 değişkeni ekleyin:**

#### Değişken 1: NEXT_PUBLIC_SUPABASE_URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://vjxkvzzppbxvkmaxwrhz.supabase.co`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)
- **Add** butonuna tıklayın

#### Değişken 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)
- **Add** butonuna tıklayın

#### Değişken 3: SUPABASE_SERVICE_ROLE_KEY
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)
- **Add** butonuna tıklayın

4. **Redeploy Yapın:**
   - **Deployments** sekmesine gidin
   - En son deployment'ın yanındaki **"..."** menüsünden **"Redeploy"** seçin
   - **"Redeploy"** butonuna tıklayın

## ✅ Doğrulama

Redeploy tamamlandıktan sonra:

1. Siteyi ziyaret edin
2. Browser console'u açın (F12)
3. **"Supabase not configured"** uyarısı görünmemeli
4. Login/Register sayfaları çalışmalı
5. Ürünler yüklenmeli

## 🔍 Kontrol

Environment variable'ları ekledikten sonra kontrol etmek için:

```bash
vercel env ls
```

3 değişken görünmelidir.
