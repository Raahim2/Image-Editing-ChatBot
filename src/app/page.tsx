import PromptBox from './components/PromptBox';
import MainSpace from './components/MainSpace';

export default function Home() {
    return (
        <main className="flex flex-col justify-between min-h-screen bg-white">
            <h1 className="text-2xl font-bold text-center mt-6">Image Generator Bot</h1>
            <MainSpace />
            <PromptBox /> 
        </main>
    );
}
