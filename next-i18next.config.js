const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'az',
    locales: ['az', 'ru', 'en', 'tr'],
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // Ensure react-i18next is properly initialized
  react: {
    useSuspense: false,
  },
  // Ensure proper initialization
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
}

