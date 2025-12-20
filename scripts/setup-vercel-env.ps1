# Vercel Environment Variables Setup Script (PowerShell)
# Bu script Vercel'de environment variable'ları ayarlar

Write-Host "🚀 Vercel Environment Variables Ayarlama" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Supabase URL'sini al
$supabaseUrl = Read-Host "Supabase Project URL'yi girin (https://xxx.supabase.co)"

if ([string]::IsNullOrWhiteSpace($supabaseUrl)) {
    Write-Host "❌ Supabase URL boş olamaz!" -ForegroundColor Red
    exit 1
}

# Anon Key
$anonKey = "sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk"

# Service Role Key
$serviceRoleKey = "sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet"

Write-Host ""
Write-Host "📝 Environment variable'ları ekleniyor..." -ForegroundColor Yellow
Write-Host ""

# NEXT_PUBLIC_SUPABASE_URL
Write-Host "1. NEXT_PUBLIC_SUPABASE_URL ekleniyor..." -ForegroundColor Green
$supabaseUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

# NEXT_PUBLIC_SUPABASE_ANON_KEY
Write-Host "2. NEXT_PUBLIC_SUPABASE_ANON_KEY ekleniyor..." -ForegroundColor Green
$anonKey | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

# SUPABASE_SERVICE_ROLE_KEY
Write-Host "3. SUPABASE_SERVICE_ROLE_KEY ekleniyor..." -ForegroundColor Green
$serviceRoleKey | vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development

Write-Host ""
Write-Host "✅ Environment variable'lar başarıyla eklendi!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  ÖNEMLİ: Şimdi redeploy yapın:" -ForegroundColor Yellow
Write-Host "   vercel --prod --yes" -ForegroundColor White
Write-Host ""
