import { Link } from 'react-router'
import { ProductCard } from '../../components/ProductCard'
import { categories, products } from '../../data/products'
import { btn } from '../../lib/ui'

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4)
  return (
    <>
      <section className="max-w-2xl py-8 sm:py-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Well-made things for everyday use.</h1>
        <p className="mt-4 text-lg text-neutral-600">A small shop for the kitchen, home and desk. Simple goods. Fair prices.</p>
        <Link to="/products" className={`${btn.primary} mt-8`}>Shop all products</Link>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">Categories</h2>
        <ul className="mt-4 grid border-t border-neutral-200 sm:grid-cols-2 sm:gap-x-10">
          {categories.map((c) => (
            <li key={c.id} className="border-b border-neutral-200">
              <Link to={`/products?category=${c.id}`} className="flex items-center justify-between py-5 transition-colors hover:text-neutral-500">
                <span><span className="block font-medium">{c.name}</span><span className="text-sm text-neutral-500">{c.description}</span></span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured</h2>
          <Link to="/products" className="text-sm text-neutral-600 underline-offset-4 hover:underline">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  )
}
