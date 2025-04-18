import { Copy, ChevronDown } from 'lucide-react';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom'; 
import Notifications from "../notification/notification"// Ensure this is imported from 'react-router-dom'

export function DashboardHeader() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCreateClick = () => {
    navigate('/create-community'); // Redirect to /create-community
  };

  return (
    <header className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Home</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          /tech-enthusiasts
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          Invite
        </Button>
        <Button 
          onClick={handleCreateClick} 
          className="bg-blue-700 text-white font-bold px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition-colors"
        >
          Create
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <div className="flex items-center gap-4">
        <Notifications />
      </div>
      </div>
    </header>
  );
}
