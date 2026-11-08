import { useState, type FormEvent } from 'react'
import { DataTable } from '../../components/admin/DataTable'
import { PageHeader } from '../../components/admin/PageHeader'
import { Field } from '../../components/Field'
import { categories as seed, products } from '../../data/products'
import { btn } from '../../lib/ui'
import type { Category } from '../../types'

export default function CategoriesAdminPage() {
  const [list, setList] = useState<Category[]>(seed)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const count = (id: string) => products.filter((p) => p.categoryId === id).length

  const add = (e: FormEvent) => {
    e.preventDefault()
    setList([...list, { id: name.trim().toLowerCase().replace(/\s+/g, '-'), name: name.trim(), description }])
    setName(''); setDescription('')
  }

  return (
    <>
      <PageHeader title="Categories" description="Group products for the storefront." />
      <form onSubmit={add} className="mb-8 grid gap-4 border-b border-neutral-200 pb-8 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
        <Field label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <Field label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit" className={btn.primary}>Add category</button>
      </form>
      <DataTable rows={list} rowKey={(c) => c.id} columns={[
        { header: 'Name', cell: (c) => c.name, className: 'font-medium' },
        { header: 'Description', cell: (c) => c.description, className: 'text-neutral-600' },
        { header: 'Products', cell: (c) => count(c.id), className: 'tabular-nums' },
        { header: '', cell: (c) => count(c.id) > 0
            ? <span className="text-xs text-neutral-400">In use</span>
            : <button className="text-neutral-500 hover:text-neutral-900" onClick={() => setList(list.filter((x) => x.id !== c.id))}>Delete</button>, className: 'text-right' },
      ]} />
    </>
  )
}
