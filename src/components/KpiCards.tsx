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
        gap: 10,
      }}
    >
      {cards.map(card => (
        <Card
          key={card.label}
          style={{
            borderRadius: 14,
            border: `1px solid ${card.border}`,
            background: card.bg,
            boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          }}
          styles={{
            body: { padding: isMobile ? '12px 14px' : '14px 16px' },
          }}
        >
          {isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 9,
                  background: 'rgba(255,255,255,0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${card.border}`,
                }}
              >
                {card.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    fontFamily: 'sans-serif',
                    marginBottom: 2,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: card.accent,
                    fontFamily: 'monospace',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {card.value}
                </div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#9ca3af',
                  fontFamily: 'sans-serif',
                  textAlign: 'right',
                  flexShrink: 0,
                  maxWidth: 80,
                  lineHeight: 1.4,
                }}
              >
                {card.sub}
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${card.border}`,
                  }}
                >
                  {card.icon}
                </div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  fontFamily: 'sans-serif',
                  marginBottom: 4,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: card.accent,
                  fontFamily: 'monospace',
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}
              >
                {card.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#9ca3af',
                  fontFamily: 'sans-serif',
                  lineHeight: 1.4,
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
