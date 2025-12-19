# Vercel Environment Variables Setup

Bu dosya, Vercel'de Supabase environment variable'larını nasıl ayarlayacağınızı açıklar.

## Adımlar

1. **Vercel Dashboard'a gidin**
   - https://vercel.com adresine gidin
   - Projenizi seçin (adora-site)

2. **Settings'e gidin**
   - Proje sayfasında "Settings" sekmesine tıklayın

3. **Environment Variables bölümüne gidin**
   - Sol menüden "Environment Variables" seçeneğine tıklayın

4. **Aşağıdaki değişkenleri ekleyin:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   **Önemli:** 
   - `NEXT_PUBLIC_` ile başlayan değişkenler client-side'da kullanılabilir
   - `SUPABASE_SERVICE_ROLE_KEY` sadece server-side için kullanılır (admin işlemleri için)

5. **Environment seçimi:**
   - Her değişken için "Production", "Preview", ve "Development" seçeneklerini işaretleyin
   - Veya sadece "Production" seçeneğini işaretleyin

6. **Değişkenleri ekleyin:**
   - "Add" butonuna tıklayarak her değişkeni tek tek ekleyin

7. **Redeploy yapın:**
   - Değişkenleri ekledikten sonra, projenizi yeniden deploy etmeniz gerekir
   - "Deployments" sekmesine gidin
   - En son deployment'ın yanındaki "..." menüsünden "Redeploy" seçeneğini seçin

## Supabase Bilgilerini Nereden Bulabilirim?

1. **Supabase Dashboard'a gidin**
   - https://supabase.com adresine gidin
   - Projenizi seçin

2. **Settings > API bölümüne gidin**
   - Sol menüden "Settings" > "API" seçeneğine tıklayın

3. **Bilgileri kopyalayın:**
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL` için kullanın
   - **anon public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` için kullanın
   - **service_role key**: `SUPABASE_SERVICE_ROLE_KEY` için kullanın (dikkatli olun, bu key çok güçlü!)

## Doğrulama

Deploy işlemi tamamlandıktan sonra:
1. Siteyi ziyaret edin
2. Browser console'u açın (F12)
3. "Missing Supabase environment variables" hatası görünmemeli
4. Login/Register sayfaları çalışmalı

## Sorun Giderme

Eğer hala hata alıyorsanız:
1. Environment variable'ların doğru yazıldığından emin olun (typo yok)
2. `NEXT_PUBLIC_` prefix'inin olduğundan emin olun
3. Redeploy yaptığınızdan emin olun
4. Vercel logs'u kontrol edin (Deployments > Logs)
