import { Collapse, InputNumber, Radio, Space } from 'antd'
import type { CollapseProps, RadioChangeEvent } from 'antd'
import type { MaritalStatus } from '../types'
import SSFContribution from './SSFContribution'
import YearlyBonus from './YearlyBonus'
import { SlabReference } from './SlabReference'
import { useBreakpoints } from '../utils'

interface FormPanelProps {
  monthly: number | null
  maritalStatus: MaritalStatus
  onMonthlyChange: (val: number | null) => void
  onMaritalStatusChange: (val: MaritalStatus) => void
  onSSFChange: (c: number | null, d: number | null) => void
  onBonusChange: (val: number | null) => void
}

export function FormPanel({
  monthly,
  maritalStatus,
  onMonthlyChange,
  onMaritalStatusChange,
  onSSFChange,
  onBonusChange,
}: Readonly<FormPanelProps>) {
  const { isMobile, isDesktop } = useBreakpoints()

  const advanceOptionsItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Advance Options',
      children: (
        <>
          <div style={{ marginTop: 8 }}>
            <SSFContribution monthlySalary={monthly} onSSFChange={onSSFChange} />
          </div>
          <div style={{ marginTop: 16 }}>
            <YearlyBonus onBonusChange={onBonusChange} />
          </div>
        </>
      ),
    },
  ]

  return (
    <div
      style={{
        background: '#fff',
        borderRight: isDesktop ? '1px solid #e5e7eb' : 'none',
        borderBottom: !isDesktop ? '1px solid #e5e7eb' : 'none',
        padding: isMobile ? '24px 16px' : '36px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        boxSizing: 'border-box',
      }}
    >
      <div>
        <span className="form-label">Monthly Salary</span>
        <Space.Compact style={{ width: '100%' }}>
          <Space.Addon>NPR</Space.Addon>

          <InputNumber
            size="large"
            style={{ width: '100%' }}
            placeholder="e.g. 80,000"
            formatter={v => (v ? Math.round(v).toLocaleString('en-IN') : '')}
            parser={v => Number((v ?? '').replaceAll(',', ''))}
            min={0}
            max={10_000_000}
            value={monthly}
            onChange={val => onMonthlyChange(val)}
          />
        </Space.Compact>
      </div>

      <div>
        <Radio.Group
          value={maritalStatus}
          onChange={(e: RadioChangeEvent) =>
            onMaritalStatusChange(e.target.value as MaritalStatus)
          }
          style={{ width: '100%', fontFamily: 'sans-serif' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {(['individual', 'couple'] as MaritalStatus[]).map(val => (
              <Radio.Button
                key={val}
                value={val}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  height: 68,
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  border:
                    maritalStatus === val ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  background: maritalStatus === val ? '#eff6ff' : '#fafafa',
                  fontSize: 13,
                  // color: maritalStatus === val ? "#2563eb" : "#374151",
                  lineHeight: 1,
                }}
              >
                <div style={{ fontSize: 20, paddingBottom: 8 }}>
                  {val === 'individual' ? '👤' : '👫'}
                </div>
                <div>{val === 'individual' ? 'Individual' : 'Couple'}</div>
              </Radio.Button>
            ))}
          </div>
        </Radio.Group>
      </div>

      <Collapse
        ghost
        styles={{ header: { padding: 0 }, body: { padding: 0 } }}
        items={advanceOptionsItems}
      />

      {!isMobile && <SlabReference maritalStatus={maritalStatus} />}
    </div>
  )
}
