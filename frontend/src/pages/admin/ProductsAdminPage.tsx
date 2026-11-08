import { useState, type FormEvent } from 'react'
import { DataTable } from '../../components/admin/DataTable'
import { PageHeader } from '../../components/admin/PageHeader'
import { Field } from '../../components/Field'
import { StockBadge } from '../../components/StockBadge'
import { categories, getCategory, products as seed } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { btn, inputClass } from '../../lib/ui'
import type { Product } from '../../types'

const blank = { name: '', categoryId: categories[0].id, price: '', stock: '' }

export default function ProductsAdminPage() {
  const [list, setList] = useState<Product[]>(seed)
  const [q, setQ] = useState('')
  const [form, setForm] = useState<typeof blank | null>(null)

  const add = (e: FormEvent) => {
    e.preventDefault()
    if (!form) return
    setList([{ id: `p${Date.now()}`, name: form.name, categoryId: form.categoryId, price: Number(form.price), stock: Number(form.stock),
      description: '', tone: 'bg-neutral-200', featured: false, variants: [] }, ...list])
    setForm(null)
  }

  const rows = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHeader title="Products" description={`${list.length} products`} action={<button className={btn.primary} onClick={() => setForm(form ? null : blank)}>{form ? 'Cancel' : 'Add product'}</button>} />
      {form && (
        <form onSubmit={add} className="mb-8 grid gap-4 border-b border-neutral-200 pb-8 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          <Field label="Name" required className="lg:col-span-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <label className="block"><span className="mb-1.5 block text-sm font-medium">Category</span>
            <select className={inputClass} value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></label>
          <Field label="Price" required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Field label="Stock" required type="number" min="0" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <button type="submit" className={`${btn.primary} sm:col-span-2 lg:col-span-5 lg:w-fit`}>Save product</button>
        </form>
      )}
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className={`${inputClass} mb-2 max-w-xs`} />
      <DataTable rows={rows} rowKey={(p) => p.id} columns={[
        { header: 'Product', cell: (p) => <span className="flex items-center gap-3"><span className={`size-9 rounded ${p.tone}`} />{p.name}</span> },
        { header: 'Category', cell: (p) => getCategory(p.categoryId)?.name, className: 'text-neutral-600' },
        { header: 'Price', cell: (p) => formatPrice(p.price), className: 'tabular-nums' },
        { header: 'Stock', cell: (p) => <StockBadge stock={p.stock} /> },
        { header: '', cell: (p) => <button className="text-neutral-500 hover:text-neutral-900" onClick={() => setList(list.filter((x) => x.id !== p.id))}>Delete</button>, className: 'text-right' },
      ]} />
    </>
  )
}
