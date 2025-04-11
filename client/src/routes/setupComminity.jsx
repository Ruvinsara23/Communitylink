import SetuCommunity from "../components/setupCommunity/setuCommunity"
import ProfilePreview from "../components/profilePreview/profilePreview"

export const SetUpCommunity = () => {

  
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4">
        <div className="flex justify-center items-center w-full lg:w-1/2 mb-6 lg:mb-0">
          <ProfilePreview />
        </div>
  
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <div className="w-full max-w-md">
            <SetuCommunity />
          </div>
        </div>
      </div>
    )
  }