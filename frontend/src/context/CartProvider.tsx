import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProduct } from '../data/products'
import type { CartItem } from '../types'
import { CartContext } from './cart-context'

const KEY = 'cp:cart'
const same = (a: CartItem, b: CartItem) => a.productId === b.productId && a.variant === b.variant

function load(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(items)), [items])

  const value = useMemo(() => ({
    items,
    count: items.reduce((n, i) => n + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + (getProduct(i.productId)?.price ?? 0) * i.quantity, 0),
    add: (productId: string, quantity = 1, variant?: string) =>
      setItems((cur) => {
        const next = { productId, variant, quantity }
        return cur.some((i) => same(i, next))
          ? cur.map((i) => (same(i, next) ? { ...i, quantity: i.quantity + quantity } : i))
          : [...cur, next]
      }),
    setQuantity: (item: CartItem, quantity: number) =>
      setItems((cur) => cur.map((i) => (same(i, item) ? { ...i, quantity: Math.max(1, quantity) } : i))),
    remove: (item: CartItem) => setItems((cur) => cur.filter((i) => !same(i, item))),
    clear: () => setItems([]),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
