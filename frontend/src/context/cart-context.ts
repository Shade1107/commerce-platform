import { createContext, useContext } from 'react'
import type { CartItem } from '../types'

export interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  add: (productId: string, quantity?: number, variant?: string) => void
  setQuantity: (item: CartItem, quantity: number) => void
  remove: (item: CartItem) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
