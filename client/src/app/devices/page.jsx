import { getDevices, getEmployees } from '@/lib/actions';
import { DeviceList } from '@/components/devices/device-list';

export default async function DevicesPage() {
  const [devices, employees] = await Promise.all([
    getDevices(),
    getEmployees()
  ])
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Device Management</h1>
      <DeviceList devices={devices} employees={employees} />
    </div>
  )
}

