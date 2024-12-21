import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import CommunitySetup from '../../assets/communitysetup.jpg'
import axios from 'axios'
import '../../App.css'



const defultFormfield={
    name:'',
    description:''

}

const  CreateCommunityForm = () => {
  const [formField,setFormField]=useState(defultFormfield);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {name,description }=formField;
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();


    const resetFormFeild=()=>setFormField(defultFormfield);
   
const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormField({...formField,[name]:value})

}

  const handleSubmit =async  (e) => {
    e.preventDefault()
   
try{
    const response=await axios.post('http://localhost:8000/api/community/create-community',{
        name:name,
        description:description,
        bannerImage:'',
        createdBy:'674b8fa06060947df883f105'

    })

     if(response.status===200){
      resetFormFeild();
      setFormSubmitted(true);
      navigate('/setup-community');
     }
     console.log("community created successfully",response);
     

}catch(error){

    console.log("Error In Post request In Community creation ",error)

}

    // console.log('Community Name:', name)
    // console.log('Community Description:', description)
 
    // resetFormFeild()
    // setFormSubmitted(true)
    
  }




  return (
    
    <form onSubmit={handleSubmit} className="space-y-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-black">
    <div className="space-y-2">
      <Label htmlFor="Add name for your community" className="text-2xl font-semibold">Name For your community </Label>
    
      <Input
        id="community-name"
        placeholder="Enter your community name"
        value={name}
        name='name'
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500" 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      
      />
     
     
    </div>
    <div className="space-y-2 ">
      <Label htmlFor="community-description" className="text-2xl font-semibold">Describe About Your Community</Label>
      <Textarea
        id="community-description"
        placeholder="Describe your community"
        value={description}
        name='description'
        onChange={handleChange}
        required
        
      />
    </div>
    <div className="flex justify-end mt-4 ">
  <Button
    type="submit" className="px-6 py-2 bg-purple-700 text-white font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white:500">
    Create Community
  </Button>
</div>

  </form>

  )
}

export default CreateCommunityForm
