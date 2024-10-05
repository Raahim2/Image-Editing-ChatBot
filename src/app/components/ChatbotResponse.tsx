"use client";
import React from "react";

interface ChatbotResponseProps {
  responses: { imageSrc: string | null; promptText: string }[];
}

export default function ChatbotResponse({ responses }: ChatbotResponseProps) {
  return (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
      {responses.map((response, index) => (
        response.imageSrc ? (
          <div key={index} className="border border-gray-300 rounded-lg w-full max-w-lg flex flex-col items-center space-y-4">
            <div className="w-full h-64">
              <img
                src={response.imageSrc}
                alt={`Chatbot Response ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ) : (
          <div key={index} className="border border-gray-300 bg-slate-100 rounded-lg w-full max-w-lg flex flex-col items-center space-y-4 p-2">
            <div className="text-gray-500 text-center">
              Cannot generate image now, please try again later.
            </div>
          </div>
        )
      ))}
    </div>
  );
}
