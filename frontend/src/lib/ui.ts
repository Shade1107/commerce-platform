const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-50'

export const btn = {
  primary: `${base} bg-neutral-900 text-white hover:bg-neutral-700`,
  secondary: `${base} border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50`,
  ghost: `${base} text-neutral-600 hover:bg-neutral-100`,
}

export const inputClass =
  'w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none'
