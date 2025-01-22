import { Button } from "../ui/button"
import { EventList } from "./eventCardList"

export function EventsHero() {
  return (
    <div className="space-y-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800">
  Live Events increase a community's engagement by 38%
</h2>

      <p className="text-lg text-muted-foreground">
        Connect and grow your audience through Weekly meetups or webinars with guest speakers.
      </p>
      <div className="flex gap-4">
      <Button className="bg-blue-700 text-white hover:bg-blue-800">Create Event</Button>
      <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white">Learn More</Button>
      </div>
      <div className="space-y-4 py-8">
      <EventList />
      </div>
    </div>
  )
}