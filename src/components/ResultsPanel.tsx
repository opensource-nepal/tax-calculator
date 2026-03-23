import { BarChart3, CalendarDays, Wallet, ArrowRight } from 'lucide-react'
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
      sub: `Taxable: ${fmt(result.annual)}`,
      accent: '#dc2626',
      bg: '#fff5f5',
      border: '#fecaca',
      icon: <BarChart3 size={18} strokeWidth={1.8} color="#dc2626" />,
    },
    {
      label: 'Monthly TDS',
      value: fmt(result.monthlyTax),
      sub: 'Deducted at source',
      accent: '#c2410c',
      bg: '#fff7ed',
      border: '#fed7aa',
      icon: <CalendarDays size={18} strokeWidth={1.8} color="#c2410c" />,
    },
    {
      label: 'Monthly Take-Home',
      value: fmt(result.netMonthly),
      sub: 'After TDS deduction',
      accent: '#15803d',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      icon: <Wallet size={18} strokeWidth={1.8} color="#15803d" />,
    },
  ]
}

function EmptyState() {
  const { isMobile } = useBreakpoints()

  return (
    <div
      style={{
        minHeight: isMobile ? 200 : '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 32,
      }}
    >
      {/* Steps guide */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 280,
          width: '100%',
        }}
      >
        {[
          { step: '1', text: 'Enter your monthly salary' },
          { step: '2', text: 'Choose your filing status' },
          { step: '3', text: 'View your tax breakdown' },
        ].map((item, i, arr) => (
          <div
            key={item.step}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                background: '#f8fafc',
                border: '1px solid #e5e7eb',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: '#1e3a5f',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'sans-serif',
                  flexShrink: 0,
                }}
              >
                {item.step}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: '#374151',
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
                }}
              >
                {item.text}
              </span>
            </div>
            {i < arr.length - 1 && (
              <div
                style={{ width: 1, height: 8, background: '#d1d5db', margin: '2px 0' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Arrow hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          color: '#9ca3af',
          fontFamily: 'sans-serif',
        }}
      >
        <ArrowRight size={14} color="#9ca3af" />
        Results appear here instantly
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="result-animate">
            <KpiCards cards={buildKpiCards(result)} />
          </div>
          <div className="result-animate">
            <MonthlyCalculation
              result={result}
              monthly={monthly}
              maritalStatus={maritalStatus}
              ssfContribution={ssfContribution}
              ssfDeduction={ssfDeduction}
            />
          </div>
          <div className="result-animate">
            <TdsBreakdownTable result={result} maritalStatus={maritalStatus} />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
