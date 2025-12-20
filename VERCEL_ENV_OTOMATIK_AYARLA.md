# 🚀 Vercel Environment Variables Otomatik Ayarlama

## ⚡ Hızlı Kurulum

### Windows (PowerShell)

```powershell
.\scripts\setup-vercel-env.ps1
```

### Linux/Mac (Bash)

```bash
chmod +x scripts/setup-vercel-env.sh
./scripts/setup-vercel-env.sh
```

## 📋 Manuel Kurulum

### 1. Supabase URL'sini Bulun

1. https://supabase.com → Projeniz
2. **Settings** → **API**
3. **"Project URL"** kısmındaki URL'yi kopyalayın
   - Format: `https://xxxxxxxxxxxxx.supabase.co`

### 2. Vercel CLI ile Ekleme

Aşağıdaki komutları sırayla çalıştırın (her komut çalıştığında value'yu girmeniz istenecek):

```bash
# 1. NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
# Value: https://xxxxxxxxxxxxx.supabase.co (Supabase'den aldığınız URL)

# 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
# Value: sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk

# 3. SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development
# Value: sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

### 3. Vercel Dashboard ile Ekleme

1. https://vercel.com → Projeniz (adora-site)
2. **Settings** → **Environment Variables**
3. Aşağıdaki 3 değişkeni ekleyin:

#### Değişken 1: NEXT_PUBLIC_SUPABASE_URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://xxxxxxxxxxxxx.supabase.co` (Supabase'den alın)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

#### Değişken 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

#### Değişken 3: SUPABASE_SERVICE_ROLE_KEY
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

## ⚠️ Redeploy Yapın

Environment variable'ları ekledikten sonra **MUTLAKA** redeploy yapın:

```bash
vercel --prod --yes
```

Veya Vercel Dashboard'dan:
1. **Deployments** → En son deployment → "..." → **Redeploy**

## ✅ Doğrulama

Redeploy sonrası:
1. Siteyi ziyaret edin
2. Browser console'u açın (F12)
3. "Supabase not configured" uyarısı görünmemeli
4. Login/Register sayfaları çalışmalı
