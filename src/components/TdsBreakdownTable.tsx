import { Card, Table, Divider, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type {
  BreakdownRow,
  TaxResult,
  MaritalStatus,
  AnnualRow,
  TagColor,
} from '../types'
import { TAG_COLORS } from '../constants'
import { fmt, useBreakpoints } from '../utils'
import { Layers } from 'lucide-react'

const { Text } = Typography

interface TdsBreakdownTableProps {
  result: TaxResult
  maritalStatus: MaritalStatus
}

export function TdsBreakdownTable({ result }: Readonly<TdsBreakdownTableProps>) {
  const { isMobile } = useBreakpoints()

  const columns: ColumnsType<BreakdownRow> = [
    {
      title: 'Income Slab',
      dataIndex: 'slab',
      key: 'slab',
      render: (text: string, record: BreakdownRow) => {
        const c: TagColor = TAG_COLORS[record.tag] ?? TAG_COLORS['10%']
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 700,
                background: c.bg,
                color: c.color,
                border: `1px solid ${c.border}`,
                whiteSpace: 'nowrap',
              }}
            >
              {record.tag}
            </span>
            {!isMobile && (
              <span
                style={{
                  color: '#374151',
                  fontFamily: 'monospace',
                  fontSize: 12,
                }}
              >
                {text}
              </span>
            )}
          </div>
        )
      },
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center' as const,
      render: (v: string) => (
        <Text strong style={{ color: '#1e3a5f', fontSize: 12 }}>
          {v}
        </Text>
      ),
    },
    ...(!isMobile
      ? [
          {
            title: 'Taxable (NPR)',
            dataIndex: 'taxableAmount',
            key: 'taxableAmount',
            align: 'right' as const,
            render: (v: number) => (
              <span
                style={{
                  fontFamily: 'monospace',
                  color: '#374151',
                  fontSize: 12,
                }}
              >
                {Math.round(v).toLocaleString('en-IN')}
              </span>
            ),
          },
        ]
      : []),
    {
      title: 'Tax (NPR)',
      dataIndex: 'tax',
      key: 'tax',
      align: 'right' as const,
      render: (v: number) => (
        <span
          style={{
            fontFamily: 'monospace',
            color: '#dc2626',
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          {Math.round(v).toLocaleString('en-IN')}
        </span>
      ),
    },
  ]

  const annualRows: AnnualRow[] = [
    { label: 'Taxable Income', value: fmt(result.annual) },
    { label: 'Total TDS', value: fmt(result.totalTax), color: '#dc2626' },
    {
      label: 'Net Take-Home',
      value: fmt(result.annual - result.totalTax),
      color: '#15803d',
    },
  ]

  const tableSummary = (rows: readonly BreakdownRow[]) => {
    const totalTaxable = rows.reduce((s, r) => s + r.taxableAmount, 0)
    const totalTax = rows.reduce((s, r) => s + r.tax, 0)
    return (
      <Table.Summary.Row style={{ background: '#f8faff' }}>
        <Table.Summary.Cell index={0} colSpan={2}>
          <Text strong style={{ color: '#1e3a5f', fontFamily: 'sans-serif' }}>
            Total
          </Text>
        </Table.Summary.Cell>
        {!isMobile && (
          <Table.Summary.Cell index={1} align="right">
            <Text strong style={{ fontFamily: 'monospace', color: '#374151' }}>
              {Math.round(totalTaxable).toLocaleString('en-IN')}
            </Text>
          </Table.Summary.Cell>
        )}
        <Table.Summary.Cell index={isMobile ? 1 : 2} align="right">
          <Text
            strong
            style={{ fontFamily: 'monospace', color: '#dc2626', fontSize: 13 }}
          >
            {Math.round(totalTax).toLocaleString('en-IN')}
          </Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    )
  }

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
      <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: '#f0f4ff',
            border: '1px solid #c7d2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Layers size={15} color="#4f46e5" strokeWidth={2} />
        </div>
        <span
          style={{
            margin: 0,
            color: '#1e3a5f',
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          TDS Breakdown
        </span>
      </div>

      {/* Table */}
      <Table<BreakdownRow>
        dataSource={result.breakdown}
        columns={columns}
        pagination={false}
        size="small"
        scroll={isMobile ? { x: true } : undefined}
        style={{ fontFamily: 'sans-serif' }}
        summary={tableSummary}
      />

      <Divider style={{ margin: '16px 0 14px' }} />

      {/* Annual Summary */}
      <div
        style={{
          background: '#f8faff',
          borderRadius: 10,
          padding: isMobile ? '12px 14px' : '14px 20px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 10 : 12,
          border: '1px solid #e0e7ff',
        }}
      >
        {annualRows.map(row => (
          <div
            key={row.label}
            style={{
              textAlign: isMobile ? 'left' : 'center',
              display: isMobile ? 'flex' : 'block',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: '#6b7280',
                fontFamily: 'sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: isMobile ? 0 : 4,
              }}
            >
              {row.label}
            </div>
            <div
              style={{
                fontSize: isMobile ? 14 : 16,
                fontWeight: 800,
                fontFamily: 'monospace',
                color: row.color ?? '#1e3a5f',
              }}
            >
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
