export interface Category { id: string; name: string; description: string }
export interface Variant { name: string; options: string[] }
export interface Product {
  id: string
  name: string
  categoryId: string
  price: number
  description: string
  tone: string
  stock: number
  featured: boolean
  variants: Variant[]
}
export interface CartItem { productId: string; variant?: string; quantity: number }
export interface Order {
  id: string
  placedAt: string
  customer: { name: string; phone: string; email: string; address: string; city: string; note: string }
  lines: { name: string; variant?: string; quantity: number; unitPrice: number }[]
  subtotal: number
  delivery: number
  total: number
}

export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled'
export interface Customer { id: string; name: string; phone: string; email: string; city: string }
export interface AdminOrder {
  id: string
  customerId: string
  placedAt: string
  status: OrderStatus
  lines: { productId: string; quantity: number }[]
}
