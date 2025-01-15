import { Copy, ChevronDown } from 'lucide-react'
import { Button } from "../ui/button"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Home</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          nas.io/dollpenguin
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          Invite
        </Button>
        <Button>
          Create
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}