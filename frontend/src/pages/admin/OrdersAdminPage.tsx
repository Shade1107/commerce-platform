import { useState } from 'react'
import { DataTable } from '../../components/admin/DataTable'
import { PageHeader } from '../../components/admin/PageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { getCustomer } from '../../data/customers'
import { orders as seed, orderStatuses, orderTotal } from '../../data/orders'
import { formatDate, formatPrice } from '../../lib/format'
import type { AdminOrder, OrderStatus } from '../../types'

export default function OrdersAdminPage() {
  const [list, setList] = useState<AdminOrder[]>(seed)
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const setStatus = (id: string, status: OrderStatus) => setList(list.map((o) => (o.id === id ? { ...o, status } : o)))
  const rows = list.filter((o) => filter === 'all' || o.status === filter)

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm capitalize transition-colors ${active ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'}`

  return (
    <>
      <PageHeader title="Orders" description={`${list.length} orders`} />
      <div className="mb-2 flex flex-wrap gap-2">
        {(['all', ...orderStatuses] as const).map((s) => <button key={s} className={chip(filter === s)} onClick={() => setFilter(s)}>{s}</button>)}
      </div>
      <DataTable rows={rows} rowKey={(o) => o.id} columns={[
        { header: 'Order', cell: (o) => o.id, className: 'font-medium' },
        { header: 'Date', cell: (o) => formatDate(o.placedAt), className: 'text-neutral-600' },
        { header: 'Customer', cell: (o) => getCustomer(o.customerId)?.name },
        { header: 'Items', cell: (o) => o.lines.reduce((n, l) => n + l.quantity, 0), className: 'tabular-nums' },
        { header: 'Total', cell: (o) => formatPrice(orderTotal(o)), className: 'tabular-nums' },
        { header: 'Status', cell: (o) => <StatusBadge status={o.status} /> },
        { header: 'Update', cell: (o) => (
            <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)} aria-label={`Status for ${o.id}`}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm capitalize">
              {orderStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>) },
      ]} />
    </>
  )
}
