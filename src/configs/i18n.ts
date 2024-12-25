export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ar', 'hi'],
  langDirection: {
    en: 'ltr',
    fr: 'ltr',
    ar: 'rtl',
    hi: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
