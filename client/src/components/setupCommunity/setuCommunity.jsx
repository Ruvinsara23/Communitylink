

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const url={
    intialUrl:''
}

const SetuCommunity = () => {
    const [communityUrl, setCommunityUrl] = useState(url)
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = () => {
        setIsEditing(false)
      }

  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold">Congrats on setting   up your community!</h2>
    
    <div className="space-y-2">
      <Label htmlFor="community-url">We created a URL for your community</Label>
      <div className="flex gap-2">
        <Input
          id="community-url"
          value={communityUrl}
          onChange={(e) => setCommunityUrl(e.target.value)}
          disabled={!isEditing}
          className="flex-grow"
        />
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>

    <Button className="w-full bg-primary text-white text-lg h-12 rounded-2xl">
      Continue to Community Page
    </Button>
  </div>
  )
}

export default SetuCommunity
