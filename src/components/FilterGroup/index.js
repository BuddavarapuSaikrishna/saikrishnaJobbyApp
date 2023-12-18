import './index.css'

const FilterGroup = props => {
  const renderEmploymentList = () => {
    const {employmentTypesList} = props
    return (
      <div className="EmploymentList-container">
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="Employment-ListItems-container">
          {employmentTypesList.map(eachItem => {
            const {getEmploymentType} = props
            const onChangeEmployId = event => {
              getEmploymentType(event.target.value)
            }

            return (
              <li
                className="list-items-filter-group"
                key={eachItem.employmentTypeId}
                onChange={onChangeEmployId}
              >
                <input
                  id={eachItem.employmentTypeId}
                  type="checkbox"
                  value={eachItem.employmentTypeId}
                />
                <label htmlFor={eachItem.employmentTypeId}>
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryList = () => {
    const {salaryRangesList} = props
    return (
      <div className="SalaryRangeList-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="Salary-ListItems-container">
          {salaryRangesList.map(eachItem => {
            const {getSalary} = props
            const onChangeSalary = event => {
              getSalary(event.target.value)
            }
            return (
              <li
                className="list-items-filter-group"
                key={eachItem.salaryRangeId}
                onChange={onChangeSalary}
              >
                <input
                  id={eachItem.salaryRangeId}
                  type="radio"
                  name="option"
                  value={eachItem.salaryRangeId}
                />
                <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="FilterGroup-container">
      {renderEmploymentList()}
      <hr className="horizontal-line" />
      {renderSalaryList()}
    </div>
  )
}

export default FilterGroup
