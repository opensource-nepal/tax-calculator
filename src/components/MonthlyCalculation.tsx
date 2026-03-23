import { Card } from 'antd'
import { fmtRaw, fmt, useBreakpoints } from '../utils'
import type { MaritalStatus, TaxResult } from '../types'
import { Receipt, TrendingDown } from 'lucide-react'

interface SalaryRow {
  key: string
  title: string
  amount: string
  bold?: boolean
  isDeduction?: boolean
  isTotal?: boolean
}

const getRows = (
  result: TaxResult,
  monthly: number,
  ssfContribution: number | null,
  ssfDeduction: number | null
): SalaryRow[] => {
  if (!ssfContribution || !ssfDeduction) {
    return [
      { key: '1', title: 'Monthly Salary', amount: fmt(monthly) },
      { key: '2', title: 'TDS', amount: fmtRaw(result.monthlyTax), isDeduction: true },
      {
        key: '3',
        title: 'Net Income',
        amount: fmt(result.netMonthly),
        bold: true,
        isTotal: true,
      },
    ]
  }

  return [
    { key: '1', title: 'Monthly Salary', amount: fmt(monthly) },
    { key: '2', title: 'SSF Contribution (Employer)', amount: fmtRaw(ssfContribution) },
    {
      key: '3',
      title: 'Gross Income',
      amount: fmtRaw(result.grossMonthly),
      bold: true,
    },
    {
      key: '4',
      title: 'SSF Deduction',
      amount: fmtRaw(ssfDeduction),
      isDeduction: true,
    },
    { key: '5', title: 'TDS', amount: fmtRaw(result.monthlyTax), isDeduction: true },
    {
      key: '6',
      title: 'Total Deduction',
      amount: fmtRaw(result.monthlyDeduction),
      bold: true,
      isDeduction: true,
    },
    {
      key: '7',
      title: 'Net Income',
      amount: fmt(result.netMonthly),
      bold: true,
      isTotal: true,
    },
  ]
}

interface MonthlyCalculationProps {
  result: TaxResult
  monthly: number
  maritalStatus: MaritalStatus
  ssfContribution: number | null
  ssfDeduction: number | null
}

export default function MonthlyCalculation({
  result,
  monthly,
  ssfContribution,
  ssfDeduction,
}: Readonly<MonthlyCalculationProps>) {
  const { isMobile } = useBreakpoints()
  const rows = getRows(result, monthly, ssfContribution, ssfDeduction)

  const getTitleColor = (isNet: boolean, isDeduction: boolean) => {
    if (isNet) {
      return '#15803d'
    }
    if (isDeduction) {
      return '#6b7280'
    }
    return '#374151'
  }

  const getAmountColor = (isNet: boolean, isDeduction: boolean) => {
    if (isNet) {
      return '#15803d'
    }
    if (isDeduction) {
      return '#c2410c'
    }
    return '#1e3a5f'
  }

  return (
    <Card
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 16px rgba(30,58,95,0.06)',
        background: '#fff',
      }}
      styles={{ body: { padding: isMobile ? '16px 12px' : '20px 24px' } }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Receipt size={15} color="#15803d" strokeWidth={2} />
        </div>
        <span
          style={{
            color: '#1e3a5f',
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Monthly Salary Breakdown
        </span>
      </div>

      {/* Custom row list — avoids heavy ant table for just a few rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map((row, idx) => {
          const isLast = idx === rows.length - 1
          const isNet = Boolean(row.isTotal)
          const isDeduction = Boolean(row.isDeduction)

          return (
            <div
              key={row.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: isNet ? '12px 12px' : '9px 12px',
                borderRadius: isNet ? 10 : 0,
                borderBottom: !isLast && !isNet ? '1px solid #f3f4f6' : 'none',
                marginTop: isNet ? 8 : 0,
                background: isNet ? '#f0fdf4' : 'transparent',
                border: isNet ? '1px solid #bbf7d0' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {isDeduction && !isNet && (
                  <TrendingDown size={12} color="#c2410c" strokeWidth={2} />
                )}
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    color: getTitleColor(isNet, isDeduction),
                    fontWeight: row.bold ? 700 : 400,
                  }}
                >
                  {row.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: isNet ? 15 : 13,
                  fontFamily: 'monospace',
                  color: getAmountColor(isNet, isDeduction),
                  fontWeight: row.bold ? 700 : 400,
                }}
              >
                {isDeduction && !isNet ? '- ' : ''}
                {row.amount}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
