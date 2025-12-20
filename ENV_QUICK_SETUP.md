# Hızlı Environment Variable Kurulumu

## Vercel'de Ayarlanacak Değişkenler

Aşağıdaki 3 değişkeni Vercel Dashboard'da **Settings > Environment Variables** bölümüne ekleyin:

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://xxxxx.supabase.co
```
*(Supabase Dashboard > Settings > API > Project URL'den alın)*

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk
```

### 3. SUPABASE_SERVICE_ROLE_KEY
```
sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet
```

## Adımlar

1. Vercel Dashboard → Projeniz → Settings → Environment Variables
2. Her değişkeni tek tek ekleyin
3. Environment: Production, Preview, Development (hepsini seçin)
4. **Redeploy yapın** (Deployments → ... → Redeploy)

## Supabase URL'sini Bulma

1. https://supabase.com → Projeniz
2. Settings → API
3. "Project URL" kısmındaki URL'yi kopyalayın

## Doğrulama

Redeploy sonrası browser console'da (F12) "Supabase not configured" uyarısı görünmemeli.
