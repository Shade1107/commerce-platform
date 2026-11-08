export function StockBadge({ stock }: { stock: number }) {
  const [label, cls] =
    stock === 0 ? ['Out of stock', 'text-neutral-500'] : stock <= 5 ? [`Only ${stock} left`, 'text-amber-700'] : ['In stock', 'text-emerald-700']
  return <span className={`text-xs font-medium ${cls}`}>{label}</span>
}
