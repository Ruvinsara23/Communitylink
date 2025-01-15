import { DashboardNav } from "../dashboardNav/dashboardNav";
import { DashboardHeader } from "../dashboardHeader/dashboardHeader";

export function DashboardShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1 space-y-8 p-8 pt-6">
        <DashboardHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}
