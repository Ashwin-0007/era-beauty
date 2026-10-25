export const site = {
  name: 'ERA Beauty',
  tagline: 'Institut de Beauté',
  currency: '€',
} as const

export const formatPrice = (amount: number) => `${amount} ${site.currency}`
