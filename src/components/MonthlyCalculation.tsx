import { Card, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { fmtRaw, fmt, useBreakpoints } from '../utils'
import type { MaritalStatus, TaxResult } from '../types'

const { Title } = Typography

interface SalaryRow {
  key: string
  title: string
  amount: string
  bold?: boolean
}

const columnStyle = {
  fontSize: 12,
  fontFamily: 'monospace',
}

const columns: ColumnsType<SalaryRow> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: SalaryRow) =>
      record.bold ? (
        <strong style={columnStyle}>{text}</strong>
      ) : (
        <span style={columnStyle}>{text}</span>
      ),
  },
  {
    title: 'NPR',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (text: string, record: SalaryRow) =>
      record.bold ? (
        <strong style={columnStyle}>{text}</strong>
      ) : (
        <span style={columnStyle}>{text}</span>
      ),
  },
]

const getRows = (
  result: TaxResult,
  monthly: number,
  ssfContribution: number | null,
  ssfDeduction: number | null
): SalaryRow[] => {
  if (!ssfContribution || !ssfDeduction) {
    return [
      { key: '1', title: 'Monthly Salary', amount: fmt(monthly) },
      { key: '2', title: 'TDS', amount: fmtRaw(result.monthlyTax) },
      {
        key: '3',
        title: 'Net Income',
        amount: fmt(result.netMonthly),
        bold: true,
      },
    ]
  }

  return [
    { key: '1', title: 'Monthly Salary', amount: fmt(monthly) },
    { key: '2', title: 'SSF Contribution', amount: fmtRaw(ssfContribution) },
    {
      key: '3',
      title: 'Gross Income',
      amount: fmtRaw(result.grossMonthly),
      bold: true,
    },
    { key: '4', title: 'SSF Deduction', amount: fmtRaw(ssfDeduction) },
    { key: '5', title: 'TDS', amount: fmtRaw(result.monthlyTax) },
    {
      key: '6',
      title: 'Total Deduction',
      amount: fmtRaw(result.monthlyDeduction),
      bold: true,
    },
    {
      key: '7',
      title: 'Net Income',
      amount: fmt(result.netMonthly),
      bold: true,
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

  return (
    <Card
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 16px rgba(30,58,95,0.06)',
        background: '#fff',
      }}
      styles={{ body: { padding: isMobile ? '16px 12px' : '24px 24px' } }}
    >
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <Title
          level={5}
          style={{ margin: 0, color: '#1e3a5f', fontFamily: 'Georgia, serif' }}
        >
          Salary Calculation
        </Title>
      </div>
      <Table<SalaryRow>
        columns={columns}
        dataSource={getRows(result, monthly, ssfContribution, ssfDeduction)}
        pagination={false}
        size="small"
        showHeader={false}
      />
    </Card>
  )
}
