import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

export function DeviceTable({
  devices,
  employees,
  handleDelete,
  setSelectedDevice,
  setIsDialogOpen,
}) {
  return (
    <div className="rounded-lg border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium">Name</th>
            <th className="text-left p-4 font-medium">Type</th>
            <th className="text-left p-4 font-medium">Owner</th>
            <th className="text-left p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id} className="border-b">
              <td className="p-4">{device.name}</td>
              <td className="p-4">{device.type}</td>
              <td className="p-4">{employees.find(e => e.id === device.owner)?.name}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedDevice(device)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(device.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
