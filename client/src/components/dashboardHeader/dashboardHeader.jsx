import { Copy, ChevronDown } from 'lucide-react'
import { Button } from "../ui/button"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
          Home
        </h1>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          nas.io/dollpenguin
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <Copy className="h-3 w-3 text-sky-400" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
          Invite
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
          Create
          <ChevronDown className="ml-2 h-4 w-4 text-white" />
        </Button>
      </div>
    </header>
  )
}