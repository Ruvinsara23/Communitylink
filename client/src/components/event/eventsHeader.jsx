
import { Button } from "../ui/button"
import { Plus, Lightbulb } from 'lucide-react'
import { useState } from "react"
import { CreateEventDialog } from "./createEvent"

export function EventsHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Events</h1>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-yellow-400 text-black hover:bg-yellow-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        See community examples
      </div>
      <CreateEventDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
