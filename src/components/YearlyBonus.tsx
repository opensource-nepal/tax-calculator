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
    <>
      <Checkbox
        onChange={e => {
          setBonusEnabled(e.target.checked)
          handleChange()
        }}
      >
        Yearly Bonus
      </Checkbox>
      <Space.Compact style={{ width: '100%', marginTop: 8 }}>
        <Space.Addon>NPR</Space.Addon>

        <InputNumber
          size="medium"
          style={{ width: '100%' }}
          placeholder=""
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
    </>
  )
}
