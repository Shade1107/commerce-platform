import type { Product } from '../types'

export function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div className={`flex aspect-square items-center justify-center overflow-hidden rounded-lg ${product.tone} ${className}`}>
      <span className="select-none text-6xl font-light text-neutral-900/20">{product.name[0]}</span>
    </div>
  )
}
