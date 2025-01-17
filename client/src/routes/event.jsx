import { EventsHeader } from "../components/event/eventsHeader.jsx"
import { EventsTabs } from "../components/event/eventsTabs.jsx"
import { EventsHero } from "../components/event/eventHero.jsx"


export default function EventsPage() {
  return (
    <div className="container mx-auto max-w-5xl space-y-8 p-8">
      <EventsHeader />
      <EventsTabs />
      <EventsHero />
    </div>
  )
}
