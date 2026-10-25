export const site = {
  name: 'ERA Beauty',
  tagline: 'Beauty Institute',
  currency: '€',
} as const

export const formatPrice = (amount: number) => `${site.currency}${amount}`
