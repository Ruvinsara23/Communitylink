import { Card, CardContent } from "../ui/card"
import { Users, DollarSign, LineChart } from 'lucide-react'

export function StatsCards() {
  return (
    <div className=" grid gap-4 md:grid-cols-3">
      <Card className=" border-blue-400">
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Community Visits
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">3</p>
          </div>
        </CardContent>
      </Card>
      <Card className=" border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Total members
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">
              0 in the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className=" border-purple-600">
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Count Of admins
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm text-muted-foreground">1 admins</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

