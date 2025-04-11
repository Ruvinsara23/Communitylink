import { MembersHeader } from "../components/communityMembers/membersHeaders"
import { MembersTable } from "../components/communityMembers/membesTable"
import { MembersTabs } from "../components/communityMembers/memberstTabs"


export default function MembePagrse() {
  return (
    
      <div className="flex-1 space-y-8 p-8 pt-6">
        <MembersHeader />
        <div className="space-y-4">
          <MembersTabs />
          <MembersTable />
        </div>
      </div>
  
  )
}