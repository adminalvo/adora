const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'az',
    locales: ['az', 'ru', 'en', 'tr'],
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

