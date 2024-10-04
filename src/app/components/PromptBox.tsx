// app/components/PromptBox.tsx
"use client";
export default function PromptBox() {
    const [imageSrc, setImageSrc] = useState("");

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

    return (
        <div className="flex flex-col items-left justify-center space-y-6 p-4">
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
                        className="border rounded-lg p-2 pl-10 pr-10 w-full"
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
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Generate
                </button>
            </div>
        </div>
    );
}
