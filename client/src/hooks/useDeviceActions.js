import { useState } from 'react'
import { addDevice, deleteDevice, updateDevice, getDevices } from '@/lib/actions'
import { useToast } from "@/hooks/use-toast"

// Custom hook to split Device components and maintain code
export function useDeviceActions(initialDevices) {
  const [devices, setDevices] = useState(initialDevices)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [filterOwner, setFilterOwner] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || device.type === filterType
    const matchesOwner = filterOwner === 'all' || device.owner.toString() === filterOwner
    return matchesSearch && matchesType && matchesOwner
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      type: formData.get('type'),
      owner: parseInt(formData.get('owner'), 10),
    }

    try {
      if (selectedDevice) {
        await updateDevice(selectedDevice.id, data)
        toast({
          title: "Device Updated",
          description: `${data.name} has been successfully updated.`,
        })
      } else {
        await addDevice(data)
        toast({
          title: "Device Added",
          description: `${data.name} has been successfully added.`,
        })
      }
      const updatedDevices = await getDevices()
      setDevices(updatedDevices)
      setSelectedDevice(null)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${selectedDevice ? 'update' : 'add'} device. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id)
      setDevices(prevDevices => prevDevices.filter(d => d.id !== id))
      toast({
        title: "Device Deleted",
        description: "The device has been successfully deleted.",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to delete device. Please try again.",
        variant: "destructive",
      })
    }
  }

  return {
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
  }
}