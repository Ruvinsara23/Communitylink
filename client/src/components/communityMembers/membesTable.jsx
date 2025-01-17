import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'


export function MembersTable() {
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join date</TableHead>
              <TableHead>Lifetime Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    {member.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.email}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>{member.lifetimeValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Showing 1-{members.length} of {members.length}
        </span>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


