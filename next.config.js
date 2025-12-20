/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    localeDetection: i18n.localeDetection || false,
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

