import { useCart } from '../context/cart-context'
import { deliveryFee, FREE_DELIVERY_OVER, formatPrice } from '../lib/format'

export function OrderSummary() {
  const { subtotal } = useCart()
  const fee = deliveryFee(subtotal)
  const row = 'flex justify-between text-sm'
  return (
    <div className="space-y-3 rounded-lg bg-neutral-50 p-5">
      <h2 className="font-medium">Summary</h2>
      <div className={row}><span className="text-neutral-600">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      <div className={row}><span className="text-neutral-600">Delivery</span><span>{fee === 0 ? 'Free' : formatPrice(fee)}</span></div>
      {fee > 0 && <p className="text-xs text-neutral-500">Free delivery over {formatPrice(FREE_DELIVERY_OVER)}.</p>}
      <div className={`${row} border-t border-neutral-200 pt-3 text-base font-medium`}><span>Total</span><span>{formatPrice(subtotal + fee)}</span></div>
    </div>
  )
}
