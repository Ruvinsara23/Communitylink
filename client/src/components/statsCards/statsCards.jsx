import { Card, CardContent } from "../ui/card"
import { Users, DollarSign, LineChart } from 'lucide-react'

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Community Visits
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">2</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Total members
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">
              0 in the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              January Earnings
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">USD 0</p>
            <p className="text-sm text-muted-foreground">0 Sales</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

