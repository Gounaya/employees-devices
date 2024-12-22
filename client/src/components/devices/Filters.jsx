import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function Filters({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterOwner,
  setFilterOwner,
  employees,
  setIsDialogOpen,
  setSelectedDevice,
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Input
        placeholder="Search device name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-[200px]"
      />
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Laptop">Laptop</SelectItem>
          <SelectItem value="Peripheral">Peripheral</SelectItem>
          <SelectItem value="Display">Display</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterOwner} onValueChange={setFilterOwner}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Owner" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Owners</SelectItem>
          {employees.map(employee => (
            <SelectItem key={employee.id} value={employee.id.toString()}>
              {employee.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="ml-auto">
        <Button onClick={() => {
          setSelectedDevice(null)
          setIsDialogOpen(true)
        }}>
          <span className="mr-2">+</span>
          Add Device
        </Button>
      </div>
    </div>
  )
}