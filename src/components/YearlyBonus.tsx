import { Checkbox, InputNumber, Space } from 'antd'
import { useEffect, useState } from 'react'

interface YearlyBonusProps {
  onBonusChange: (val: number | null) => void
}

export default function YearlyBonus({ onBonusChange }: Readonly<YearlyBonusProps>) {
  const [bonusEnabled, setBonusEnabled] = useState(false)
  const [bonus, setBonus] = useState<number | null>(0)

  const handleChange = () => {
    if (bonusEnabled) {
      onBonusChange(bonus)
    } else {
      onBonusChange(null)
    }
  }

  useEffect(() => {
    handleChange()
  })

  return (
    <div style={{ padding: '4px 0' }}>
      <Checkbox
        style={{ fontWeight: 500, color: '#374151', fontFamily: 'sans-serif' }}
        onChange={e => {
          setBonusEnabled(e.target.checked)
          handleChange()
        }}
      >
        Include Yearly Bonus
      </Checkbox>

      {bonusEnabled && (
        <div
          className="result-animate"
          style={{
            marginTop: 12,
            padding: 12,
            background: '#f8fafc',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
          }}
        >
          <span className="form-label" style={{ fontSize: 10, color: '#94a3b8' }}>
            Annual Bonus Amount
          </span>
          <Space.Compact style={{ width: '100%' }}>
            <Space.Addon
              style={{
                background: '#fff',
                borderRight: '1px solid #d1d5db',
                fontSize: 11,
                color: '#64748b',
              }}
            >
              NPR
            </Space.Addon>
            <InputNumber
              size="middle"
              style={{ width: '100%', fontSize: 13 }}
              placeholder="e.g. 50,000"
              formatter={v => (v ? Math.round(v).toLocaleString('en-IN') : '')}
              parser={v => Number((v ?? '').replaceAll(',', ''))}
              min={0}
              max={10_000_000}
              value={bonus}
              onChange={val => {
                setBonus(val)
                handleChange()
              }}
              disabled={!bonusEnabled}
            />
          </Space.Compact>
          <div
            style={{
              marginTop: 6,
              fontSize: 11,
              color: '#94a3b8',
              fontFamily: 'sans-serif',
            }}
          >
            This will be added to your annual taxable income.
          </div>
        </div>
      )}
    </div>
  )
}
