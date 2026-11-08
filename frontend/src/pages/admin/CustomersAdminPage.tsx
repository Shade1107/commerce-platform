import { useState } from 'react'
import { DataTable } from '../../components/admin/DataTable'
import { PageHeader } from '../../components/admin/PageHeader'
import { customers } from '../../data/customers'
import { orders, orderTotal } from '../../data/orders'
import { formatPrice } from '../../lib/format'
import { inputClass } from '../../lib/ui'

export default function CustomersAdminPage() {
  const [q, setQ] = useState('')
  const rows = customers.filter((c) => `${c.name} ${c.email} ${c.city}`.toLowerCase().includes(q.toLowerCase()))
  const mine = (id: string) => orders.filter((o) => o.customerId === id)
  const spent = (id: string) => mine(id).filter((o) => o.status !== 'cancelled').reduce((s, o) => s + orderTotal(o), 0)

  return (
    <>
      <PageHeader title="Customers" description="Guest checkout customers, grouped by contact details." />
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" aria-label="Search customers" className={`${inputClass} mb-2 max-w-xs`} />
      <DataTable rows={rows} rowKey={(c) => c.id} columns={[
        { header: 'Name', cell: (c) => c.name, className: 'font-medium' },
        { header: 'Phone', cell: (c) => c.phone, className: 'whitespace-nowrap text-neutral-600' },
        { header: 'Email', cell: (c) => c.email, className: 'text-neutral-600' },
        { header: 'City', cell: (c) => c.city },
        { header: 'Orders', cell: (c) => mine(c.id).length, className: 'tabular-nums' },
        { header: 'Total spent', cell: (c) => formatPrice(spent(c.id)), className: 'tabular-nums' },
      ]} />
    </>
  )
}
