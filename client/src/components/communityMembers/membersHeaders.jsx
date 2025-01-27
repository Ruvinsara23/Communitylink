

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Filter, Search, UserPlus, Download, MessageSquare } from 'lucide-react'


export function MembersHeader() {
   

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
          <span className="ml-2 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
            1
          </span>
        </Button>
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="pl-8"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite
        </Button>
       
      </div>
    </div>
  )
}

// <Button variant="outline" size="sm">
// <Download className="mr-2 h-4 w-4" />
// Export
// </Button>
// <Button size="sm" className="bg-gray-900">
// <MessageSquare className="mr-2 h-4 w-4" />
// Message
// </Button>