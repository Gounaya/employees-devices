import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function DeviceDialog({
  isDialogOpen,
  setIsDialogOpen,
  handleSubmit,
  selectedDevice,
  employees,
  isSubmitting,
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedDevice ? 'Edit Device' : 'Add Device'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              name="name"
              defaultValue={selectedDevice?.name}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type">Type</label>
            <Select name="type" defaultValue={selectedDevice?.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Peripheral">Peripheral</SelectItem>
                <SelectItem value="Display">Display</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="owner">Owner</label>
            <Select name="owner" defaultValue={selectedDevice?.owner.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(employee => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : (selectedDevice ? 'Update' : 'Add')} Device
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
