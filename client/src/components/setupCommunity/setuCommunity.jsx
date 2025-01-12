

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"

const url={
    intialUrl:''
}



const SetuCommunity = () => {
    // eslint-disable-next-line no-unused-vars
    const [communityUrl, setCommunityUrl] = useState(url)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()

    const handleSave = () => {
        setIsEditing(false)
      }
    
      const handleSubmit=()=>{

        try{
          navigate('/community-home');
          // const response=axios.post('http://localhost:8000/api/community/create-community',{})
          //  console.log(response)
        }catch(error){
          console.log("Error in sending data to server",error);
        }
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
     

    <Button type="sdubmit" onClick={handleSubmit} className="w-full bg-purple-700 text-white text-lg h-12 rounded-2xl hover:bg-indigo-700 transition-all ">
      Continue to Community Page
    </Button>
  </div>
  
  )
}

export default SetuCommunity
