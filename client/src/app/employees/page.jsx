import { getEmployees } from '@/lib/actions'
import { EmployeeManagement } from '@/components/employees/EmployeeManagement'

export default async function EmployeesPage() {
  const employees = await getEmployees()
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Employee Management</h1>
      <EmployeeManagement employees={employees} />
    </div>
  )
}