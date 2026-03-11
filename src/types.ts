// ── Domain Types ───────────────────────────────────────────────────────────

export type MaritalStatus = 'individual' | 'couple'

export type TagKey = 'SST' | '10%' | '20%' | '30%' | '36%' | '39%'

export interface TaxSlab {
  label: string
  limit: number
  rate: number
  tag: TagKey
}

export interface BreakdownRow {
  key: string
  slab: string
  rate: string
  taxableAmount: number
  tax: number
  tag: TagKey
}

export interface MonthlyCalculationRow {
  key: string
  title: string
  calculation: string
}

export interface TaxResult {
  breakdown: BreakdownRow[]
  grossMonthly: number
  totalTax: number
  monthlyTax: number
  monthlyDeduction: number
  netMonthly: number
  annual: number
}

export interface TagColor {
  bg: string
  color: string
  border: string
}

export interface AnnualRow {
  label: string
  value: string
  color?: string
}

export interface KpiCard {
  label: string
  value: string
  sub: string
  accent: string
  bg: string
  border: string
  icon: string
}

// ── Breakpoint helpers ─────────────────────────────────────────────────────

export interface Breakpoints {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}
