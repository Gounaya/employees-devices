import { useState } from 'react';
import { addEmployee, deleteEmployee, updateEmployee, getEmployees } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";

// Custom hook to split Employee components and maintain code
export function useEmployeeList(initialEmployees) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredEmployees = employees.filter(employee => {
    if (filterRole !== 'all' && employee.role !== filterRole) return false;
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      role: formData.get('role'),
    };

    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, data);
        toast({
          title: "Employee Updated",
          description: `${data.name} has been successfully updated.`,
        });
      } else {
        await addEmployee(data);
        toast({
          title: "Employee Added",
          description: `${data.name} has been successfully added.`,
        });
      }
      const updatedEmployees = await getEmployees();
      setEmployees(updatedEmployees);
      setSelectedEmployee(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${selectedEmployee ? 'update' : 'add'} employee. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(prevEmployees => prevEmployees.filter(e => e.id !== id));
      toast({
        title: "Employee Deleted",
        description: "The employee has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to delete employee. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    employees,
    selectedEmployee,
    setSelectedEmployee,
    filterRole,
    setFilterRole,
    isDialogOpen,
    setIsDialogOpen,
    isSubmitting,
    handleSubmit,
    handleDelete,
    filteredEmployees,
  };
}
