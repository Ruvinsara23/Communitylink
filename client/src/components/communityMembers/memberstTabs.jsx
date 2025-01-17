

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"


export function MembersTabs() {
    const members=[
        {
          id: '1',
          name: 'jhkhasfhk',
          email: 'woyagap630@wirelay.com',
          avatar: 'J',
          status: 'Subscribed',
          joinDate: '16 Jan 2025',
          lifetimeValue: '-',
          role: 'member'
        },
        {
          id: '2',
          name: 'topedisnestyia',
          email: 'topedis625@nestvia.com',
          avatar: 'T',
          status: 'Subscribed',
          joinDate: '30 Oct 2024',
          lifetimeValue: '-',
          role: 'manager'
        },
        {
          id: '3',
          name: 'Nimash Sahan',
          email: 'nimashs877@gmail.com',
          avatar: 'N',
          status: 'Subscribed',
          joinDate: '29 Oct 2024',
          lifetimeValue: '-',
          role: 'member'
        }
      ]

  
  const counts = {
    all: members.length,
    members: members.filter(m => m.role === 'member').length,
    managers: members.filter(m => m.role === 'manager').length,
    abandoned: 0
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-4 bg-transparent p-0 md:flex md:grid-cols-none">
        <TabsTrigger
          value="all"
          className="gap-2 border bg-muted/50 data-[state=active]:bg-background"
        >
          All
          <span className="rounded-full bg-muted px-1.5 text-xs">
            {counts.all}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className="gap-2 border bg-muted/50 data-[state=active]:bg-background"
        >
          Members
          <span className="rounded-full bg-muted px-1.5 text-xs">
            {counts.members}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="managers"
          className="gap-2 border bg-muted/50 data-[state=active]:bg-background"
        >
          Managers
          <span className="rounded-full bg-muted px-1.5 text-xs">
            {counts.managers}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="abandoned"
          className="gap-2 border bg-muted/50 data-[state=active]:bg-background"
        >
          Abandoned Checkout
          <span className="rounded-full bg-muted px-1.5 text-xs">
            {counts.abandoned}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

