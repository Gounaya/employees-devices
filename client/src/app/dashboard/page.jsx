import { Dashboard } from '@/components/dashboard'
import { getDevices, getEmployees } from '@/lib/actions'

export default async function DashboardPage() {
  const [devices, employees] = await Promise.all([
    getDevices(),
    getEmployees()
  ])
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Dashboard employeeCount={employees.length} deviceCount={devices.length} />
    </div>
  )
}

