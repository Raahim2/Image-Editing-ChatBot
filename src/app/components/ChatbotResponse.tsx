"use client";
import React from "react";

interface ChatbotResponseProps {
  responses: { imageSrc: string | null; promptText: string; isGenerating: boolean }[];
}

export default function ChatbotResponse({ responses }: ChatbotResponseProps) {
  return (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
      {responses.map((response, index) => (
        <div key={index} className="border border-gray-300 rounded-lg w-full max-w-lg flex flex-col items-center space-y-4 p-2">
          
          {response.isGenerating ? (
            <div className="text-gray-500 text-center">
              Generating image...
            </div>
          ) : (
            
            <div className="w-full h-64">
              <div className="text-gray-500 text-center">
                Generated Image
              </div>
              <img
                src={response.imageSrc || "/generated_image.png"}
                alt={`Chatbot Response ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
