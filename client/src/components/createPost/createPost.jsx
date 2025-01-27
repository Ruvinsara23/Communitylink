import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Send } from 'lucide-react';
import profileImage from '../../assets/profile.jpeg';
import { useCommunity } from '../../context/community.context';
import { UserContext } from '../../context/user.context';

const CreatePost = ({communityId} ) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Clear image preview on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Function to convert image to Base64 and send as JSON
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store Base64 encoded image in state
        setImage(reader.result);
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle image click
  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  // Handle the post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    // Prepare the data as a plain JSON object
    const postData = {
      content: content,
      userId: '674b8fa06060947df883f105', // Replace with logged-in user's ID
      communityId: communityId , // Replace with the current community ID
      image: image ? image : null, // Send Base64 encoded image
    };

    try {
      const response = await axios.post('http://localhost:8000/api/post', postData, {
        headers: {
          'Content-Type': 'application/json', // Sending JSON instead of multipart/form-data
        },
      });
      console.log('Post created:', response.data);
      setContent('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-4 rounded-lg shadow max-w-[742px] mx-auto"
    >
      <div className="flex items-center mb-4">
        <img
          src={profileImage}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <span className="font-semibold">John Doe</span>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full mb-4"
      />
      {imagePreview && (
        <div className="mb-4">
          <img
            src={imagePreview}
            alt="Uploaded preview"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleImageClick}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          {image && <span className="ml-2 text-sm text-gray-500">{image.name}</span>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-700 text-white font-bold px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition-colors"
        >
          <Send className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;
