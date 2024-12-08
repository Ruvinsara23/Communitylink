import CreateCommunityForm from "../components/createCommunityForm/createCommunityForm"

import Login from '../assets/login.svg'
import { Outlet } from "react-router"

export const CreateCommunity = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
   
    <div className="flex max-w-screen relative lg:w-1/2 w-full">
      <img
        src={Login}
        alt="Community illustration"
        className="w-full h-auto object-cover"
      />
    </div>

    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md">
      <Outlet />
        <CreateCommunityForm />
       
      </div>
    </div>
  </div>
  )
}


