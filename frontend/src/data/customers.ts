import type { Customer } from '../types'

export const customers: Customer[] = [
  { id: 'c1', name: 'Thida Win', phone: '+95 9 450 112 233', email: 'thida.win@example.com', city: 'Yangon' },
  { id: 'c2', name: 'Kyaw Zin', phone: '+95 9 790 334 118', email: 'kyaw.zin@example.com', city: 'Mandalay' },
  { id: 'c3', name: 'Emily Carter', phone: '+65 8123 4567', email: 'emily.carter@example.com', city: 'Singapore' },
  { id: 'c4', name: 'Hnin Su', phone: '+95 9 255 908 771', email: 'hnin.su@example.com', city: 'Yangon' },
  { id: 'c5', name: 'Daniel Lee', phone: '+65 9011 2288', email: 'daniel.lee@example.com', city: 'Singapore' },
  { id: 'c6', name: 'Moe Moe', phone: '+95 9 421 667 450', email: 'moe.moe@example.com', city: 'Naypyidaw' },
]

export const getCustomer = (id: string) => customers.find((c) => c.id === id)
