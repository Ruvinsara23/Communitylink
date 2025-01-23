
import { Button } from "../ui/button"
import { Plus, Lightbulb } from 'lucide-react'
import { useState } from "react"
import { CreateEventDialog } from "./createEvent"

export function EventsHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">Events</h1>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
          <Plus className="mr-2 h-4 w-4 text-white" />
          Add Event
        </Button>

      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4 text-sky-400" />
        See community examples
      </div>
      <CreateEventDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
