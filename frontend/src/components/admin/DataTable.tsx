import type { ReactNode } from 'react'

export interface Column<T> { header: string; cell: (row: T) => ReactNode; className?: string }

interface Props<T> { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; empty?: string }

export function DataTable<T>({ columns, rows, rowKey, empty = 'No results.' }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
            {columns.map((c) => <th key={c.header} className={`whitespace-nowrap py-3 pr-4 font-medium ${c.className ?? ''}`}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-b border-neutral-100 transition-colors hover:bg-neutral-50">
              {columns.map((c) => <td key={c.header} className={`py-3 pr-4 ${c.className ?? ''}`}>{c.cell(r)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="py-10 text-center text-sm text-neutral-500">{empty}</p>}
    </div>
  )
}
