# 🚀 Vercel Environment Variables Otomatik Ayarlama

## ⚠️ ÖNEMLİ: Supabase URL'si Gerekli

Vercel'de environment variable'ları ayarlamak için **Supabase URL'sine** ihtiyacımız var.

## 📝 Supabase URL'sini Bulma

1. https://supabase.com → Projeniz
2. **Settings** → **API**
3. **"Project URL"** kısmındaki URL'yi kopyalayın
   - Format: `https://xxxxxxxxxxxxx.supabase.co`

## 🔧 Vercel CLI ile Environment Variables Ekleme

Aşağıdaki komutları çalıştırın (Supabase URL'sini aldıktan sonra):

```bash
# 1. NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

# 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

# 3. SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development
```

Her komut çalıştırıldığında value'yu girmeniz istenecek.

## 📋 Manuel Ayarlama (Vercel Dashboard)

1. https://vercel.com → Projeniz (adora-site)
2. **Settings** → **Environment Variables**
3. Aşağıdaki 3 değişkeni ekleyin:

### Değişken 1: NEXT_PUBLIC_SUPABASE_URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://xxxxxxxxxxxxx.supabase.co` (Supabase'den alın)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

### Değişken 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

### Değişken 3: SUPABASE_SERVICE_ROLE_KEY
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

## ⚠️ Redeploy

Environment variable'ları ekledikten sonra **MUTLAKA** redeploy yapın:
1. **Deployments** → En son deployment → "..." → **Redeploy**
