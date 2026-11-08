import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router'

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/inventory', label: 'Inventory' },
  { to: '/admin/customers', label: 'Customers' },
]

export function AdminLayout() {
  const [open, setOpen] = useState(false)
  const item = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'bg-neutral-200 font-medium text-neutral-900' : 'text-neutral-600 hover:bg-neutral-100'}`

  return (
    <div className="min-h-svh bg-white text-neutral-900 lg:grid lg:grid-cols-[15rem_1fr]">
      <header className="flex h-14 items-center justify-between border-b border-neutral-200 px-4 lg:hidden">
        <span className="font-semibold tracking-tight">Commerce Admin</span>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu" className="rounded-md px-3 py-1.5 text-sm hover:bg-neutral-100">{open ? 'Close' : 'Menu'}</button>
      </header>
      <aside className={`${open ? 'block' : 'hidden'} border-b border-neutral-200 bg-neutral-50 p-4 lg:sticky lg:top-0 lg:block lg:h-svh lg:border-b-0 lg:border-r`}>
        <p className="mb-6 hidden px-3 font-semibold tracking-tight lg:block">Commerce Admin</p>
        <nav className="space-y-1">
          {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={item} onClick={() => setOpen(false)}>{n.label}</NavLink>)}
        </nav>
        <div className="mt-6 border-t border-neutral-200 pt-4">
          <Link to="/" className="block px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900">← View storefront</Link>
          <p className="px-3 pt-2 text-xs text-neutral-400">Demo mode. No authentication.</p>
        </div>
      </aside>
      <main className="min-w-0 px-4 py-8 sm:px-8"><Outlet /></main>
    </div>
  )
}
