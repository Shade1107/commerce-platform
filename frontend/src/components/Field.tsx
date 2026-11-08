import type { InputHTMLAttributes } from 'react'
import { inputClass } from '../lib/ui'

interface Props extends InputHTMLAttributes<HTMLInputElement> { label: string }

export function Field({ label, className = '', ...rest }: Props) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input className={inputClass} {...rest} />
    </label>
  )
}
