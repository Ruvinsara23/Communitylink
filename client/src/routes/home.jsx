import { DashboardHeader } from "../components/dashboardHeader/dashboardHeader";
import { StatsCards } from "../components/statsCards/statsCards";
import { ActivityFeed } from "../components/activityFeed/activityFeed";


export default function Home() {
  return (
   
   <div className="flex-1 space-y-8 p-8 pt-6">
        <DashboardHeader />
        <div className="flex flex-col gap-6">
   <StatsCards />
    <ActivityFeed />
    </div>
 </div>
  );
}
