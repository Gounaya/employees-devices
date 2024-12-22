import { getDevices, getEmployees } from '@/lib/actions'
import { VisualizationCharts } from '@/components/visualization-charts'

export default async function VisualizationsPage() {
  const [devices, employees] = await Promise.all([getDevices(), getEmployees()])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Data Visualizations</h1>
      <VisualizationCharts devices={devices} employees={employees} />
    </div>
  )
}

