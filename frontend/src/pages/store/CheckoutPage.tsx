import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { Field } from '../../components/Field'
import { OrderSummary } from '../../components/OrderSummary'
import { useCart } from '../../context/cart-context'
import { getProduct } from '../../data/products'
import { deliveryFee } from '../../lib/format'
import { saveLastOrder } from '../../lib/orders'
import { btn, inputClass } from '../../lib/ui'
import type { Order } from '../../types'

const empty = { name: '', phone: '', email: '', address: '', city: '', note: '' }

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const bind = (k: keyof typeof empty) => ({
    value: form[k],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value }),
  })

  if (items.length === 0) return <Navigate to="/cart" replace />

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const delivery = deliveryFee(subtotal)
    const order: Order = {
      id: `CP-${Math.floor(10000 + Math.random() * 90000)}`,
      placedAt: new Date().toISOString(),
      customer: form,
      lines: items.flatMap((i) => {
        const p = getProduct(i.productId)
        return p ? [{ name: p.name, variant: i.variant, quantity: i.quantity, unitPrice: p.price }] : []
      }),
      subtotal, delivery, total: subtotal + delivery,
    }
    saveLastOrder(order)
    clear()
    navigate('/order-confirmation', { replace: true })
  }

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-1 text-sm text-neutral-500">Guest checkout. No account needed.</p>
      <form onSubmit={submit} className="mt-8 grid gap-12 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <h2 className="font-medium">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required autoComplete="name" {...bind('name')} />
            <Field label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\s\-]{7,}" title="Enter a valid phone number" {...bind('phone')} />
            <Field label="Email (optional)" type="email" autoComplete="email" className="sm:col-span-2" {...bind('email')} />
          </div>
          <h2 className="pt-4 font-medium">Delivery address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Street address" required autoComplete="street-address" className="sm:col-span-2" {...bind('address')} />
            <Field label="City" required autoComplete="address-level2" {...bind('city')} />
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Delivery note (optional)</span>
            <textarea rows={3} className={inputClass} {...bind('note')} />
          </label>
          <p className="text-sm text-neutral-500">Payment: cash on delivery.</p>
        </div>
        <aside>
          <OrderSummary />
          <button type="submit" className={`${btn.primary} mt-6 w-full`}>Place order</button>
          <Link to="/cart" className={`${btn.ghost} mt-2 w-full`}>Back to cart</Link>
        </aside>
      </form>
    </>
  )
}
