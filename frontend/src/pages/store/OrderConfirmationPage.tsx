import { Link, Navigate } from 'react-router'
import { formatPrice } from '../../lib/format'
import { loadLastOrder } from '../../lib/orders'
import { btn } from '../../lib/ui'

export default function OrderConfirmationPage() {
  const order = loadLastOrder()
  if (!order) return <Navigate to="/" replace />
  const { customer: c } = order
  return (
    <div className="mx-auto max-w-xl py-6">
      <p className="text-sm font-medium text-emerald-700">Order placed</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Thank you, {c.name.split(' ')[0]}.</h1>
      <p className="mt-2 text-neutral-600">Order <strong className="text-neutral-900">{order.id}</strong>. We will call {c.phone} to confirm delivery.</p>

      <ul className="mt-8 border-t border-neutral-200">
        {order.lines.map((l, i) => (
          <li key={i} className="flex justify-between border-b border-neutral-200 py-3 text-sm">
            <span>{l.quantity} × {l.name}{l.variant && <span className="text-neutral-500"> ({l.variant})</span>}</span>
            <span className="tabular-nums">{formatPrice(l.unitPrice * l.quantity)}</span>
          </li>
        ))}
        <li className="flex justify-between py-3 text-sm text-neutral-600"><span>Delivery</span><span>{order.delivery ? formatPrice(order.delivery) : 'Free'}</span></li>
        <li className="flex justify-between border-t border-neutral-200 py-3 font-medium"><span>Total</span><span>{formatPrice(order.total)}</span></li>
      </ul>

      <h2 className="mt-8 text-sm font-medium">Delivering to</h2>
      <p className="mt-1 text-sm text-neutral-600">{c.address}, {c.city}</p>
      <Link to="/products" className={`${btn.secondary} mt-8`}>Continue shopping</Link>
    </div>
  )
}
