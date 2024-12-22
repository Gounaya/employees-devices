'use client';

import { useEmployeeList } from '@/hooks/useEmployeeList';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeTable } from './EmployeeTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function EmployeeManagement({ employees: initialEmployees }) {
  const {
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
  } = useEmployeeList(initialEmployees);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Developer">Developer</SelectItem>
            <SelectItem value="Designer">Designer</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <EmployeeForm
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      <EmployeeTable
        filteredEmployees={filteredEmployees}
        setSelectedEmployee={setSelectedEmployee}
        setIsDialogOpen={setIsDialogOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}