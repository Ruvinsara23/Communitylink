import { useState } from "react";
import axios from "axios";
import Logo from '../../assets/logo.jpg';
import Cover from '../../assets/cover.jpg';

function ProfilePreview() {
  const [coverImage, setCoverImage] = useState(Cover);
  const [profileImage, setProfileImage] = useState(Logo);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleFileChange = (event, imageType) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageType === "bannerImage") {
          setCoverImage(reader.result); // Base64 encoded image
          setCoverImageFile(file);
        } else if (imageType === "communityImage") {
          setProfileImage(reader.result); // Base64 encoded image
          setProfileImageFile(file);
        }
      };
      reader.readAsDataURL(file); // Convert the image file to base64
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
      <div className="relative w-full">
        <img
          src={coverImage}
          alt="Community banner"
          className="object-cover bg-red-500 h-100"
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
            src={profileImage}
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
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">Test Community</h1>
          <p className="text-muted-foreground text-black">By Test User</p>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-purple-700 text-white px-6 py-2 font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-white-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProfilePreview;
