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
    formCol = isDesktop ? '460px' : '360px'
  }
  const headerHeight = isMobile ? 68 : 76

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f8faff 0%, #eef2ff 50%, #f0fdf4 100%)',
        fontFamily: "'Georgia', serif",
        boxSizing: 'border-box',
      }}
    >
      <AppHeader />

      {isMobile ? (
        /* Mobile view */
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          <ResultsPanel
            result={result}
            monthly={monthly}
            maritalStatus={maritalStatus}
            ssfContribution={ssfContribution}
            ssfDeduction={ssfDeduction}
          />
        </div>
      ) : (
        /* Tablet / Desktop view */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${formCol} 1fr`,
            minHeight: `calc(100vh - ${headerHeight}px)`,
            width: '100%',
            boxSizing: 'border-box',
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
          <ResultsPanel
            result={result}
            monthly={monthly}
            maritalStatus={maritalStatus}
            ssfContribution={ssfContribution}
            ssfDeduction={ssfDeduction}
          />
        </div>
      )}
    </div>
  )
}
