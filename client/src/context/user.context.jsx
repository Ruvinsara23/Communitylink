import { createContext,useState,useContext} from "react";

export const UserContext = createContext({
    currentUser:"",   
    setCurrentUser:()=>null,

});

export const useUser = () => useContext(UserContext);
export const UserProvider =({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
        
    return(
        <UserContext.Provider value={{ currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}