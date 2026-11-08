import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { ProductCard } from '../../components/ProductCard'
import { categories, products } from '../../data/products'
import { inputClass } from '../../lib/ui'

const sorts = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name',
} as const
type SortKey = keyof typeof sorts

export default function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const rawSort = params.get('sort') ?? ''
  const sort: SortKey = rawSort in sorts ? (rawSort as SortKey) : 'featured'

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'featured') next.set(key, value); else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const out = products.filter((p) =>
      (!category || p.categoryId === category) && p.name.toLowerCase().includes(q.trim().toLowerCase()))
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') out.sort((a, b) => b.price - a.price)
    if (sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'featured') out.sort((a, b) => Number(b.featured) - Number(a.featured))
    return out
  }, [q, category, sort])

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${active ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'}`

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search products" aria-label="Search products" className={`${inputClass} md:max-w-xs`} />
        <select value={sort} onChange={(e) => set('sort', e.target.value)} aria-label="Sort products" className={`${inputClass} md:w-52`}>
          {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className={chip(!category)} onClick={() => set('category', '')}>All</button>
        {categories.map((c) => <button key={c.id} className={chip(category === c.id)} onClick={() => set('category', c.id)}>{c.name}</button>)}
      </div>
      {list.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">No products match your search.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </>
  )
}
