import { Link } from 'react-router'
import { formatPrice } from '../lib/format'
import type { Product } from '../types'
import { ProductImage } from './ProductImage'
import { StockBadge } from './StockBadge'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="group block">
      <ProductImage product={product} className="transition-transform duration-300 group-hover:scale-[1.02]" />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-neutral-900">{product.name}</h3>
          <StockBadge stock={product.stock} />
        </div>
        <p className="text-sm text-neutral-700">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
