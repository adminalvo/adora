#!/bin/bash

# Vercel Environment Variables Setup Script
# Bu script Vercel'de environment variable'ları ayarlar

echo "🚀 Vercel Environment Variables Ayarlama"
echo "========================================"
echo ""

# Supabase URL'sini al
read -p "Supabase Project URL'yi girin (https://xxx.supabase.co): " SUPABASE_URL

if [ -z "$SUPABASE_URL" ]; then
  echo "❌ Supabase URL boş olamaz!"
  exit 1
fi

# Anon Key
ANON_KEY="sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk"

# Service Role Key
SERVICE_ROLE_KEY="sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet"

echo ""
echo "📝 Environment variable'ları ekleniyor..."
echo ""

# NEXT_PUBLIC_SUPABASE_URL
echo "1. NEXT_PUBLIC_SUPABASE_URL ekleniyor..."
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

# NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "2. NEXT_PUBLIC_SUPABASE_ANON_KEY ekleniyor..."
echo "$ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

# SUPABASE_SERVICE_ROLE_KEY
echo "3. SUPABASE_SERVICE_ROLE_KEY ekleniyor..."
echo "$SERVICE_ROLE_KEY" | vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development

echo ""
echo "✅ Environment variable'lar başarıyla eklendi!"
echo ""
echo "⚠️  ÖNEMLİ: Şimdi redeploy yapın:"
echo "   vercel --prod --yes"
echo ""
