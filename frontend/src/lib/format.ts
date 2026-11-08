const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
export const formatPrice = (n: number) => money.format(n)

export const FREE_DELIVERY_OVER = 75
export const deliveryFee = (subtotal: number) => (subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : 6)

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
