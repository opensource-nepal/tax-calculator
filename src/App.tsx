import { useState, useMemo } from 'react'
import type { MaritalStatus, TaxResult } from './types'
import { buildTaxResult, useBreakpoints } from './utils'
import { AppHeader } from './components/AppHeader'
import { FormPanel } from './components/FormPanel'
import { ResultsPanel } from './components/ResultsPanel'

export default function App() {
  const [monthly, setMonthly] = useState<number | null>(null)
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('individual')
  const [ssfContribution, setSSFContribution] = useState<number | null>(null)
  const [ssfDeduction, setSSFDeduction] = useState<number | null>(null)
  const [yearlyBonus, setYearlyBonus] = useState<number | null>(null)

  const { isMobile, isDesktop } = useBreakpoints()

  const result = useMemo<TaxResult | null>(() => {
    if (!monthly || monthly <= 0) {
      return null
    }

    return buildTaxResult(
      monthly,
      maritalStatus,
      ssfContribution,
      ssfDeduction,
      yearlyBonus
    )
  }, [monthly, maritalStatus, ssfContribution, ssfDeduction, yearlyBonus])

  let formCol = '100%'
  if (!isMobile) {
    formCol = isDesktop ? '460px' : '380px'
  }
  const headerHeight = isMobile ? 56 : 76

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#f1f5f9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppHeader />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
        }}
      >
        {/* Left Sidebar / Top Mobile */}
        <div
          style={{
            width: isMobile ? '100%' : formCol,
            background: '#fff',
            height: isMobile ? 'auto' : `calc(100vh - ${headerHeight}px)`,
            overflowY: 'auto',
            borderRight: isMobile ? 'none' : '1px solid #e2e8f0',
            boxShadow: isMobile ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
            zIndex: 10,
          }}
        >
          <FormPanel
            monthly={monthly}
            maritalStatus={maritalStatus}
            onMonthlyChange={setMonthly}
            onMaritalStatusChange={setMaritalStatus}
            onSSFChange={(c, d) => {
              setSSFContribution(c)
              setSSFDeduction(d)
            }}
            onBonusChange={setYearlyBonus}
          />
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            height: isMobile ? 'auto' : `calc(100vh - ${headerHeight}px)`,
            overflowY: 'auto',
            background: result ? '#f8fafc' : '#f1f5f9',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
            <ResultsPanel
              result={result}
              monthly={monthly}
              maritalStatus={maritalStatus}
              ssfContribution={ssfContribution}
              ssfDeduction={ssfDeduction}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
