

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const url={
    intialUrl:''
}

const SetuCommunity = () => {
    // eslint-disable-next-line no-unused-vars
    const [communityUrl, setCommunityUrl] = useState(url)
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = () => {
        setIsEditing(false)
      }

  return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-black">Congrats on setting   up your community!</h2>
    
    <div className="space-y-2 ">
      <Label htmlFor="community-url">We created a URL for your community</Label>
      <div className="flex gap-2 ">
        <Input
          id="community-url"
          value='http://localhost:5173/community/test-community'
          onChange={(e) => setCommunityUrl(e.target.value)}
          disabled={!isEditing}
          className="flex-grow"
        />
       {isEditing ? (
        <Button
          onClick={handleSave}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Save
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Edit
        </Button>
      )}
      </div>
    </div>
     

    <Button className="w-full bg-purple-700 text-white text-lg h-12 rounded-2xl hover:bg-indigo-700 transition-all ">
      Continue to Community Page
    </Button>
  </div>
  
  )
}

export default SetuCommunity
