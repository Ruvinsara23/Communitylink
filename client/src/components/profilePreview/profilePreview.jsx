import  { useState } from "react";
import axios from "axios";
import Logo from '../../assets/logo.jpg'
import Cover from '../../assets/cover.jpg'


function ProfilePreview() {
    const [coverImage, setCoverImage] = useState("/placeholder.svg?height=250&width=400");
    const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100");
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);


    const handleFileChange = (event, imageType) => {
        const file = event.target.files?.[0];
        if (imageType === "bannerImage") {
            setCoverImageFile(file);
            setCoverImage(URL.createObjectURL(file));
        } else if (imageType === "communityImage") {
            setProfileImageFile(file);
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!coverImageFile && !profileImageFile) {
            alert("Please select images to upload.");
            return;
        }

        const formData = new FormData();
        if (coverImageFile) formData.append("bannerImage", coverImageFile);
        if (profileImageFile) formData.append("communityImage", profileImageFile);

        try {
            const response = await axios.put(
                "http://localhost:8000/api/community/6752bb9b0f8378f697ea126f/upload-images",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                const { communityImage, bannerImage } = response.data;
                if (communityImage) setProfileImage(communityImage);
                if (bannerImage) setCoverImage(bannerImage);
                alert("Images uploaded successfully!");
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="relative w-full ">
                <img
                    src={Cover}
                    alt="Community banner"
                    className="object-cover bg-red-500  h-100"
                />
                <label className="absolute w-auto inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, "bannerImage")}
                        accept="image/*"
                    />
                    <span className="text-white text-xs">Edit</span>
                </label>
            </div>

            <div className="relative -mt-12 flex justify-center">
                <div className="rounded-2xl bg-white p-2 shadow-lg">
                    <img
                        src={Logo}
                        alt="Profile avatar"
                        width={80}
                        height={80}
                        className="rounded-xl"
                    />
                    <label className="absolute -mt-24 w-[80px] h-[80px] flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, "communityImage")}
                            accept="image/*"
                        />
                        <span className="text-white text-xs">Edit</span>
                    </label>
                </div>
            </div>

            <div className="p-6 text-center space-y-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Dollpenguin</h1>
                    <p className="text-muted-foreground">By Nimash Sahan</p>
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default ProfilePreview;





// import cover from '../../assets/cover.jpg'
// import profile from '../../assets/profile.jpeg'
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { useState } from 'react'
// import axios from "axios";

// const ProfilePreview = () => {
//     const [coverImage, setCoverImage] = useState("/placeholder.svg?height=250&width=400")
//     const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")

//     const handleImageUpload = async (event, imageType) => {
//       const file = event.target.files?.[0];
//       if (file) {
//         const formData = new FormData();
//         formData.append(imageType, file);
    
//         try {
//           const response = await axios.post(
//             'http://localhost:8000/api/community/6752bb9b0f8378f697ea126f/upload-images',
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
          
//           if (response.status === 200) {
//             const { communityImage, bannerImage } = response.data;
//             if (imageType === "communityImage" && communityImage) setProfileImage(communityImage);
//             if (imageType === "bannerImage"  && bannerImage) setCoverImage(bannerImage);
//           }
//         } catch (error) {
//           console.error("Image upload failed:", error);
//         }
//       }
//     };
    






//   return (

//     <div className="max-w-md mx-auto p-4">
//     <Card className="overflow-hidden bg-white rounded-3xl">
    
//       <div className="relative w-full h-48">
//         <img
//           src={cover }
//           alt="Community banner"
//           className="object-cover bg-red-500"
          
//         />
//         <label className="absolute w-auto inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
//           <Input 
//             type="file" 
//             className="hidden" 
//             onChange={(e) => handleImageUpload(e, "communityImage")}
//             accept="image/*"
//           />
//           <span className="text-white text-xs">Edit</span>
//         </label>
//       </div>

     
//       <div className="relative -mt-12 flex justify-center">
//         <div className="rounded-2xl bg-white p-2 shadow-lg">
//           <img
//             src={profile}
//             alt="Profile avatar"
//             width={80}
//             height={80}
//             className="rounded-xl"
//           />
//           <label className="absolute -mt-24 w-[80px] h-[80px] flex align-middle  items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
//           <Input 
//             type="file" 
//             className="hidden" 
//             onChange={(e) => handleImageUpload(e, "communityImage")}
//             accept="image/*"
//           />
//           <span className="text-white text-xs">Edit</span>
//         </label>
//         </div>
//       </div>

  
//       <div className="p-6 text-center space-y-6">
//         <div className="space-y-1">
//           <h1 className="text-2xl font-bold tracking-tight">Dollpenguin</h1>
//           <p className="text-muted-foreground">By Nimash Sahan</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 rounded-2xl bg-muted/50 p-4">
//           <div className="space-y-1">
//             <p className="text-sm text-muted-foreground">Members</p>
//             <p className="text-2xl font-bold">2</p>
//           </div>
//           <div className="space-y-1">
//             <p className="text-sm text-muted-foreground">Access</p>
//             <p className="text-2xl font-bold">Free</p>
//           </div>
//         </div>
//       </div>
//     </Card>
//   </div>
//   )
// }

// export default ProfilePreview
