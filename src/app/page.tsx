"use client";
import { useState, useEffect, useRef } from "react";
import PromptBox from "./components/PromptBox";
import MainSpace from "./components/MainSpace";
import ChatbotResponse from "./components/ChatbotResponse"; 

export default function Home() {
  const [entries, setEntries] = useState<{ imageSrc: string | null; promptText: string; isGenerating: boolean }[]>([]);
  const endOfListRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (image: string | null, prompt: string, isGenerating: boolean) => {
    const newEntry = { imageSrc: image, promptText: prompt, isGenerating: isGenerating };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col pb-5 max-h-[calc(100vh-64px)] overflow-y-auto">
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
          <div ref={endOfListRef} /> 
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-10">
        <PromptBox onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
