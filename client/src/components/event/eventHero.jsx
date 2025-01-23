import { Button } from "../ui/button"
import { EventList } from "./eventCardList"

export function EventsHero() {
  return (
    <div className="space-y-4 py-8">
      <h2 className="text-3xl font-bold">Live Events increase a communitys engagement by 38%</h2>
      <p className="text-lg text-muted-foreground">
        Connect and grow your audience through Weekly meetups or webinars with guest speakers.
      </p>
      <div className="flex gap-4">
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Create Event</Button>
        <Button variant="outline">Learn more</Button>
      </div>
      <div className="space-y-4 py-8">
      <EventList />
      </div>
    </div>
  )
}