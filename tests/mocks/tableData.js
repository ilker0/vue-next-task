const mockTabledata = new Array(200).fill({}).map((_, index) => ({
  personCode: `${index}`,
  name: `Name ${index}`,
  surname: `Surname ${index}`,
  department: `Department ${index}`,
  salary: `Salary ${index}`,
  level: `${index % 3}`
}))

export { mockTabledata }
