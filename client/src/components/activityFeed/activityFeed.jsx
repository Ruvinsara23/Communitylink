import { Trophy, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

const activities = [
  {
    icon: Trophy,
    iconClassName: "bg-yellow-100 text-yellow-600",
    content: "Amazing! Your first Post is now published on your feed 🤩",
    time: "1mo",
  },
  {
    icon: Avatar,
    iconContent: "T",
    content: "topedisnestyia (topedis625@nestvia.com) joined your community",
    time: "2mo",
  },
  {
    icon: Gift,
    iconClassName: "bg-pink-100 text-pink-600",
    content: "Nas.io transferred $5 to help you get started",
    time: "2mo",
  },
  {
    icon: Trophy,
    iconClassName: "bg-yellow-100 text-yellow-600",
    content: "You have successfully created a community. Let's go! 🦁",
    time: "2mo",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity</CardTitle>
        <select className="rounded-md border px-2 py-1.5 text-sm">
          <option>all</option>
        </select>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-4">
            {activity.icon === Avatar ? (
              <Avatar className="h-8 w-8">
                <AvatarFallback>{activity.iconContent}</AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.iconClassName}`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
            )}
            <div className="flex flex-1 items-start justify-between">
              <p className="text-sm">{activity.content}</p>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

