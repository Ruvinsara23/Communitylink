
import { useState,useContext} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleSignInButton from '../googleSignInButton/googleSignInButton'
import {signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../../utils/config/firebase.js'
import { useNavigate } from 'react-router'
import { useUser } from '../../context/user.context.jsx'
import axios from 'axios'



const defaultFormField={
    email:'',
    password:'',
}

const SignInForm = () => {

    const [formField,setFormField]=useState(defaultFormField);
    const {email,password}=formField;
    const [passwordError, setPasswordError] = useState("");
    const navigate=useNavigate();
    const {currentUser,setCurrentUser}=useUser();

    const resetFormFeild=()=>setFormField(defaultFormField)

    const fetchUser = async (firebaseUID) => {
      try {
          const response = await axios.get(`http://localhost:8000/api/auth/user/${firebaseUID}`);
          setCurrentUser(response.data);
          
      } catch (error) {
          console.error('Error fetching user:', error);
      }
  };



    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormField({...formField,[name]:value})
        
    }
    const handleSubmit =async (e) => {
        e.preventDefault()
        
        try{
            // const response= await axios.post('http://localhost:8000/api/auth/login',{
            //     email:email,
            //     password:password,

            // })

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userData = await userCredential.user
        const firebaseUID = userData.uid;
        // setCurrentUser(userData);
        console.log("this is user",userData)
            if(!userCredential){
                setPasswordError()
                
            }else{
                console.log("Login request 200", userCredential.data)
                resetFormFeild()
                fetchUser(firebaseUID);
                navigate('/');
                console.log("navgate successfully");
                
             

            }

        }catch(error){
            console.log("Error in sending data to server from",error);
            
        }

      }
    


  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
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
    {passwordError && <p className="text-red-500">{passwordError}</p>}
    <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-600 focus-visible:ring-blue-500" >Sign In</Button>
    {""?.message && <p className="text-green-500">{"".message}</p>}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
        <div className="w-full text-blue-900 via-purple-900">
          Or continue with
          </div>
        </span>
      </div>
    </div>
    <GoogleSignInButton />
  </form>
    </div>
  )
}

export default SignInForm
