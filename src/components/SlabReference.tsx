import { Typography } from 'antd'
import type { MaritalStatus } from '../types'
import { TAX_SLABS_INDIVIDUAL, TAX_SLABS_COUPLE, TAG_COLORS } from '../constants'

const { Text } = Typography

interface SlabReferenceProps {
  maritalStatus: MaritalStatus
}

export function SlabReference({ maritalStatus }: Readonly<SlabReferenceProps>) {
  const slabs = maritalStatus === 'couple' ? TAX_SLABS_COUPLE : TAX_SLABS_INDIVIDUAL

  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#6b7280',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
          marginBottom: 10,
        }}
      >
        Tax Slabs Reference
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {slabs.map(slab => {
          const c = TAG_COLORS[slab.tag]
          return (
            <div
              key={slab.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 10px',
                borderRadius: 8,
                background: c.bg,
                border: `1px solid ${c.border}`,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: '#374151',
                  fontFamily: 'sans-serif',
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
          padding: '10px 12px',
          background: '#fffbeb',
          borderRadius: 8,
          border: '1px solid #fde68a',
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: '#92400e',
            fontFamily: 'sans-serif',
            lineHeight: 1.6,
          }}
        >
          * 36% = 30% base + 20% surcharge. ** 39% = 30% base + 30% surcharge. SST =
          Social Security Tax @ 1%.
        </Text>
      </div>
    </div>
  )
}
