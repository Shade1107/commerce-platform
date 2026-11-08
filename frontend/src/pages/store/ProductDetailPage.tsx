import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { ProductImage } from '../../components/ProductImage'
import { StockBadge } from '../../components/StockBadge'
import { useCart } from '../../context/cart-context'
import { getCategory, getProduct } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { btn } from '../../lib/ui'

export default function ProductDetailPage() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { add } = useCart()
  const [choice, setChoice] = useState<Record<string, string>>({})
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return <p className="py-20 text-center">Product not found. <Link to="/products" className="underline">Back to shop</Link></p>

  const variant = product.variants.length
    ? product.variants.map((v) => choice[v.name] ?? v.options[0]).join(' / ')
    : undefined
  const soldOut = product.stock === 0

  const onAdd = () => {
    add(product.id, qty, variant)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <>
      <nav className="mb-6 text-sm text-neutral-500">
        <Link to="/products" className="hover:text-neutral-900">Shop</Link> / {getCategory(product.categoryId)?.name}
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <ProductImage product={product} />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-xl">{formatPrice(product.price)}</p>
          <div className="mt-1"><StockBadge stock={product.stock} /></div>
          <p className="mt-6 text-neutral-600">{product.description}</p>

          {product.variants.map((v) => (
            <fieldset key={v.name} className="mt-6">
              <legend className="mb-2 text-sm font-medium">{v.name}: <span className="font-normal text-neutral-600">{choice[v.name] ?? v.options[0]}</span></legend>
              <div className="flex flex-wrap gap-2">
                {v.options.map((o) => {
                  const active = (choice[v.name] ?? v.options[0]) === o
                  return (
                    <button key={o} type="button" aria-pressed={active} onClick={() => setChoice({ ...choice, [v.name]: o })}
                      className={`rounded-md border px-3.5 py-2 text-sm transition-colors ${active ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'}`}>{o}</button>
                  )
                })}
              </div>
            </fieldset>
          ))}

          <div className="mt-8 flex gap-3">
            <div className="flex items-center rounded-md border border-neutral-300">
              <button className="px-3 py-2.5" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
              <button className="px-3 py-2.5" aria-label="Increase quantity" onClick={() => setQty(Math.min(product.stock || 1, qty + 1))}>+</button>
            </div>
            <button disabled={soldOut} onClick={onAdd} className={`${btn.primary} flex-1`}>
              {soldOut ? 'Out of stock' : added ? 'Added to cart ✓' : 'Add to cart'}
            </button>
          </div>
          {added && <Link to="/cart" className="mt-3 inline-block text-sm underline underline-offset-4">View cart</Link>}
        </div>
      </div>
    </>
  )
}
