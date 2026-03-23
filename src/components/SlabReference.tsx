import { Typography } from 'antd'
import type { MaritalStatus } from '../types'
import { TAX_SLABS_INDIVIDUAL, TAX_SLABS_COUPLE, TAG_COLORS } from '../constants'
import { BookOpen } from 'lucide-react'

const { Text } = Typography

interface SlabReferenceProps {
  maritalStatus: MaritalStatus
}

export function SlabReference({ maritalStatus }: Readonly<SlabReferenceProps>) {
  const slabs = maritalStatus === 'couple' ? TAX_SLABS_COUPLE : TAX_SLABS_INDIVIDUAL

  return (
    <div style={{ padding: '8px 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 12,
        }}
      >
        <BookOpen size={13} color="#64748b" strokeWidth={2} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#64748b',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}
        >
          Tax Slabs Reference
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {slabs.map(slab => {
          const c = TAG_COLORS[slab.tag]
          return (
            <div
              key={slab.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 12px',
                borderRadius: 6,
                background: '#fff',
                border: `1px solid #f1f5f9`,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = c.border
                ;(e.currentTarget as HTMLElement).style.background = c.bg
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#f1f5f9'
                ;(e.currentTarget as HTMLElement).style.background = '#fff'
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: '#475569',
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
                }}
              >
                {slab.label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: c.color,
                  fontFamily: 'monospace',
                  background: c.bg,
                  padding: '1px 6px',
                  borderRadius: 4,
                  border: `1px solid ${c.border}`,
                }}
              >
                {(slab.rate * 100).toFixed(0)}%
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: '10px 14px',
          background: '#fef3c7',
          borderRadius: 8,
          border: '1px solid #fde68a',
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: '#92400e',
            fontFamily: 'sans-serif',
            lineHeight: 1.5,
            display: 'block',
          }}
        >
          <strong style={{ opacity: 0.8 }}>Notes:</strong>
          <br />
          SST = Social Security Tax @ 1% (applied on first slab).
          <br />
          * 36% = 30% base + 20% surcharge.
          <br />
          ** 39% = 30% base + 30% surcharge.
        </Text>
      </div>
    </div>
  )
}
