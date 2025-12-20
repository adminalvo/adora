# ✅ Vercel Environment Variables Kontrol Listesi

## 🔍 Hızlı Kontrol

Eğer "Supabase not configured" uyarısı görüyorsanız, aşağıdaki adımları takip edin:

## 1. Vercel Dashboard'a Gidin

1. https://vercel.com → Giriş yapın
2. **adora-site** projenizi seçin

## 2. Environment Variables Kontrolü

1. **Settings** sekmesine tıklayın
2. Sol menüden **Environment Variables** seçeneğine tıklayın
3. Aşağıdaki 3 değişkenin **hepsinin** listede olduğundan emin olun:

### ✅ Kontrol Listesi

- [ ] **NEXT_PUBLIC_SUPABASE_URL** 
  - Value: `https://xxxxxxxxxxxxx.supabase.co` (Supabase'den alın)
  - Environment: ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)

- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY**
  - Value: `sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk`
  - Environment: ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)

- [ ] **SUPABASE_SERVICE_ROLE_KEY**
  - Value: `sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet`
  - Environment: ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)

## 3. Supabase URL'sini Bulma

Eğer `NEXT_PUBLIC_SUPABASE_URL` eksikse veya yanlışsa:

1. https://supabase.com → Projeniz
2. **Settings** → **API**
3. **"Project URL"** kısmındaki URL'yi kopyalayın
   - Format: `https://xxxxxxxxxxxxx.supabase.co`
   - **ÖNEMLİ:** Sonunda `/` olmamalı!

## 4. Değişkenleri Ekleme/Güncelleme

### Eğer değişken yoksa:
1. **"Add New"** butonuna tıklayın
2. Name ve Value'yu girin
3. Environment'ları seçin (Production, Preview, Development)
4. **"Save"** butonuna tıklayın

### Eğer değişken varsa ama yanlışsa:
1. Değişkenin yanındaki **"..."** menüsüne tıklayın
2. **"Edit"** seçeneğini seçin
3. Value'yu düzeltin
4. **"Save"** butonuna tıklayın

## 5. ⚠️ ÇOK ÖNEMLİ: Redeploy Yapın

Environment variable'ları ekledikten veya güncelledikten sonra **MUTLAKA** redeploy yapın:

1. **Deployments** sekmesine gidin
2. En son deployment'ı bulun
3. Sağ taraftaki **"..."** (üç nokta) menüsüne tıklayın
4. **"Redeploy"** seçeneğini seçin
5. **"Redeploy"** butonuna tıklayın
6. Deployment'ın tamamlanmasını bekleyin (1-2 dakika)

## 6. Doğrulama

Redeploy tamamlandıktan sonra:

1. Siteyi ziyaret edin
2. Browser console'u açın (F12)
3. **"Supabase not configured"** uyarısı görünmemeli
4. Network sekmesinde Supabase istekleri başarılı olmalı (200 status)

## 🔧 Sorun Giderme

### Hala uyarı görüyorsanız:

1. ✅ Environment variable'ların isimlerinin doğru olduğundan emin olun
   - `NEXT_PUBLIC_SUPABASE_URL` (büyük/küçük harf duyarlı)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. ✅ `NEXT_PUBLIC_` prefix'inin olduğundan emin olun
   - ❌ `SUPABASE_URL` (yanlış)
   - ✅ `NEXT_PUBLIC_SUPABASE_URL` (doğru)

3. ✅ Redeploy yaptığınızdan emin olun
   - Environment variable'ları ekledikten sonra redeploy yapmadan çalışmaz

4. ✅ URL formatını kontrol edin
   - ❌ `https://xxx.supabase.co/` (sonunda `/` olmamalı)
   - ✅ `https://xxx.supabase.co` (doğru)

5. ✅ Vercel logs'u kontrol edin
   - Deployments → En son deployment → Logs
   - Build sırasında hata var mı kontrol edin

## 📝 Özet

**3 değişken + Redeploy = Çözüm!**

1. `NEXT_PUBLIC_SUPABASE_URL` (Supabase Dashboard'dan alın)
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` (zaten verildi)
3. `SUPABASE_SERVICE_ROLE_KEY` (zaten verildi)
4. **Redeploy yapın!**
