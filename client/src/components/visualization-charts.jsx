'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function VisualizationCharts({ devices, employees }) {
  const [activeTab, setActiveTab] = useState('devices')

  const deviceTypeData = devices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1
    return acc
  }, {})

  const deviceTypePieData = Object.entries(deviceTypeData).map(([name, value]) => ({ name, value }))

  const employeeRoleData = employees.reduce((acc, employee) => {
    acc[employee.role] = (acc[employee.role] || 0) + 1
    return acc
  }, {})

  const employeeRolePieData = Object.entries(employeeRoleData).map(([name, value]) => ({ name, value }))

  const deviceOwnershipData = devices.reduce((acc, device) => {
    const owner = employees.find(emp => emp.id === device.owner);
    if (owner) {
      acc[owner.name] = (acc[owner.name] || 0) + 1;
    } else {
      acc['Unassigned'] = (acc['Unassigned'] || 0) + 1;
    }
    return acc;
  }, {});

  const deviceOwnershipBarData = Object.entries(deviceOwnershipData)
    .map(([name, value]) => ({ name, devices: value }))
    .sort((a, b) => b.devices - a.devices)
    .slice(0, 5); // Top 5 device owners

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualizations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
          </TabsList>
          <TabsContent value="devices" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceTypePieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceTypePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Device Ownership</CardTitle>
                </CardHeader>
                <CardContent>
                  {deviceOwnershipBarData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={deviceOwnershipBarData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="devices" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px]">
                      <p>No device ownership data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Roles</CardTitle>
              </CardHeader>
              <CardContent>
                {employeeRolePieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={employeeRolePieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {employeeRolePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px]">
                    <p>No employee role data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

