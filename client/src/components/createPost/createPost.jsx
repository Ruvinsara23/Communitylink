import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Send } from 'lucide-react';
import profileImage from '../../assets/profile.jpeg';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New post:', content);
    console.log('Image:', image);
    setContent('');
    setImage(null);
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded-lg shadow max-w-[742px] mx-auto">
      <div className="flex items-center mb-4">
       
      <img src={profileImage} alt="Profile" 
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
          {/* Handle Image Upload */}
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button type="button" variant="outline" size="icon">
              <ImagePlus className="h-4 w-4" />
            </Button>
          </label>
          {image && <span className="ml-2 text-sm text-gray-500">{image.name}</span>}
        </div>
        <Button type="submit">
          <Send className="h-4 w-4 mr-2" />
          Post
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;
