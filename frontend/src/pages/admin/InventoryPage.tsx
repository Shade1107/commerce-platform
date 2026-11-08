import { useState } from 'react'
import { DataTable } from '../../components/admin/DataTable'
import { PageHeader } from '../../components/admin/PageHeader'
import { StockBadge } from '../../components/StockBadge'
import { products } from '../../data/products'
import { inputClass } from '../../lib/ui'

type Filter = 'all' | 'low' | 'out'

export default function InventoryPage() {
  const [stock, setStock] = useState<Record<string, number>>(() => Object.fromEntries(products.map((p) => [p.id, p.stock])))
  const [filter, setFilter] = useState<Filter>('all')
  const adjust = (id: string, d: number) => setStock((s) => ({ ...s, [id]: Math.max(0, s[id] + d) }))

  const rows = products.filter((p) => filter === 'all' || (filter === 'out' ? stock[p.id] === 0 : stock[p.id] > 0 && stock[p.id] <= 5))
  const units = Object.values(stock).reduce((a, b) => a + b, 0)
  const low = products.filter((p) => stock[p.id] > 0 && stock[p.id] <= 5).length
  const out = products.filter((p) => stock[p.id] === 0).length

  return (
    <>
      <PageHeader title="Inventory" description={`${units} units. ${low} low. ${out} out of stock.`} />
      <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} aria-label="Filter stock" className={`${inputClass} mb-2 max-w-48`}>
        <option value="all">All products</option><option value="low">Low stock</option><option value="out">Out of stock</option>
      </select>
      <DataTable rows={rows} rowKey={(p) => p.id} columns={[
        { header: 'Product', cell: (p) => p.name },
        { header: 'Status', cell: (p) => <StockBadge stock={stock[p.id]} /> },
        { header: 'Units', cell: (p) => (
            <span className="inline-flex items-center rounded-md border border-neutral-300">
              <button className="px-2.5 py-1" aria-label={`Decrease ${p.name}`} onClick={() => adjust(p.id, -1)}>−</button>
              <span className="w-9 text-center tabular-nums">{stock[p.id]}</span>
              <button className="px-2.5 py-1" aria-label={`Increase ${p.name}`} onClick={() => adjust(p.id, 1)}>+</button>
            </span>) },
      ]} />
    </>
  )
}
