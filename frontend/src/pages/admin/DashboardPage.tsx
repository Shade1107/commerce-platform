import { Link } from 'react-router'
import { DataTable } from '../../components/admin/DataTable'
import { PageHeader } from '../../components/admin/PageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { customers, getCustomer } from '../../data/customers'
import { orders, orderTotal } from '../../data/orders'
import { products } from '../../data/products'
import { formatDate, formatPrice } from '../../lib/format'

export default function DashboardPage() {
  const valid = orders.filter((o) => o.status !== 'cancelled')
  const revenue = valid.reduce((s, o) => s + orderTotal(o), 0)
  const stats = [
    { label: 'Revenue', value: formatPrice(revenue) },
    { label: 'Orders', value: String(orders.length) },
    { label: 'Avg. order value', value: formatPrice(revenue / valid.length) },
    { label: 'Customers', value: String(customers.length) },
  ]

  const days = [...new Set(orders.map((o) => o.placedAt))].sort()
  const daily = days.map((d) => ({ d, total: valid.filter((o) => o.placedAt === d).reduce((s, o) => s + orderTotal(o), 0) }))
  const max = Math.max(...daily.map((x) => x.total), 1)
  const low = products.filter((p) => p.stock <= 5)

  return (
    <>
      <PageHeader title="Dashboard" description="Sales and orders overview. Demo data." />
      <dl className="grid grid-cols-2 gap-y-6 border-y border-neutral-200 py-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}><dt className="text-sm text-neutral-500">{s.label}</dt><dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd></div>
        ))}
      </dl>

      <div className="mt-10 grid gap-12 xl:grid-cols-[1fr_20rem]">
        <section>
          <h2 className="text-sm font-medium">Revenue by day</h2>
          <div className="mt-4 flex h-40 items-end gap-3">
            {daily.map((x) => (
              <div key={x.d} className="flex flex-1 flex-col items-center gap-2" title={formatPrice(x.total)}>
                <div className="w-full rounded-t bg-neutral-800 transition-all" style={{ height: `${(x.total / max) * 100}%` }} />
                <span className="text-xs text-neutral-500">{formatDate(x.d)}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-end justify-between">
            <h2 className="text-sm font-medium">Recent orders</h2>
            <Link to="/admin/orders" className="text-sm text-neutral-600 underline-offset-4 hover:underline">View all</Link>
          </div>
          <DataTable rows={orders.slice(0, 5)} rowKey={(o) => o.id} columns={[
            { header: 'Order', cell: (o) => o.id },
            { header: 'Customer', cell: (o) => getCustomer(o.customerId)?.name },
            { header: 'Total', cell: (o) => formatPrice(orderTotal(o)), className: 'tabular-nums' },
            { header: 'Status', cell: (o) => <StatusBadge status={o.status} /> },
          ]} />
        </section>

        <section>
          <h2 className="text-sm font-medium">Needs restocking</h2>
          <ul className="mt-3 divide-y divide-neutral-100 text-sm">
            {low.map((p) => (
              <li key={p.id} className="flex justify-between py-3"><span>{p.name}</span><span className="text-neutral-500">{p.stock === 0 ? 'Out of stock' : `${p.stock} left`}</span></li>
            ))}
          </ul>
          <Link to="/admin/inventory" className="mt-2 inline-block text-sm text-neutral-600 underline-offset-4 hover:underline">Open inventory</Link>
        </section>
      </div>
    </>
  )
}
