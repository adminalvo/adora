/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['az', 'ru', 'en', 'tr'],
    defaultLocale: 'az',
    localeDetection: false,
  },
}

module.exports = nextConfig

