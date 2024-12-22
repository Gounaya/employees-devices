import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export function EmployeeForm({ selectedEmployee, setSelectedEmployee, isDialogOpen, setIsDialogOpen, handleSubmit, isSubmitting }) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => {
          setSelectedEmployee(null);
          setIsDialogOpen(true);
        }}>
          <span className="mr-2">+</span>
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              name="name"
              defaultValue={selectedEmployee?.name}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role">Role</label>
            <Select name="role" defaultValue={selectedEmployee?.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : (selectedEmployee ? 'Update' : 'Add')} Employee
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}