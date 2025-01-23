import { Card, CardContent } from "../ui/card"
import { Users, DollarSign, LineChart } from 'lucide-react'

export function StatsCards() {
  return (
<div className="grid gap-4 md:grid-cols-3">
  <Card className="border-2 border-blue-500 rounded-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-2">
        <LineChart className="h-4 w-4 text-blue-500" />
        <h3 className="text-sm font-medium text-blue-500">
          Community Visits
        </h3>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-2xl font-bold text-black">2</p>
      </div>
    </CardContent>
  </Card>
  <Card className="border-2 border-purple-500 rounded-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-purple-500" />
        <h3 className="text-sm font-medium text-purple-500">
          Total members
        </h3>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-2xl font-bold text-black">2</p>
        <p className="text-sm text-black">
          0 in the last 30 days
        </p>
      </div>
    </CardContent>
  </Card>
  <Card className="border-2 border-blue-600 rounded-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-medium text-blue-600">
          January Earnings
        </h3>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-2xl font-bold text-black">USD 0</p>
        <p className="text-sm text-black">0 Sales</p>
      </div>
    </CardContent>
  </Card>
</div>




  )
}

