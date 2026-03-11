import { Card } from 'antd'
import type { KpiCard } from '../types'

import { useBreakpoints } from '../utils'

interface KpiCardsProps {
  cards: KpiCard[]
}

export default function KpiCards({ cards }: Readonly<KpiCardsProps>) {
  const { isMobile } = useBreakpoints()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 12,
      }}
    >
      {cards.map(card => (
        <Card
          key={card.label}
          style={{
            borderRadius: 14,
            border: `1px solid ${card.border}`,
            background: card.bg,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
          styles={{
            body: { padding: isMobile ? '14px 16px' : '18px 20px 14px' },
          }}
        >
          {isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: card.accent,
                    fontFamily: 'monospace',
                    lineHeight: 1.3,
                  }}
                >
                  {card.value}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#9ca3af',
                  fontFamily: 'sans-serif',
                  textAlign: 'right',
                }}
              >
                {card.sub}
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: 'sans-serif',
                  marginBottom: 4,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: card.accent,
                  fontFamily: 'monospace',
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {card.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#9ca3af',
                  fontFamily: 'sans-serif',
                }}
              >
                {card.sub}
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  )
}
