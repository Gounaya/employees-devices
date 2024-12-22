'use client'

import { DeviceDialog } from './DeviceDialog'
import { DeviceTable } from './DeviceTable'
import { Filters } from './Filters'
import { useDeviceActions } from '@/hooks/useDeviceActions'

export function DeviceList({ devices: initialDevices, employees }) {
  const {
    devices,
    filteredDevices,
    selectedDevice,
    setSelectedDevice,
    filterType,
    setFilterType,
    filterOwner,
    setFilterOwner,
    searchTerm,
    setSearchTerm,
    isDialogOpen,
    setIsDialogOpen,
    isSubmitting,
    handleSubmit,
    handleDelete,
  } = useDeviceActions(initialDevices)

  return (
    <div className="space-y-4">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterOwner={filterOwner}
        setFilterOwner={setFilterOwner}
        employees={employees}
        setIsDialogOpen={setIsDialogOpen}
        setSelectedDevice={setSelectedDevice}
      />
      <DeviceTable
        devices={filteredDevices}
        employees={employees}
        handleDelete={handleDelete}
        setSelectedDevice={setSelectedDevice}
        setIsDialogOpen={setIsDialogOpen}
      />
      <DeviceDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleSubmit={handleSubmit}
        selectedDevice={selectedDevice}
        employees={employees}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
