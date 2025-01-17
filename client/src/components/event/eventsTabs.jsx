import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export function EventsTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList>
        <TabsTrigger value="upcoming">
          Upcoming
        </TabsTrigger>
        <TabsTrigger value="past">
          Past
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}