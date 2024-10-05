"use client";
import React from "react";

interface ChatbotResponseProps {
  responses: { imageSrc: string; promptText: string }[];
}

export default function ChatbotResponse({ responses }: ChatbotResponseProps) {
  return (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
      {responses.map((response, index) => (
        <div key={index} className="border border-gray-300 bg-slate-100 rounded-lg p-4 w-full max-w-lg flex flex-col items-center space-y-4">
          <div className="w-full h-64">
            <img
              src={response.imageSrc}
              alt={`Chatbot Response ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="max-w-sm text-lg font-medium text-blue-500 break-words text-left">
            {response.promptText}
          </div>
        </div>
      ))}
    </div>
  );
}
