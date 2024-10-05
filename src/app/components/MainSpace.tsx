"use client";
import React from "react";

interface MainSpaceProps {
  entries: { imageSrc: string | null; promptText: string }[];
}

export default function MainSpace({ entries }: MainSpaceProps) {
  return (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
      {entries.map((entry, index) => (
        <div key={index} className="border border-gray-300 rounded-lg w-full max-w-lg flex flex-col items-center space-y-0">
          {entry.imageSrc && (
            <div className="w-full h-64 rounded-t-lg relative overflow-hidden">
              <img
                src={entry.imageSrc}
                alt={`Uploaded Preview ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`bg-slate-100 p-2 border-t ${entry.imageSrc ? 'rounded-b-lg' : 'rounded-lg'} border-grey-500 w-full`}>
            <div className="text-black break-words text-left font-bold">
              {entry.promptText}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
