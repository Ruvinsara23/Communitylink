
import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import GoogleSignInButton from '../googleSignInButton/googleSignInButton'


const defaultFormField={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm = () => {

    const [formField,setFormField]=useState(defaultFormField)
    const {displayName,email,password,confirmPassword}=formField
    const [passwordError, setPasswordError] = useState("")

    const resetFormFeild=()=>setFormField(defaultFormField)


    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormField({...formField,[name]:value})
        
    }
    const handleSubmit =async (e) => {
        e.preventDefault()
       
        if (password !== confirmPassword) {
          setPasswordError("Passwords do not match")
          return
        }
        setPasswordError("")
        try{
            const response= await axios.post('http://localhost:8000/api/auth/register',{
                displayName:displayName,                
                email:email,
                password:password,
                profilePicture:'',
                authProvider:''

            })
            if(response.status===200){
                console.log("Successfully added user from frontend", response.data)
                resetFormFeild()
            }

        }catch(error){
            console.log("Error in sending data to server",error);
            
        }

      }
    

      // <GoogleSignInButton />
  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
    <div>
      <Label htmlFor="displayName">Name</Label> 
      <Input id="displayName" name="displayName" required value={displayName} onChange={handleChange}/>
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" name="email" type="email" required value={email} onChange={handleChange} />
    </div>
    <div>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        required
        value={password}
        onChange={handleChange}
      />
    </div>
    <div>
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
        value={confirmPassword}
        onChange={handleChange}
      />
    </div>
    {passwordError && <p className="text-red-500">{passwordError}</p>}
    <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-600 focus-visible:ring-blue-500">Sign Up</Button>
    {""?.message && <p className="text-green-500">{"".message}</p>}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t " />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          
        </span>
      </div>
    </div>
  
  </form>
    </div>
  )
}

export default SignUpForm
