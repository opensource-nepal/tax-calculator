import type { TaxSlab, TagKey, TagColor } from './types'

export const TAX_SLABS_INDIVIDUAL: TaxSlab[] = [
  { label: 'Up to 5,00,000', limit: 500000, rate: 0.01, tag: 'SST' },
  { label: 'Next 2,00,000', limit: 200000, rate: 0.1, tag: '10%' },
  { label: 'Next 3,00,000', limit: 300000, rate: 0.2, tag: '20%' },
  { label: 'Next 10,00,000', limit: 1000000, rate: 0.3, tag: '30%' },
  { label: 'Next 30,00,000', limit: 3000000, rate: 0.36, tag: '36%' },
  { label: 'Above 50,00,000', limit: Infinity, rate: 0.39, tag: '39%' },
]

export const TAX_SLABS_COUPLE: TaxSlab[] = [
  { label: 'Up to 6,00,000', limit: 600000, rate: 0.01, tag: 'SST' },
  { label: 'Next 2,00,000', limit: 200000, rate: 0.1, tag: '10%' },
  { label: 'Next 3,00,000', limit: 300000, rate: 0.2, tag: '20%' },
  { label: 'Next 9,00,000', limit: 900000, rate: 0.3, tag: '30%' },
  { label: 'Next 30,00,000', limit: 3000000, rate: 0.36, tag: '36%' },
  { label: 'Above 50,00,000', limit: Infinity, rate: 0.39, tag: '39%' },
]

export const TAG_COLORS: Record<TagKey, TagColor> = {
  SST: { bg: '#e0f2fe', color: '#0369a1', border: '#bae6fd' },
  '10%': { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  '20%': { bg: '#fefce8', color: '#a16207', border: '#fde68a' },
  '30%': { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  '36%': { bg: '#fdf2f8', color: '#a21caf', border: '#f5d0fe' },
  '39%': { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
}

export const LABEL_STYLEE = {
  display: 'block',
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 700,
  color: '#6b7280',
  fontFamily: 'sans-serif',
  letterSpacing: '1px',
  textTransform: 'uppercase',
}
