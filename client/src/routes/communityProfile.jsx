
import { useState } from "react";
import { ImageUpload } from "../components/imageUpload/imageUpload";
import { ChatBubble } from "../components/issues/chatBubble";


export default function CommunityProfile() {
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=96&width=96");

  const handleCoverImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setCoverImage(url);
  };

  const handleProfileImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Banner Image */}
      <ImageUpload
        currentImage={coverImage}
        onImageChange={handleCoverImageChange}
        label="Change Cover Image"
        className="w-full h-64 rounded-lg overflow-hidden"
      />

      {/* Profile Content */}
      <div className="relative px-4">
        {/* Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <ImageUpload
            currentImage={profileImage}
            onImageChange={handleProfileImageChange}
            label="Change Profile Image"
            className="w-24 h-24 rounded-lg border-4 border-white shadow-lg overflow-hidden"
          />
        </div>

        {/* Community Info */}
        <div className="pt-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">abc</h1>
          <p className="text-gray-600 mt-1">By Nimash Sahan</p>
        </div>

        {/* Community Description */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Our Community</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to abc, a vibrant community where creativity meets collaboration. We are dedicated to bringing
            together passionate individuals who share a common interest in innovation and learning. Our community
            focuses on fostering meaningful connections and providing a supportive environment for all members to grow
            and thrive.
          </p>

          {/* Community Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900">5.2K</span>
              <span className="text-sm text-gray-500">Members</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900">142</span>
              <span className="text-sm text-gray-500">Posts</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900">28</span>
              <span className="text-sm text-gray-500">Active Today</span>
            </div>
            <ChatBubble />
          </div>
        </div>
      </div>
    </div>
  );
}
