// app/components/PromptBox.tsx
export default function PromptBox() {
    return (
        <div className="flex items-center justify-center space-x-4 p-4">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Give your prompt"
                    className="border rounded-lg p-2 pl-10 pr-10 w-full"
                />
                <label htmlFor="image-upload" className="absolute left-2 top-2 cursor-pointer">
                    <span className="material-icons" style={{ fontSize: '24px', color: '#0094f7' }}>
                        attachment
                    </span>
                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                    />
                </label>
            </div>
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-3">
                Generate
            </button>
        </div>
    );
}
