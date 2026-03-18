import { Collapse, InputNumber, Space } from 'antd'
import type { CollapseProps } from 'antd'
import type { MaritalStatus } from '../types'
import SSFContribution from './SSFContribution'
import YearlyBonus from './YearlyBonus'
import { SlabReference } from './SlabReference'
import { useBreakpoints } from '../utils'
import { User, Users, ChevronDown } from 'lucide-react'

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
      label: (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: '#374151',
          }}
        >
          Additional Deductions
        </span>
      ),
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

  const statusOptions: {
    val: MaritalStatus
    label: string
    sub: string
    Icon: typeof User
  }[] = [
    { val: 'individual', label: 'Individual', sub: 'Single filer', Icon: User },
    { val: 'couple', label: 'Couple', sub: 'Joint filer', Icon: Users },
  ]

  return (
    <div
      style={{
        background: '#fff',
        borderRight: isDesktop ? '1px solid #e5e7eb' : 'none',
        borderBottom: !isDesktop ? '1px solid #e5e7eb' : 'none',
        padding: isMobile ? '20px 16px' : '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        boxSizing: 'border-box',
      }}
    >
      {/* Salary Input */}
      <div>
        <span className="form-label">Monthly Gross Salary</span>
        <Space.Compact style={{ width: '100%' }}>
          <Space.Addon
            style={{
              background: '#f3f4f6',
              borderRight: '1px solid #d1d5db',
              color: '#374151',
              fontWeight: 600,
              fontSize: 13,
              fontFamily: 'sans-serif',
              minWidth: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            NPR
          </Space.Addon>

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
        <div
          style={{
            marginTop: 5,
            fontSize: 11,
            color: '#9ca3af',
            fontFamily: 'sans-serif',
          }}
        >
          Enter your total monthly income before any deductions
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#f3f4f6' }} />

      {/* Filing Status */}
      <div>
        <span className="form-label" style={{ marginBottom: 10, display: 'block' }}>
          Filing Status
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {statusOptions.map(({ val, label, sub, Icon }) => {
            const isActive = maritalStatus === val
            return (
              <button
                key={val}
                onClick={() => onMaritalStatusChange(val)}
                style={{
                  width: '100%',
                  height: 76,
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  border: isActive ? '2px solid #2563eb' : '1.5px solid #e5e7eb',
                  background: isActive ? '#eff6ff' : '#fafafa',
                  cursor: 'pointer',
                  fontFamily: 'sans-serif',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                  boxShadow: isActive ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  color={isActive ? '#2563eb' : '#6b7280'}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#2563eb' : '#374151',
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: isActive ? '#93c5fd' : '#9ca3af',
                    fontWeight: 400,
                  }}
                >
                  {sub}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#f3f4f6' }} />

      {/* Advanced Options */}
      <Collapse
        ghost
        expandIcon={({ isActive }) => (
          <ChevronDown
            size={14}
            color="#6b7280"
            strokeWidth={2}
            style={{
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        )}
        styles={{ header: { padding: 0 }, body: { padding: '12px 0 0 0' } }}
        items={advanceOptionsItems}
      />

      {!isMobile && (
        <>
          <div style={{ height: 1, background: '#f3f4f6' }} />
          <SlabReference maritalStatus={maritalStatus} />
        </>
      )}
    </div>
  )
}
