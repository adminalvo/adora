/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['az', 'ru', 'en', 'tr'],
    defaultLocale: 'az',
    localeDetection: false,
  },
  images: {
    domains: ['images.unsplash.com', 'supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig

