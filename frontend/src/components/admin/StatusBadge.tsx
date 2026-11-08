import type { OrderStatus } from '../../types'

const styles: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-800',
  processing: 'bg-sky-50 text-sky-800',
  delivered: 'bg-emerald-50 text-emerald-800',
  cancelled: 'bg-neutral-100 text-neutral-600',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>{status}</span>
}
