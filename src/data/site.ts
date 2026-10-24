/** Global brand settings. Replace placeholders once the business confirms them. */
export const site = {
  name: 'ERA Beauty',
  tagline: 'Beauty Institute',
  /** Currency symbol used for every price on the site. */
  currency: '€',
  /** When true, a visible note marks prices as placeholders. */
  pricesArePlaceholders: true,
} as const

export const formatPrice = (amount: number) => `${site.currency}${amount}`
