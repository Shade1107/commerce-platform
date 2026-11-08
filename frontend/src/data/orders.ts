import { deliveryFee } from '../lib/format'
import type { AdminOrder, OrderStatus } from '../types'
import { getProduct } from './products'

export const orderStatuses: OrderStatus[] = ['pending', 'processing', 'delivered', 'cancelled']

const o = (id: string, customerId: string, placedAt: string, status: OrderStatus, lines: [string, number][]): AdminOrder =>
  ({ id, customerId, placedAt, status, lines: lines.map(([productId, quantity]) => ({ productId, quantity })) })

export const orders: AdminOrder[] = [
  o('CP-10431', 'c1', '2026-11-08', 'pending', [['p1', 1], ['p4', 2]]),
  o('CP-10430', 'c3', '2026-11-08', 'pending', [['p2', 1]]),
  o('CP-10429', 'c5', '2026-11-07', 'processing', [['p8', 2], ['p3', 1]]),
  o('CP-10428', 'c2', '2026-11-07', 'processing', [['p5', 1], ['p7', 2]]),
  o('CP-10427', 'c4', '2026-11-06', 'delivered', [['p2', 1], ['p7', 1]]),
  o('CP-10426', 'c1', '2026-11-05', 'delivered', [['p5', 2]]),
  o('CP-10425', 'c6', '2026-11-05', 'cancelled', [['p6', 2]]),
  o('CP-10424', 'c3', '2026-11-04', 'delivered', [['p1', 1], ['p2', 1]]),
  o('CP-10423', 'c5', '2026-11-03', 'delivered', [['p4', 3]]),
  o('CP-10422', 'c2', '2026-11-03', 'delivered', [['p8', 1]]),
  o('CP-10421', 'c4', '2026-11-02', 'delivered', [['p3', 2], ['p7', 1]]),
  o('CP-10420', 'c6', '2026-11-02', 'delivered', [['p5', 1], ['p4', 1]]),
]

export const orderSubtotal = (x: AdminOrder) =>
  x.lines.reduce((s, l) => s + (getProduct(l.productId)?.price ?? 0) * l.quantity, 0)
export const orderTotal = (x: AdminOrder) => orderSubtotal(x) + deliveryFee(orderSubtotal(x))
