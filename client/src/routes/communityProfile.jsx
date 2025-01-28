import { useState } from "react";
import { ImageUpload } from "../components/imageUpload/imageUpload";
import { useCommunity } from "../context/community.context";
import axios from "axios";

export default function CommunityProfile() {
  const {
   communityImage,
   bannerImage,
    description,
    setCommunityImage,
    setBannerImage,
    setDescription,
    communityId,
    name
  } = useCommunity();

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const handleCoverImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setBannerImage(url);
    // Optionally upload the new cover image to the server
    uploadImage(file, "bannerImage");
  };

  const handleProfileImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setCommunityImage(url);
    // Optionally upload the new profile image to the server
    uploadImage(file, "communityImage");
  };

  const uploadImage = async (file, imageType) => {
    const formData = new FormData();
    formData.append(imageType, file);

    try {
      await axios.put(
        `http://localhost:8000/api/community/${communityId}/upload-images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      console.error(`Failed to upload ${imageType}:`, error);
    }
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/community/${communityId}/update-description`,
        { description: newDescription },
        { headers: { "Content-Type": "application/json" } }
      );
      setDescription(newDescription);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Failed to update description:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Banner Image */}
      <ImageUpload
        currentImage={bannerImage}
        onImageChange={handleCoverImageChange}
        label="Change Cover Image"
        className="w-full h-64 rounded-lg overflow-hidden"
      />

      <div className="relative px-4">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <ImageUpload
            currentImage={communityImage}
            onImageChange={handleProfileImageChange}
            label="Change Profile Image"
            className="w-24 h-24 rounded-lg border-4 border-white shadow-lg overflow-hidden"
          />
        </div>

        {/* Community Info */}
        <div className="pt-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-600 mt-1">Demo user</p>
        </div>

        {/* Community Description */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About Our Community
            </h2>
            {!isEditingDescription && (
              <button
                onClick={handleEditDescription}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}
          </div>
          {isEditingDescription ? (
            <div>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
                rows={4}
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => setIsEditingDescription(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDescription}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>

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
        </div>
      </div>
    </div>
  );
}
