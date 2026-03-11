import { useState, useEffect } from 'react'
import type { BreakdownRow, TaxResult, MaritalStatus, Breakpoints } from './types'
import { TAX_SLABS_INDIVIDUAL, TAX_SLABS_COUPLE } from './constants'
import { isNil, isNumber } from 'lodash'

export function fmtRaw(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) {
    return 'N/A'
  }
  return Math.round(n).toLocaleString('en-IN')
}

export function fmt(n: number | undefined | null): string {
  return 'NPR ' + fmtRaw(n)
}

export function calculateTax(
  annualIncome: number,
  isCouple: boolean,
  ssfEnabled: boolean
): { breakdown: BreakdownRow[]; totalTax: number } {
  const slabs = isCouple ? TAX_SLABS_COUPLE : TAX_SLABS_INDIVIDUAL
  let remaining = annualIncome
  let totalTax = 0
  const breakdown: BreakdownRow[] = []

  for (const slab of slabs) {
    if (remaining <= 0) {
      break
    }

    const taxable = Math.min(
      remaining,
      slab.limit === Infinity ? remaining : slab.limit
    )

    // When SSF is enabled, SST (1%) is paid via SSF — skip it here
    const effectiveRate = ssfEnabled && slab.tag === 'SST' ? 0 : slab.rate
    const rateDisplay =
      ssfEnabled && slab.tag === 'SST'
        ? '0% (via SSF)'
        : `${(slab.rate * 100).toFixed(0)}%`

    const tax = taxable * effectiveRate
    if (taxable > 0) {
      breakdown.push({
        key: slab.label,
        slab: slab.label,
        rate: rateDisplay,
        taxableAmount: taxable,
        tax,
        tag: slab.tag,
      })
    }
    totalTax += tax
    remaining -= taxable
  }

  return { breakdown, totalTax }
}

export function buildTaxResult(
  monthly: number,
  maritalStatus: MaritalStatus,
  ssfContribution: number | null,
  ssfDeduction: number | null,
  yearlyBonus: number | null
): TaxResult {
  let annual = monthly * 12
  let grossMonthly = monthly
  let ssfEnabled = false

  // add ssf
  if (isNumber(ssfContribution) && isNumber(ssfDeduction)) {
    annual += (ssfContribution - ssfDeduction) * 12
    grossMonthly += ssfContribution
    ssfEnabled = ssfDeduction > 0
  }

  // add yearly bonus
  if (isNumber(yearlyBonus)) {
    annual += yearlyBonus
  }

  const isCouple = maritalStatus === 'couple'
  const { breakdown, totalTax } = calculateTax(annual, isCouple, ssfEnabled)
  const monthlyTax = totalTax / 12
  const monthlyDeduction = monthlyTax + (ssfDeduction ?? 0)
  const netMonthly = grossMonthly - monthlyDeduction

  return {
    breakdown,
    grossMonthly,
    totalTax,
    monthlyTax,
    monthlyDeduction,
    netMonthly,
    annual,
  }
}

export function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(isNil(window) ? 1024 : window.innerWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

export function useBreakpoints(): Breakpoints {
  const width = useWindowWidth()
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  }
}
