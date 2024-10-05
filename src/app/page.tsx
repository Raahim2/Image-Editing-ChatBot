"use client";
import { useState } from "react";
import PromptBox from "./components/PromptBox";
import MainSpace from "./components/MainSpace";
import ChatbotResponse from "./components/ChatbotResponse"; 

export default function Home() {
  const [entries, setEntries] = useState<{ imageSrc: string; promptText: string }[]>([]);
  
  const handleSubmit = (image: string, prompt: string) => {
    // Update user entries
    const newEntry = { imageSrc: image, promptText: prompt };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-y-auto flex flex-col mt-0 pb-20">
        <div className="flex flex-col space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-end">
                <MainSpace entries={[entry]} /> 
              </div>
              <div className="flex justify-start">
                <ChatbotResponse responses={[entry]} /> 
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-10">
        <PromptBox onSubmit={handleSubmit} />
      </div>
    </div>
  );
}







