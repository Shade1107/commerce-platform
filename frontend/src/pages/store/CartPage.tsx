import { Link } from 'react-router'
import { OrderSummary } from '../../components/OrderSummary'
import { ProductImage } from '../../components/ProductImage'
import { useCart } from '../../context/cart-context'
import { getProduct } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { btn } from '../../lib/ui'

export default function CartPage() {
  const { items, setQuantity, remove } = useCart()

  if (items.length === 0)
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-neutral-500">Add something you like.</p>
        <Link to="/products" className={`${btn.primary} mt-6`}>Continue shopping</Link>
      </div>
    )

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_22rem]">
        <ul className="border-t border-neutral-200">
          {items.map((item) => {
            const p = getProduct(item.productId)
            if (!p) return null
            return (
              <li key={`${item.productId}|${item.variant}`} className="flex gap-4 border-b border-neutral-200 py-5">
                <Link to={`/products/${p.id}`} className="w-24 shrink-0"><ProductImage product={p} /></Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link to={`/products/${p.id}`} className="font-medium">{p.name}</Link>
                      {item.variant && <p className="text-sm text-neutral-500">{item.variant}</p>}
                    </div>
                    <p className="text-sm tabular-nums">{formatPrice(p.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-neutral-300 text-sm">
                      <button className="px-2.5 py-1.5" aria-label="Decrease quantity" onClick={() => setQuantity(item, item.quantity - 1)}>−</button>
                      <span className="w-7 text-center tabular-nums">{item.quantity}</span>
                      <button className="px-2.5 py-1.5" aria-label="Increase quantity" onClick={() => setQuantity(item, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => remove(item)} className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline">Remove</button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <aside>
          <OrderSummary />
          <Link to="/checkout" className={`${btn.primary} mt-6 w-full`}>Checkout as guest</Link>
        </aside>
      </div>
    </>
  )
}
