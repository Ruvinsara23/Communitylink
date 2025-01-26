"use client";

import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

export function ImageUpload({ currentImage, onImageChange, label, className = "" }) {
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  return (
    <div className={`relative group cursor-pointer ${className}`} onClick={() => fileInputRef.current?.click()}>
      {previewUrl ? (
        <img src={previewUrl || "/placeholder.svg"} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <UploadCloud className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <p className="text-white text-sm font-medium">{label}</p>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  );
}
