import { Link, NavLink, Outlet } from 'react-router'
import { useCart } from '../context/cart-context'

const link = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`

export function StorefrontLayout() {
  const { count } = useCart()
  return (
    <div className="flex min-h-svh flex-col bg-white text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-base font-semibold tracking-tight">Commerce</Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/products" className={link}>Shop</NavLink>
            <NavLink to="/cart" className={link}>Cart{count > 0 && <span className="ml-1.5 rounded-full bg-neutral-900 px-1.5 py-0.5 text-xs text-white">{count}</span>}</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6"><Outlet /></main>
      <footer className="border-t border-neutral-200 py-8 text-center text-xs text-neutral-500">
        Commerce Platform demo. Mock data only.
      </footer>
    </div>
  )
}
