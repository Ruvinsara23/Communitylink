import { createContext,useState,useContext} from "react";

export const UserContext = createContext({
    currentUser:"674bf3a07e5eb5e5968c12db",   
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