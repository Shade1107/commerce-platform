import type { Order } from '../types'

const KEY = 'cp:last-order'
export const saveLastOrder = (o: Order) => localStorage.setItem(KEY, JSON.stringify(o))
export const loadLastOrder = (): Order | null => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? 'null') } catch { return null }
}
