import type { Category, Product } from '../types'

export const categories: Category[] = [
  { id: 'kitchen', name: 'Kitchen', description: 'Brewing, serving and everyday ware' },
  { id: 'home', name: 'Home', description: 'Soft goods and scent for living spaces' },
  { id: 'stationery', name: 'Stationery', description: 'Tools for desks and notebooks' },
  { id: 'accessories', name: 'Accessories', description: 'Carry-everything essentials' },
]

export const products: Product[] = [
  { id: 'p1', name: 'Ceramic Pour-Over Set', categoryId: 'kitchen', price: 48, tone: 'bg-stone-200', stock: 24, featured: true,
    description: 'Hand-glazed dripper and carafe. Brews 2 to 3 cups. Dishwasher safe.',
    variants: [{ name: 'Color', options: ['White', 'Sand'] }] },
  { id: 'p2', name: 'Linen Throw Blanket', categoryId: 'home', price: 64, tone: 'bg-amber-100', stock: 12, featured: true,
    description: 'Stonewashed European linen. Soft from the first day. 130 x 170 cm.',
    variants: [{ name: 'Color', options: ['Oat', 'Charcoal'] }] },
  { id: 'p3', name: 'Walnut Desk Organizer', categoryId: 'stationery', price: 39, tone: 'bg-orange-100', stock: 4, featured: true,
    description: 'Solid walnut tray with three compartments. Oiled finish.', variants: [] },
  { id: 'p4', name: 'Hardcover Notebook', categoryId: 'stationery', price: 18, tone: 'bg-slate-200', stock: 80, featured: false,
    description: '160 pages of 100 gsm dot-grid paper. Lies flat when open.',
    variants: [{ name: 'Size', options: ['A5', 'A6'] }] },
  { id: 'p5', name: 'Canvas Tote Bag', categoryId: 'accessories', price: 28, tone: 'bg-zinc-200', stock: 40, featured: true,
    description: 'Heavy 12 oz cotton canvas with an inner zip pocket.',
    variants: [{ name: 'Color', options: ['Natural', 'Black'] }] },
  { id: 'p6', name: 'Stoneware Mug', categoryId: 'kitchen', price: 22, tone: 'bg-neutral-200', stock: 0, featured: false,
    description: 'Thick-walled 350 ml mug with a reactive glaze. Each piece is unique.',
    variants: [{ name: 'Color', options: ['White', 'Speckled grey'] }] },
  { id: 'p7', name: 'Soy Wax Candle', categoryId: 'home', price: 26, tone: 'bg-rose-100', stock: 31, featured: false,
    description: 'Hand-poured, 45 hour burn time. Cotton wick.',
    variants: [{ name: 'Scent', options: ['Cedar', 'Fig', 'Linen'] }] },
  { id: 'p8', name: 'Brass Pen', categoryId: 'stationery', price: 34, tone: 'bg-yellow-100', stock: 17, featured: true,
    description: 'Machined from solid brass. Takes standard refills. Patinas with use.',
    variants: [{ name: 'Finish', options: ['Brushed', 'Polished'] }] },
]

export const getProduct = (id: string) => products.find((p) => p.id === id)
export const getCategory = (id: string) => categories.find((c) => c.id === id)
