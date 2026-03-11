import { GithubOutlined } from '@ant-design/icons'
import { useBreakpoints } from '../utils'

export function AppHeader() {
  const { isMobile } = useBreakpoints()

  return (
    <div
      style={{
        width: '100%',
        background: '#1e3a5f',
        padding: isMobile ? '14px 16px' : '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 4,
            height: isMobile ? 28 : 36,
            background: 'linear-gradient(180deg, #60a5fa, #34d399)',
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: '2px',
              color: '#94a3b8',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            FY 2081/82 · Income Tax Act 2058
          </div>
          <div
            style={{
              fontSize: isMobile ? 16 : 22,
              fontWeight: 700,
              color: '#f1f5f9',
              fontFamily: 'Georgia, serif',
              lineHeight: 1.2,
            }}
          >
            Nepal Income Tax Calculator
          </div>
        </div>
      </div>
      <div style={{ fontSize: isMobile ? 26 : 32, flexShrink: 0 }}>
        <a
          href="https://github.com/opensource-nepal/tax-calculator"
          target="_blank"
          style={{ color: 'white' }}
          rel="noreferrer"
        >
          <GithubOutlined />
        </a>
      </div>
    </div>
  )
}
