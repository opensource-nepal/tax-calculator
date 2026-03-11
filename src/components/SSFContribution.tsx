import { Checkbox, Col, InputNumber, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { fmt } from '../utils'

const contributionStyle = {
  fontSize: 12,
  color: '#888d94',
  fontFamily: 'sans-serif',
  textTransform: 'uppercase',
}

interface SSFContributionProps {
  monthlySalary: number | null
  onSSFChange: (contribution: number | null, deduction: number | null) => void
}

export default function SSFContribution({
  monthlySalary,
  onSSFChange,
}: Readonly<SSFContributionProps>) {
  const [ssfEnabled, setSSFEnabled] = useState(false)
  const [basicSalaryPer, setBasicSalaryPer] = useState<number | null>(60)
  const [employeeContributionPer, setEmployeeContributionPer] = useState<number | null>(
    11
  )
  const [employerContributionPer, setEmployerContributionPer] = useState<number | null>(
    20
  )

  const getMonthlySSF = () => {
    if (
      !(
        ssfEnabled &&
        monthlySalary &&
        basicSalaryPer &&
        employeeContributionPer &&
        employerContributionPer
      )
    ) {
      return {
        contribution: null,
        deduction: null,
      }
    }

    const employeeSSF =
      (monthlySalary * basicSalaryPer * employeeContributionPer) / 10000
    const employerSSF =
      (monthlySalary * basicSalaryPer * employerContributionPer) / 10000

    return {
      contribution: employerSSF,
      deduction: employeeSSF + employerSSF,
    }
  }

  const handleChange = () => {
    const { contribution, deduction } = getMonthlySSF()
    onSSFChange(contribution, deduction)
  }

  useEffect(() => {
    handleChange()
  })

  return (
    <>
      <Checkbox
        onChange={e => {
          setSSFEnabled(e.target.checked)
          handleChange()
        }}
      >
        SSF (Social Security Fund)
      </Checkbox>
      <Row gutter={8} style={{ marginTop: 8 }}>
        <Col span={12}>
          <span className="form-label">Basic Salary</span>
          <Space.Compact>
            <InputNumber
              style={{ width: '100%' }}
              value={basicSalaryPer}
              disabled={!ssfEnabled}
              max={100}
              min={0}
              onChange={v => {
                setBasicSalaryPer(v)
                handleChange()
              }}
            />
            <Space.Addon>%</Space.Addon>
          </Space.Compact>
          <div style={contributionStyle}>
            {ssfEnabled && monthlySalary && basicSalaryPer
              ? fmt((monthlySalary * basicSalaryPer) / 100)
              : 'NPR N/A'}
          </div>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: 8, marginBottom: 8 }}>
        <Col span={12}>
          <span className="form-label">Employee Contribution</span>
          <Space.Compact>
            <InputNumber
              style={{ width: '100%' }}
              value={employeeContributionPer}
              disabled={!ssfEnabled}
              max={100}
              min={0}
              onChange={v => {
                setEmployeeContributionPer(v)
                handleChange()
              }}
            />
            <Space.Addon>%</Space.Addon>
          </Space.Compact>
          <div style={contributionStyle}>
            {ssfEnabled && monthlySalary && basicSalaryPer && employeeContributionPer
              ? fmt((monthlySalary * basicSalaryPer * employeeContributionPer) / 10000)
              : 'NPR N/A'}
          </div>
        </Col>
        <Col span={12}>
          <span className="form-label">Employer Contribution</span>
          <Space.Compact>
            <InputNumber
              style={{ width: '100%' }}
              value={employerContributionPer}
              disabled={!ssfEnabled}
              max={100}
              min={0}
              onChange={v => {
                setEmployerContributionPer(v)
                handleChange()
              }}
            />
            <Space.Addon>%</Space.Addon>
          </Space.Compact>
          <div style={contributionStyle}>
            {ssfEnabled && monthlySalary && basicSalaryPer && employerContributionPer
              ? fmt((monthlySalary * basicSalaryPer * employerContributionPer) / 10000)
              : 'NPR N/A'}
          </div>
        </Col>
      </Row>
      <div style={{ ...contributionStyle, fontWeight: 'bold' }}>
        Monthly SSF: {fmt(getMonthlySSF()?.deduction)}
      </div>
    </>
  )
}
