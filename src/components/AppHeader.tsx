import { Github, Calculator } from 'lucide-react'
import { useBreakpoints } from '../utils'

export function AppHeader() {
  const { isMobile } = useBreakpoints()

  return (
    <div
      style={{
        width: '100%',
        background: '#1e3a5f',
        padding: isMobile ? '12px 16px' : '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: isMobile ? 32 : 44,
            height: isMobile ? 32 : 44,
            background: 'linear-gradient(45deg, #1e293b, #334155)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Calculator size={isMobile ? 18 : 24} color="#38bdf8" strokeWidth={2} />
        </div>
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: '1.5px',
              color: '#64748b',
              textTransform: 'uppercase',
              fontWeight: 700,
              fontFamily: 'sans-serif',
              marginBottom: 1,
            }}
          >
            FY 2081/82 · Income Tax Act 2058
          </div>
          <div
            style={{
              fontSize: isMobile ? 16 : 22,
              fontWeight: 800,
              color: '#f8fafc',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.1,
            }}
          >
            Nepal Tax Calculator
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href="https://github.com/opensource-nepal/tax-calculator"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            width: isMobile ? 34 : 40,
            height: isMobile ? 34 : 40,
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            flexShrink: 0,
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.color = '#fff'
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.borderColor =
              'rgba(255,255,255,0.2)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.color = '#94a3b8'
            ;(e.currentTarget as HTMLElement).style.background =
              'rgba(255,255,255,0.05)'
            ;(e.currentTarget as HTMLElement).style.borderColor =
              'rgba(255,255,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          <Github size={isMobile ? 18 : 22} strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}
