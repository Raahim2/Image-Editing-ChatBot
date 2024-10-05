"use client";
import { useState, useEffect, useRef } from "react";

interface PromptBoxProps {
  onSubmit: (image: string | null, prompt: string) => void;
}

export default function PromptBox({ onSubmit }: PromptBoxProps) {
  const [imageSrc, setImageSrc] = useState("");
  const [promptText, setPromptText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (promptText.trim()) {
      onSubmit(imageSrc, promptText);
      setImageSrc("");
      setPromptText("");
    } else {
      alert("Please enter a prompt.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGenerate();
    }
  };
  

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, [promptText]);

  return (
    <div className="flex flex-col items-start justify-center space-y-6 px-4 pb-4 pt-0">
      {imageSrc && (
        <div className="relative w-32 h-32">
          <button
            className="absolute top-4 right-0 bg-white bg-opacity-50 px-0.5 rounded-tr-lg"
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

      <div className="flex space-x-4 w-full items-center">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            placeholder="Give your prompt"
            value={promptText}
            onChange={(e) => {
              setPromptText(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            className="border rounded-lg p-2 pl-10 pr-10 w-full text-black"
            style={{
              minHeight: '1rem', 
              maxHeight: '6rem', 
              overflowY: 'auto',
              resize: 'none',
            }}
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
        <button 
          className="bg-blue-500 text-white rounded-lg px-4 py-2" 
          style={{ height: '3rem' }}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

