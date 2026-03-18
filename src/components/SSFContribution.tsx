import { Checkbox, Col, InputNumber, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { fmt } from '../utils'

const contributionStyle = {
  fontSize: 12,
  color: '#888d94',
  fontFamily: 'sans-serif',
  marginTop: 2,
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
    <div style={{ padding: '4px 0' }}>
      <Checkbox
        style={{ fontWeight: 500, color: '#374151', fontFamily: 'sans-serif' }}
        onChange={e => {
          setSSFEnabled(e.target.checked)
          handleChange()
        }}
      >
        Social Security Fund (SSF)
      </Checkbox>

      {ssfEnabled && (
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
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <span className="form-label" style={{ fontSize: 10, color: '#94a3b8' }}>
                Basic Salary % of Gross
              </span>
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber
                  style={{ width: '100%', fontSize: 13 }}
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
                Amount:{' '}
                <span style={{ color: '#64748b', fontWeight: 600 }}>
                  {monthlySalary && basicSalaryPer
                    ? fmt((monthlySalary * basicSalaryPer) / 100)
                    : 'NPR 0'}
                </span>
              </div>
            </Col>

            <Col span={12}>
              <span className="form-label" style={{ fontSize: 10, color: '#94a3b8' }}>
                Employee Contribution
              </span>
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber
                  style={{ width: '100%', fontSize: 13 }}
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
                <span style={{ color: '#64748b', fontWeight: 600 }}>
                  {monthlySalary && basicSalaryPer && employeeContributionPer
                    ? fmt(
                        (monthlySalary * basicSalaryPer * employeeContributionPer) /
                          10000
                      )
                    : 'N/A'}
                </span>
              </div>
            </Col>

            <Col span={12}>
              <span className="form-label" style={{ fontSize: 10, color: '#94a3b8' }}>
                Employer Contribution
              </span>
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber
                  style={{ width: '100%', fontSize: 13 }}
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
                <span style={{ color: '#64748b', fontWeight: 600 }}>
                  {monthlySalary && basicSalaryPer && employerContributionPer
                    ? fmt(
                        (monthlySalary * basicSalaryPer * employerContributionPer) /
                          10000
                      )
                    : 'N/A'}
                </span>
              </div>
            </Col>
          </Row>

          <div
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: '1px solid #e2e8f0',
              fontSize: 12,
              fontWeight: 600,
              color: '#1e3a5f',
              fontFamily: 'sans-serif',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Total Monthly SSF</span>
            <span style={{ fontFamily: 'monospace' }}>
              {fmt(getMonthlySSF()?.deduction ?? 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
