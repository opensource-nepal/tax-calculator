import { CalculatorOutlined } from '@ant-design/icons'
import type { TaxResult, MaritalStatus, KpiCard } from '../types'
import { fmt, useBreakpoints } from '../utils'
import KpiCards from './KpiCards'
import { TdsBreakdownTable } from './TdsBreakdownTable'
import MonthlyCalculation from './MonthlyCalculation'

function buildKpiCards(result: TaxResult): KpiCard[] {
  return [
    {
      label: 'Annual TDS',
      value: fmt(result.totalTax),
      sub: `Taxable Income: ${fmt(result.annual)}`,
      accent: '#dc2626',
      bg: '#fff5f5',
      border: '#fecaca',
      icon: '📊',
    },
    {
      label: 'Monthly TDS',
      value: fmt(result.monthlyTax),
      sub: 'Deducted at source',
      accent: '#c2410c',
      bg: '#fff7ed',
      border: '#fed7aa',
      icon: '📅',
    },
    {
      label: 'Monthly Take-Home',
      value: fmt(result.netMonthly),
      sub: 'After TDS deduction',
      accent: '#15803d',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      icon: '💰',
    },
  ]
}

function EmptyState() {
  const { isMobile } = useBreakpoints()

  return (
    <div
      style={{
        minHeight: isMobile ? 200 : 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <div style={{ fontSize: isMobile ? 48 : 64, color: '#d1d5db' }}>
        <CalculatorOutlined />
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#d1d5db',
          fontFamily: 'sans-serif',
        }}
      >
        Results will appear here
      </div>
      <div
        style={{
          fontSize: 13,
          color: '#d1d5db',
          maxWidth: 260,
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        Enter your monthly salary {isMobile ? 'above' : 'on the left'} to compute your
        TDS
      </div>
    </div>
  )
}

interface ResultsPanelProps {
  result: TaxResult | null
  monthly: number | null
  maritalStatus: MaritalStatus
  ssfContribution: number | null
  ssfDeduction: number | null
}

export function ResultsPanel({
  result,
  monthly,
  maritalStatus,
  ssfContribution,
  ssfDeduction,
}: Readonly<ResultsPanelProps>) {
  const { isMobile } = useBreakpoints()

  return (
    <div
      style={{
        padding: isMobile ? '16px' : '24px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {result && monthly ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <KpiCards cards={buildKpiCards(result)} />
          <MonthlyCalculation
            result={result}
            monthly={monthly}
            maritalStatus={maritalStatus}
            ssfContribution={ssfContribution}
            ssfDeduction={ssfDeduction}
          />
          <TdsBreakdownTable result={result} maritalStatus={maritalStatus} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
