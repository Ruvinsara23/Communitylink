import { DashboardNav } from "../dashboardNav/dashboardNav";
import { DashboardHeader } from "../dashboardHeader/dashboardHeader";


export function DashboardShell({ children }) {



  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
        <main>{children}</main>
      
    </div>
  );
}
