
import { Button } from "@/components/ui/button"
import { signInWithPopup,signOut} from "firebase/auth"
import { auth,provider } from "../../utils/config/firebase"
import { useState} from "react"
import axios from "axios"

const GoogleSignInButton = () => {

  
  const [isLoading, setIsLoading] = useState(false);


// const handleGooglelogin=async()=>{
//   try{
//     const userCredential = await  signInWithPopup(auth, provider);
//     const userData = await userCredential.user
//     console.log("user data",userData);
//     if(!userCredential){
//       console.log("Eroor In user credintial")
//     }else{
//      console.log("user create successfully")
//     }

//   }catch(error){
//     console.log("user creation error in google auth",error)

//   }

 



// }
const handleGooglelogin = async () => {
  setIsLoading(true);
  try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("User data", user);
      setIsLoading(false);
 

      // const userdata={
      //   firebaseUID:user.uid,
      //   displayName:user.displayName ||"",
      //   email:user.email || "",
      //   profilePicture:'',
      //   authProvider:"google",
      // }

      const response = await axios.post('http://localhost:8000/api/auth/register-google',{
        firebaseUID:user.uid,
        displayName:user.displayName ||"",
        email:user.email || "",
        profilePicture:'',
        authProvider:"google",
      });

      console.log("send data successfully to backend",response)

  } catch (error) {
      console.error("User creation error in Google auth", error);
      setIsLoading(false);
  }
};

const handleGoogleSignOut=async()=>{
    try{
    await signOut(auth)
     console.log("signout successfully");
    }catch(error){
      console.log("Error in signOut",error);
    }
}


  return (
    <div>
    <Button type="submit" variant="outline" className="w-full" onClick={handleGooglelogin}   disabled={isLoading}>
    {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
    <Button type="submit" variant="outline" className="w-full" onClick={handleGoogleSignOut}   disabled={isLoading}>
SignOut
    </Button>

    </div>
    
  )
}

export default GoogleSignInButton
