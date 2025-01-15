import { DashboardShell } from "../components/dashboardSell/dashboardShell";
import { StatsCards } from "../components/statsCards/statsCards"
import { ActivityFeed } from "../components/activityFeed/activityFeed"

export default function Home() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <StatsCards />
        <ActivityFeed />
      </div>
    </DashboardShell>
  )
}

