import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Laptop } from 'lucide-react';

function StatCard({ title, count, Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}

export function Dashboard({ employeeCount, deviceCount }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Employees" count={employeeCount} Icon={Users} />
      <StatCard title="Total Devices" count={deviceCount} Icon={Laptop} />
    </div>
  );
}