"use client";
import { useState } from "react";

interface PromptBoxProps {
  onSubmit: (image: string, prompt: string) => void;
}

export default function PromptBox({ onSubmit }: PromptBoxProps) {
  const [imageSrc, setImageSrc] = useState("");
  const [promptText, setPromptText] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc("");
  };

  const handleGenerate = () => {
    if (imageSrc && promptText) {
      onSubmit(imageSrc, promptText);
      setImageSrc("");
      setPromptText("");
    }
  };

  return (
    <div className="flex flex-col items-start justify-center space-y-6 p-4">
      {imageSrc && (
        <div className="relative w-32 h-32">
          <button
            className="absolute top-1 right-0 bg-white p-1 pb-0"
            onClick={handleRemoveImage}
          >
            &times;
          </button>
          <img
            src={imageSrc}
            alt="Uploaded Preview"
            className="mt-4 w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex space-x-4 w-full">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Give your prompt"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="border rounded-lg p-2 pl-10 pr-10 w-full text-blue-500"
          />
          <label htmlFor="image-upload" className="absolute left-2 top-2 cursor-pointer">
            <span className="material-icons" style={{ fontSize: '24px', color: '#0094f7' }}>attachment</span>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
}

